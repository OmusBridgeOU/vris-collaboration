import { describe, expect, it } from "vitest";
import { app } from "../src/routes";
import type { Env } from "../src/types";

type StoredRow = {
  id: number;
  venue: "main" | "dtc";
  crowd_level: 1 | 2 | 3;
  created_at: string;
};

class MockD1Database {
  private rows: StoredRow[] = [];
  private nextId = 1;

  prepare(query: string) {
    return new MockD1PreparedStatement(query, this.rows, () => this.nextId++);
  }
}

class MockD1PreparedStatement {
  private values: unknown[] = [];

  constructor(
    private readonly query: string,
    private readonly rows: StoredRow[],
    private readonly nextId: () => number,
  ) {}

  bind(...values: unknown[]) {
    this.values = values;
    return this;
  }

  async run() {
    if (this.query.includes("DELETE FROM crowd_status_history")) {
      this.rows.splice(0, this.rows.length);
      return { success: true };
    }

    if (!this.query.includes("INSERT INTO crowd_status_history")) {
      throw new Error(`Unexpected run query: ${this.query}`);
    }

    const [venue, crowdLevel] = this.values as [StoredRow["venue"], StoredRow["crowd_level"]];
    const id = this.nextId();
    this.rows.push({
      id,
      venue,
      crowd_level: crowdLevel,
      created_at: `2026-05-21 10:00:0${id}`,
    });

    return { success: true };
  }

  async all<T>() {
    if (!this.query.includes("FROM crowd_status_history")) {
      throw new Error(`Unexpected all query: ${this.query}`);
    }

    return {
      results: [...this.rows].sort((a, b) => b.created_at.localeCompare(a.created_at)) as T[],
      success: true,
    };
  }
}

function createEnv(overrides: Partial<Env> = {}): Env {
  return {
    DB: new MockD1Database() as unknown as D1Database,
    CLOUD_INGEST_API_KEY: "secret",
    ALLOWED_ORIGINS: "https://vris.jp,https://archived.vris.jp",
    ...overrides,
  };
}

describe("cloud api", () => {
  it("requires VRIS-visitor-counter-APIKEY for venue status writes", async () => {
    const response = await app.request(
      "/api/v1/venue-status-write",
      {
        method: "POST",
        body: JSON.stringify({ venue: "main", crowd_level: 2 }),
        headers: { "Content-Type": "application/json" },
      },
      createEnv(),
    );

    expect(response.status).toBe(401);
  });

  it("validates venue and crowd level", async () => {
    const response = await app.request(
      "/api/v1/venue-status-write",
      {
        method: "POST",
        body: JSON.stringify({ venue: "outside", crowd_level: 4 }),
        headers: {
          "Content-Type": "application/json",
          "VRIS-visitor-counter-APIKEY": "secret",
        },
      },
      createEnv(),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "venue must be one of: main, dtc",
    });
  });

  it("validates crowd level", async () => {
    const response = await app.request(
      "/api/v1/venue-status-write",
      {
        method: "POST",
        body: JSON.stringify({ venue: "main", crowd_level: 4 }),
        headers: {
          "Content-Type": "application/json",
          "VRIS-visitor-counter-APIKEY": "secret",
        },
      },
      createEnv(),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "crowd_level must be one of: 1, 2, 3",
    });
  });

  it("inserts history and returns public mapped values", async () => {
    const env = createEnv();

    await app.request(
      "/api/v1/venue-status-write",
      {
        method: "POST",
        body: JSON.stringify({ venue: "main", crowd_level: 3 }),
        headers: {
          "Content-Type": "application/json",
          "VRIS-visitor-counter-APIKEY": "secret",
        },
      },
      env,
    );
    await app.request(
      "/api/v1/venue-status-write",
      {
        method: "POST",
        body: JSON.stringify({ venue: "main", crowd_level: 2 }),
        headers: {
          "Content-Type": "application/json",
          "VRIS-visitor-counter-APIKEY": "secret",
        },
      },
      env,
    );
    await app.request(
      "/api/v1/venue-status-write",
      {
        method: "POST",
        body: JSON.stringify({ venue: "dtc", crowd_level: 3 }),
        headers: {
          "Content-Type": "application/json",
          "VRIS-visitor-counter-APIKEY": "secret",
        },
      },
      env,
    );

    const response = await app.request(
      "/api/v1/crowd-status",
      { headers: { Origin: "https://vris.jp" } },
      env,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://vris.jp");
    await expect(response.json()).resolves.toEqual({
      value1: 2,
      value2: 3,
      updated_at: "2026-05-21 10:00:03",
    });
  });

  it("defaults missing venue levels to -1 and does not expose venue names", async () => {
    const response = await app.request("/api/v1/crowd-status", {}, createEnv());
    const body = await response.json<Record<string, unknown>>();

    expect(body).toEqual({
      value1: -1,
      value2: -1,
      updated_at: null,
    });
    expect(body).not.toHaveProperty("main");
    expect(body).not.toHaveProperty("dtc");
  });

  it("omits CORS headers when ALLOWED_ORIGINS is not configured", async () => {
    const response = await app.request(
      "/api/v1/crowd-status",
      { headers: { Origin: "https://vris.jp" } },
      createEnv({ ALLOWED_ORIGINS: undefined }),
    );

    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("omits CORS headers for disallowed origins", async () => {
    const response = await app.request(
      "/api/v1/crowd-status",
      { headers: { Origin: "https://example.com" } },
      createEnv(),
    );

    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("allows any origin when ALLOWED_ORIGINS is wildcard", async () => {
    const response = await app.request(
      "/api/v1/crowd-status",
      { headers: { Origin: "https://example.com" } },
      createEnv({ ALLOWED_ORIGINS: "*" }),
    );

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("does not expose the test delete API unless enabled", async () => {
    const response = await app.request(
      "/api/v1/test/crowd-status-history",
      {
        method: "DELETE",
        headers: { "VRIS-visitor-counter-APIKEY": "secret" },
      },
      createEnv(),
    );

    expect(response.status).toBe(404);
  });

  it("requires VRIS-visitor-counter-APIKEY for the test delete API", async () => {
    const response = await app.request(
      "/api/v1/test/crowd-status-history",
      { method: "DELETE" },
      createEnv({ ENABLE_TEST_API: "true" }),
    );

    expect(response.status).toBe(401);
  });

  it("clears history when the test delete API is enabled", async () => {
    const env = createEnv({ ENABLE_TEST_API: "true" });

    await app.request(
      "/api/v1/venue-status-write",
      {
        method: "POST",
        body: JSON.stringify({ venue: "main", crowd_level: 2 }),
        headers: {
          "Content-Type": "application/json",
          "VRIS-visitor-counter-APIKEY": "secret",
        },
      },
      env,
    );

    const deleteResponse = await app.request(
      "/api/v1/test/crowd-status-history",
      {
        method: "DELETE",
        headers: { "VRIS-visitor-counter-APIKEY": "secret" },
      },
      env,
    );

    expect(deleteResponse.status).toBe(200);
    await expect(deleteResponse.json()).resolves.toEqual({ status: "ok" });

    const readResponse = await app.request("/api/v1/crowd-status", {}, env);
    await expect(readResponse.json()).resolves.toEqual({
      value1: -1,
      value2: -1,
      updated_at: null,
    });
  });
});
