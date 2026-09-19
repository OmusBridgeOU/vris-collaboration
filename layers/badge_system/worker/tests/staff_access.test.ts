import { describe, expect, it, vi } from "vitest";
import type { Env } from "../src/cloudflare_types";
import worker from "../src/index";

function environment(overrides: Partial<Env> = {}): Env {
  return {
    STAFF_ACCESS_USERNAME: "staff",
    STAFF_ACCESS_PASSWORD: "test-only-password",
    DB: new Proxy(
      {},
      {
        get() {
          throw new Error("Unexpected D1 access");
        },
      },
    ),
    ORDER_IMAGES: { get: vi.fn() },
    ASSETS: { fetch: vi.fn(async () => new Response("frontend")) },
    ...overrides,
  } as Env;
}
function request(path: string, credentials?: string, method = "GET") {
  return new Request("https://example.com" + path, {
    method,
    headers: credentials ? { authorization: "Basic " + btoa(credentials) } : {},
  });
}

describe("shared staff authentication without retired login modes", () => {
  it.each([
    "/staff",
    "/api/auth/me",
    "/api/staff/order-batches/by-reception-number/48317",
    "/api/staff/order-items/item/print-image",
    "/api/staff/order-items/item/thumbnail",
  ])(
    "rejects absent and wrong credentials before resource access: %s",
    async (path) => {
      for (const credentials of [undefined, "visitor:wrong", "staff:wrong"]) {
        const env = environment();
        const response = await worker.fetch(request(path, credentials), env);
        expect(response.status).toBe(401);
        expect(response.headers.get("www-authenticate")).toContain(
          "VRIS staff",
        );
        expect(response.headers.get("cache-control")).toBe("no-store, private");
        expect(env.ORDER_IMAGES.get).not.toHaveBeenCalled();
        expect(env.ASSETS?.fetch).not.toHaveBeenCalled();
      }
    },
  );
  it.each(["STAFF_ACCESS_USERNAME", "STAFF_ACCESS_PASSWORD"])(
    "fails closed when %s is missing",
    async (key) => {
      const env = environment({ [key]: undefined });
      expect(
        (await worker.fetch(request("/staff", "staff:test-only-password"), env))
          .status,
      ).toBe(503);
    },
  );
  it("uses browser credentials without sessions, user tables or roles", async () => {
    const response = await worker.fetch(
      request("/api/auth/me", "staff:test-only-password"),
      environment(),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(await response.json()).toEqual({
      username: "staff",
      displayName: "共有スタッフ",
    });
  });
  it("does not allow a stale session cookie to bypass Basic authentication", async () => {
    const req = new Request("https://example.com/api/auth/me", {
      headers: { cookie: "staff_session=stale" },
    });
    expect((await worker.fetch(req, environment())).status).toBe(401);
  });
  it.each([
    "/api/auth/login",
    "/api/auth/logout",
    "/api/staff/order-batches/batch/accept",
    "/api/staff/order-batches/batch/reject",
    "/api/staff/order-batches/batch/start-production",
    "/api/staff/order-batches/batch/ready",
    "/api/staff/order-batches/batch/deliver",
    "/api/staff/order-items/item/reprint",
  ])("retired mutation cannot write data: %s", async (path) => {
    const response = await worker.fetch(
      request(path, "staff:test-only-password", "POST"),
      environment(),
    );
    expect(response.status).toBe(404);
  });
  it.each([
    "/api/staff/order-batches",
    "/api/staff/order-batches/by-token/old-token",
  ])("retired lookup is absent: %s", async (path) => {
    expect(
      (
        await worker.fetch(
          request(path, "staff:test-only-password"),
          environment(),
        )
      ).status,
    ).toBe(404);
  });
  it.each(["/", "/assets/app.js", "/api/config"])(
    "visitor endpoint remains public: %s",
    async (path) => {
      expect((await worker.fetch(request(path), environment())).status).toBe(
        200,
      );
    },
  );
});
