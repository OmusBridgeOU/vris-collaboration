import { Hono } from "hono";
import { z } from "zod";
import { getPublicCrowdStatus, insertCrowdStatus } from "./db";

const apiKeyHeaderName = "VRIS-visitor-counter-APIKEY";
const venueStatusSchema = z.object({
  venue: z.enum(["main", "dtc"]),
  crowd_level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
}).strict();

export const app = new Hono<{ Bindings: Env }>();

app.post("/api/v1/venue-status-write", async (c) => {
  if (!(await isAuthorized(c.env.CLOUD_INGEST_API_KEY, c.req.header(apiKeyHeaderName)))) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  let body: unknown;
  try {
    body = await c.req.json<unknown>();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const parsedBody = venueStatusSchema.safeParse(body);
  if (!parsedBody.success) {
    return c.json({ error: "venue and crowd_level must be valid" }, 400);
  }

  await insertCrowdStatus(c.env.DB, parsedBody.data.venue, parsedBody.data.crowd_level);
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

async function isAuthorized(expectedApiKey: string | undefined, actualApiKey: string | undefined): Promise<boolean> {
  if (!expectedApiKey || !actualApiKey) return false;

  const encoder = new TextEncoder();
  const [expectedHash, actualHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(expectedApiKey)),
    crypto.subtle.digest("SHA-256", encoder.encode(actualApiKey)),
  ]);
  const expectedBytes = new Uint8Array(expectedHash);
  const actualBytes = new Uint8Array(actualHash);
  let difference = 0;
  for (let index = 0; index < expectedBytes.length; index += 1) {
    difference |= (expectedBytes[index] ?? 0) ^ (actualBytes[index] ?? 0);
  }
  return difference === 0;
}

function setCorsHeaders(
  headers: Headers,
  allowedOrigins: string | undefined,
  requestOrigin: string | undefined,
): void {
  if (!allowedOrigins || !requestOrigin) return;

  const origins = allowedOrigins.split(",").map((origin) => origin.trim());
  if (origins.includes("*")) {
    headers.set("Access-Control-Allow-Origin", "*");
    return;
  }

  if (!origins.includes(requestOrigin)) return;
  headers.set("Access-Control-Allow-Origin", requestOrigin);
  headers.set("Vary", "Origin");
}
