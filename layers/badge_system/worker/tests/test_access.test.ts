import { describe, expect, it } from "vitest";

import type { Env } from "../src/cloudflare_types";
import { test_access_response } from "../src/test_access";

function protected_env(overrides: Partial<Env> = {}): Env {
  return {
    TEST_ACCESS_REQUIRED: "true",
    TEST_ACCESS_USERNAME: "vris",
    TEST_ACCESS_PASSWORD: "test-password",
    ...overrides,
  } as Env;
}

function basic_authorization(username: string, password: string): string {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

describe("test access protection", () => {
  it("rejects requests without credentials", async () => {
    const response = await test_access_response(
      new Request("https://example.com/"),
      protected_env(),
    );

    expect(response?.status).toBe(401);
    expect(response?.headers.get("www-authenticate")).toContain("Basic");
    expect(response?.headers.get("cache-control")).toBe("no-store, private");
  });

  it("allows matching credentials", async () => {
    const request = new Request("https://example.com/", {
      headers: {
        authorization: basic_authorization("vris", "test-password"),
      },
    });

    expect(await test_access_response(request, protected_env())).toBeNull();
  });

  it("fails closed when the required secret is missing", async () => {
    const response = await test_access_response(
      new Request("https://example.com/"),
      protected_env({ TEST_ACCESS_PASSWORD: undefined }),
    );

    expect(response?.status).toBe(503);
  });

  it("does not protect environments where access is not required", async () => {
    expect(
      await test_access_response(
        new Request("https://example.com/"),
        {} as Env,
      ),
    ).toBeNull();
  });
});
