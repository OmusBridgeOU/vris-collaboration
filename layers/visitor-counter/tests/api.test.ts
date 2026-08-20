import { applyD1Migrations, env, SELF } from "cloudflare:test";
import type { D1Migration } from "@cloudflare/vitest-pool-workers";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

declare global {
  // Cloudflare's generated binding types are extended through its ambient namespace.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cloudflare {
    interface Env {
      TEST_MIGRATIONS: D1Migration[];
    }
  }
}

const apiKey = "test-secret";

beforeAll(async () => {
  await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
});

beforeEach(async () => {
  await env.DB.prepare("DELETE FROM crowd_status_history").run();
});

describe("visitor counter API", () => {
  it("requires the ingest API key for writes", async () => {
    const response = await SELF.fetch("https://example.com/api/v1/venue-status-write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ venue: "main", crowd_level: 2 }),
    });
    expect(response.status).toBe(401);
  });

  it("rejects malformed and unexpected request values", async () => {
    expect((await write("{")).status).toBe(400);
    expect((await write(JSON.stringify({ venue: "outside", crowd_level: 4 }))).status).toBe(400);
    expect((await write(JSON.stringify({ venue: "main", crowd_level: 2, internal: true }))).status).toBe(400);
  });

  it("stores history and returns only the latest mapped values", async () => {
    expect((await write(JSON.stringify({ venue: "main", crowd_level: 3 }))).status).toBe(200);
    expect((await write(JSON.stringify({ venue: "main", crowd_level: 2 }))).status).toBe(200);
    expect((await write(JSON.stringify({ venue: "dtc", crowd_level: 1 }))).status).toBe(200);

    const response = await SELF.fetch("https://example.com/api/v1/crowd-status", {
      headers: { Origin: "https://vris.jp" },
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://vris.jp");
    await expect(response.json()).resolves.toMatchObject({ value1: 2, value2: 1 });

    const rowCount = await env.DB.prepare("SELECT COUNT(*) AS count FROM crowd_status_history").first<{ count: number }>();
    expect(rowCount?.count).toBe(3);
  });

  it("uses id as a deterministic tie breaker for same-second writes", async () => {
    await env.DB.prepare(
      "INSERT INTO crowd_status_history (venue, crowd_level, created_at) VALUES (?, ?, ?), (?, ?, ?)",
    ).bind("main", 1, "2026-08-20 10:00:00", "main", 3, "2026-08-20 10:00:00").run();

    const response = await SELF.fetch("https://example.com/api/v1/crowd-status");
    await expect(response.json()).resolves.toMatchObject({ value1: 3 });
  });

  it("returns defaults without leaking venue names", async () => {
    const response = await SELF.fetch("https://example.com/api/v1/crowd-status");
    const body = await response.json<Record<string, unknown>>();
    expect(body).toEqual({ value1: -1, value2: -1, updated_at: null });
    expect(body).not.toHaveProperty("main");
    expect(body).not.toHaveProperty("dtc");
  });

  it("does not expose a destructive test endpoint", async () => {
    const response = await SELF.fetch("https://example.com/api/v1/test/crowd-status-history", {
      method: "DELETE",
      headers: { "VRIS-visitor-counter-APIKEY": apiKey },
    });
    expect(response.status).toBe(404);
  });

  it("handles allowed and denied CORS origins", async () => {
    const allowed = await SELF.fetch("https://example.com/api/v1/crowd-status", {
      headers: { Origin: "https://archived.vris.jp" },
    });
    expect(allowed.headers.get("Access-Control-Allow-Origin")).toBe("https://archived.vris.jp");
    expect(allowed.headers.get("Vary")).toBe("Origin");

    const denied = await SELF.fetch("https://example.com/api/v1/crowd-status", {
      headers: { Origin: "https://example.net" },
    });
    expect(denied.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});

function write(body: string): Promise<Response> {
  return SELF.fetch("https://example.com/api/v1/venue-status-write", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "VRIS-visitor-counter-APIKEY": apiKey,
    },
    body,
  });
}
