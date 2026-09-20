import { describe, expect, it, vi } from "vitest";

import type { Env } from "../src/cloudflare_types";
import worker from "../src/index";
import { route_staff_request } from "../src/routes/staff_routes";
import { AuthService } from "../src/services/auth_service";

const visitor_credentials = "vris:visitor-test-password";
const staff_credentials = "staff:staff-test-password";

function test_env(overrides: Partial<Env> = {}): Env {
  return {
    TEST_ACCESS_REQUIRED: "true",
    TEST_ACCESS_USERNAME: "vris",
    TEST_ACCESS_PASSWORD: "visitor-test-password",
    STAFF_AUTH_MODE: "shared_basic",
    STAFF_ACCESS_USERNAME: "staff",
    STAFF_ACCESS_PASSWORD: "staff-test-password",
    DB: new Proxy(
      {},
      {
        get() {
          throw new Error("D1 must not be accessed");
        },
      },
    ),
    ASSETS: { fetch: vi.fn(async () => new Response("frontend")) },
    ...overrides,
  } as Env;
}

function request(path: string, credentials?: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  if (credentials) {
    headers.set("authorization", `Basic ${btoa(credentials)}`);
  }
  return new Request(`https://example.com${path}`, { ...init, headers });
}

describe("shared staff access", () => {
  it.each([
    "/staff",
    "/staff/login",
    "/api/auth/me",
    "/api/staff/order-batches",
    "/api/staff/order-items/test/print-image",
  ])(
    "rejects missing and visitor credentials on %s before D1 or R2 access",
    async (path) => {
      for (const credentials of [undefined, visitor_credentials]) {
        const env = test_env();
        const response = await worker.fetch(request(path, credentials), env);
        expect(response.status).toBe(401);
        expect(response.headers.get("www-authenticate")).toContain(
          "VRIS staff",
        );
        expect(response.headers.get("cache-control")).toBe("no-store, private");
        expect(env.ASSETS?.fetch).not.toHaveBeenCalled();
      }
    },
  );

  it("returns a shared operational identity without a user row or session secret", async () => {
    const response = await worker.fetch(
      request("/api/auth/me", staff_credentials),
      test_env(),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toBeNull();
    expect(response.headers.get("cache-control")).toBe("no-store, private");
    expect(await response.json()).toEqual({
      id: "00000000-0000-4000-8000-000000000001",
      username: "staff",
      displayName: "共有スタッフ",
      roles: ["delivery", "production", "reception"],
      authMode: "shared_basic",
    });
  });

  it.each(["/staff", "/assets/app.js", "/"])(
    "allows staff credentials on %s",
    async (path) => {
      const env = test_env();
      const response = await worker.fetch(
        request(path, staff_credentials),
        env,
      );
      expect(response.status).toBe(200);
      expect(env.ASSETS?.fetch).toHaveBeenCalledOnce();
    },
  );

  it("retains the visitor gate on the creation page", async () => {
    expect(
      (await worker.fetch(request("/", visitor_credentials), test_env()))
        .status,
    ).toBe(200);
    const response = await worker.fetch(request("/assets/app.js"), test_env());
    expect(response.status).toBe(401);
    expect(response.headers.get("www-authenticate")).toContain("VRIS test");
  });

  it.each([undefined, "", "visitor-test-password"])(
    "fails closed for a missing or reused staff secret",
    async (password) => {
      const env = test_env({ STAFF_ACCESS_PASSWORD: password });
      expect(
        (await worker.fetch(request("/staff", visitor_credentials), env))
          .status,
      ).toBe(503);
      expect(env.ASSETS?.fetch).not.toHaveBeenCalled();
    },
  );

  it.each(["staff:wrong", "wrong:staff-test-password"])(
    "rejects incorrect credentials",
    async (credentials) => {
      expect(
        (await worker.fetch(request("/api/auth/me", credentials), test_env()))
          .status,
      ).toBe(401);
    },
  );

  it.each([
    "Basic !!!",
    "Basic c3RhZmY=",
    "Bearer token",
    `Basic ${"a".repeat(5000)}`,
  ])("rejects malformed authentication", async (authorization) => {
    const response = await worker.fetch(
      request("/staff", undefined, { headers: { authorization } }),
      test_env(),
    );
    expect(response.status).toBe(401);
  });

  it("does not let a session cookie bypass the shared gate", async () => {
    const response = await worker.fetch(
      request("/api/auth/me", undefined, {
        headers: { cookie: "vris_staff_session=fake" },
      }),
      test_env(),
    );
    expect(response.status).toBe(401);
  });

  it.each([undefined, "null", "https://elsewhere.example"])(
    "blocks cross-site or missing Origin on mutations",
    async (origin) => {
      const req = request(
        "/api/staff/order-batches/test/ready",
        staff_credentials,
        {
          method: "POST",
          headers: origin ? { origin } : {},
        },
      );
      expect((await worker.fetch(req, test_env())).status).toBe(403);
      expect(
        (await route_staff_request(req, new URL(req.url), test_env()))?.status,
      ).toBe(403);
    },
  );

  it("allows same-origin authenticated requests through to method validation", async () => {
    const response = await worker.fetch(
      request("/api/staff/order-batches", staff_credentials, {
        method: "POST",
        headers: { origin: "https://example.com" },
      }),
      test_env(),
    );
    expect(response.status).toBe(405);
  });

  it.each(["login", "logout"])(
    "does not pretend cookie %s works in shared mode",
    async (action) => {
      const response = await worker.fetch(
        request(`/api/auth/${action}`, staff_credentials, {
          method: "POST",
          headers: { origin: "https://example.com" },
        }),
        test_env(),
      );
      expect(response.status).toBe(405);
      expect(response.headers.get("set-cookie")).toBeNull();
    },
  );

  it("requires staff credentials even when called directly from another route", async () => {
    const service = new AuthService(test_env());
    await expect(
      service.authenticate(
        request("/api/staff/order-batches", visitor_credentials),
      ),
    ).rejects.toMatchObject({ status: 401 });
    const user = await service.authenticate(
      request("/api/staff/order-batches", staff_credentials),
    );
    expect(user.roles).not.toContain("admin");
  });

  it("does not enable shared authentication unless explicitly configured", async () => {
    const response = await worker.fetch(
      request("/api/auth/me", visitor_credentials),
      test_env({ STAFF_AUTH_MODE: undefined }),
    );
    expect(response.status).toBe(401);
    expect(await response.json()).toMatchObject({
      error: { code: "authentication_required" },
    });
  });
});
