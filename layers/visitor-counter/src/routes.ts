import { Hono } from "hono";
import { clearCrowdStatusHistory, getPublicCrowdStatus, insertCrowdStatus } from "./db";
import type { CrowdLevel, Env, Venue, VenueStatusRequest } from "./types";

const venues = new Set<Venue>(["main", "dtc"]);
const crowdLevels = new Set<CrowdLevel>([1, 2, 3]);
const apiKeyHeaderName = "VRIS-visitor-counter-APIKEY";

export const app = new Hono<{ Bindings: Env }>();

app.post("/api/v1/venue-status-write", async (c) => {
  if (!isAuthorized(c.env, c.req.header(apiKeyHeaderName))) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  let body: VenueStatusRequest;
  try {
    body = await c.req.json<VenueStatusRequest>();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  if (!isVenue(body.venue)) {
    return c.json({ error: "venue must be one of: main, dtc" }, 400);
  }

  if (!isCrowdLevel(body.crowd_level)) {
    return c.json({ error: "crowd_level must be one of: 1, 2, 3" }, 400);
  }

  await insertCrowdStatus(c.env.DB, body.venue, body.crowd_level);

  return c.json({ status: "ok" });
});

app.delete("/api/v1/test/crowd-status-history", async (c) => {
  if (c.env.ENABLE_TEST_API !== "true") {
    return c.json({ error: "Not Found" }, 404);
  }

  if (!isAuthorized(c.env, c.req.header(apiKeyHeaderName))) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await clearCrowdStatusHistory(c.env.DB);

  return c.json({ status: "ok" });
});

app.get("/api/v1/crowd-status", async (c) => {
  const status = await getPublicCrowdStatus(c.env.DB);
  const response = c.json(status);
  setCorsHeaders(response.headers, c.env.ALLOWED_ORIGINS, c.req.header("Origin"));

  return response;
});

app.options("/api/v1/crowd-status", (c) => {
  const response = new Response(null, { status: 204 });
  setCorsHeaders(response.headers, c.env.ALLOWED_ORIGINS, c.req.header("Origin"));
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
});

function isVenue(value: unknown): value is Venue {
  return typeof value === "string" && venues.has(value as Venue);
}

function isCrowdLevel(value: unknown): value is CrowdLevel {
  return typeof value === "number" && crowdLevels.has(value as CrowdLevel);
}

function isAuthorized(env: Env, actualApiKey: string | undefined): boolean {
  return Boolean(env.CLOUD_INGEST_API_KEY && actualApiKey === env.CLOUD_INGEST_API_KEY);
}

function setCorsHeaders(
  headers: Headers,
  allowedOrigins: string | undefined,
  requestOrigin: string | undefined,
): void {
  if (!allowedOrigins || !requestOrigin) {
    return;
  }

  const origins = allowedOrigins.split(",").map((origin) => origin.trim());
  if (origins.includes("*")) {
    headers.set("Access-Control-Allow-Origin", "*");
    return;
  }

  if (!origins.includes(requestOrigin)) {
    return;
  }

  headers.set("Access-Control-Allow-Origin", requestOrigin);
  headers.set("Vary", "Origin");
}
