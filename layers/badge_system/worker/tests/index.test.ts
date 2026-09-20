import { describe, expect, it, vi } from "vitest";

import type { Env } from "../src/cloudflare_types";
import worker from "../src/index";

function test_env(asset_fetch: ReturnType<typeof vi.fn>): Env {
  return {
    TEST_ACCESS_REQUIRED: "true",
    TEST_ACCESS_USERNAME: "vris",
    TEST_ACCESS_PASSWORD: "test-password",
    ASSETS: { fetch: asset_fetch },
  } as unknown as Env;
}

describe("Worker test access integration", () => {
  it("blocks static assets before they reach the asset binding", async () => {
    const asset_fetch = vi.fn(async () => new Response("private frontend"));

    const response = await worker.fetch(
      new Request("https://example.com/"),
      test_env(asset_fetch),
    );

    expect(response.status).toBe(401);
    expect(asset_fetch).not.toHaveBeenCalled();
  });

  it("serves static assets after successful authentication", async () => {
    const asset_fetch = vi.fn(async () => new Response("private frontend"));
    const request = new Request("https://example.com/", {
      headers: {
        authorization: `Basic ${btoa("vris:test-password")}`,
      },
    });

    const response = await worker.fetch(request, test_env(asset_fetch));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("private frontend");
    expect(asset_fetch).toHaveBeenCalledOnce();
  });
});
