import { describe, expect, it, vi } from "vitest";

import type { Env } from "../src/cloudflare_types";
import worker from "../src/index";

function public_env(overrides: Partial<Env> = {}): Env {
  return {
    TEST_ACCESS_REQUIRED: "false",
    STAFF_AUTH_MODE: "shared_basic",
    STAFF_ACCESS_USERNAME: "staff",
    STAFF_ACCESS_PASSWORD: "staff-test-password",
    PUBLIC_TOKEN_SECRET: "public-token-test-secret",
    DB: new Proxy(
      {},
      {
        get() {
          throw new Error("Unexpected D1 access");
        },
      },
    ),
    ASSETS: { fetch: vi.fn(async () => new Response("frontend")) },
    ORDER_IMAGES: { get: vi.fn() },
    ...overrides,
  } as Env;
}

describe("public Worker with protected staff access", () => {
  it.each(["/", "/assets/app.js", "/api/config"])(
    "serves %s without site-wide credentials or a visitor secret",
    async (path) => {
      const response = await worker.fetch(
        new Request(`https://example.com${path}`),
        public_env(),
      );
      expect(response.status).toBe(200);
      expect(response.headers.has("www-authenticate")).toBe(false);
    },
  );

  it.each([
    "/staff",
    "/api/auth/me",
    "/api/staff/order-batches",
    "/api/staff/order-items/test/print-image",
    "/api/staff/order-items/test/thumbnail",
  ])("still requires staff authentication on %s", async (path) => {
    const env = public_env();
    for (const authorization of [
      undefined,
      `Basic ${btoa("vris:old-visitor-password")}`,
    ]) {
      const response = await worker.fetch(
        new Request(`https://example.com${path}`, {
          headers: authorization ? { authorization } : {},
        }),
        env,
      );
      expect(response.status).toBe(401);
      expect(response.headers.get("www-authenticate")).toContain("VRIS staff");
      expect(response.headers.get("cache-control")).toBe("no-store, private");
    }
    expect(env.ASSETS?.fetch).not.toHaveBeenCalled();
    expect(env.ORDER_IMAGES.get).not.toHaveBeenCalled();
  });

  it("retains shared staff login without the visitor gate", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/api/auth/me", {
        headers: {
          authorization: `Basic ${btoa("staff:staff-test-password")}`,
        },
      }),
      public_env(),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      authMode: "shared_basic",
      roles: ["delivery", "production", "reception"],
    });
  });

  it("fails closed when the staff secret is missing", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/staff"),
      public_env({ STAFF_ACCESS_PASSWORD: undefined }),
    );
    expect(response.status).toBe(503);
  });

  it.each(["print-image", "thumbnail"])(
    "rejects unknown order tokens before reading a public %s",
    async (kind) => {
      const first = vi.fn(async () => null);
      const bind = vi.fn(() => ({ first }));
      const prepare = vi.fn(() => ({ bind }));
      const env = public_env({ DB: { prepare } as unknown as Env["DB"] });
      const response = await worker.fetch(
        new Request(
          `https://example.com/api/order-batches/public/unknown-token/items/A-0001-01/${kind}`,
        ),
        env,
      );
      expect(response.status).toBe(404);
      expect(first).toHaveBeenCalledOnce();
      expect(bind).toHaveBeenCalledWith(
        expect.stringMatching(/^[a-f0-9]{64}$/),
      );
      expect(env.ORDER_IMAGES.get).not.toHaveBeenCalled();
      expect(await response.json()).toEqual({
        error: {
          code: "order_not_found",
          message: "Order batch was not found",
        },
      });
    },
  );

  it("keeps authorized image responses private and uncacheable", async () => {
    const first = vi.fn(async () => ({ id: "test-batch" }));
    const all = vi.fn(async () => ({
      results: [
        {
          item_code: "A-0001-01",
          print_object_key: "private-test-image",
          deleted_at: null,
        },
      ],
    }));
    const bind = vi.fn(() => ({ first, all }));
    const prepare = vi.fn(() => ({ bind }));
    const get = vi.fn(async () => ({
      body: new Uint8Array([1, 2, 3]),
      httpMetadata: { contentType: "image/png" },
    }));
    const env = public_env({
      DB: { prepare } as unknown as Env["DB"],
      ORDER_IMAGES: { get } as unknown as Env["ORDER_IMAGES"],
    });
    const response = await worker.fetch(
      new Request(
        "https://example.com/api/order-batches/public/known-token/items/A-0001-01/print-image",
      ),
      env,
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store, private");
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(get).toHaveBeenCalledWith("private-test-image");
  });

  it("keeps an order available after its legacy expiry timestamp", async () => {
    const first = vi.fn(async () => ({
      id: "test-batch",
      reception_number: "48317",
      status: "UPLOADED",
      total_item_types: 0,
      total_quantity: 0,
      created_at: "2026-01-01T00:00:00.000Z",
      expires_at: "2026-01-01T01:00:00.000Z",
    }));
    const all = vi.fn(async () => ({ results: [] }));
    const prepare = vi.fn(() => ({ bind: () => ({ first, all }) }));
    const response = await worker.fetch(
      new Request(
        "https://example.com/api/order-batches/public/permanent-token",
      ),
      public_env({ DB: { prepare } as unknown as Env["DB"] }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      receptionNumber: "48317",
      status: "UPLOADED",
      expiresAt: null,
    });
    expect(prepare).not.toHaveBeenCalledWith(expect.stringContaining("UPDATE"));
  });
});
