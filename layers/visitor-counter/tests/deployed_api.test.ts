import { describe, expect, it } from "vitest";

declare const process: {
  env: Record<string, string | undefined>;
};

type DeployedApiEnv = {
  baseUrl: string;
  apiKey: string;
};

const deployedApiEnv = getDeployedApiEnv();
const describeIfConfigured = deployedApiEnv ? describe : describe.skip;

describeIfConfigured("deployed cloud api", () => {
  it("clears crowd status history through the test API", async () => {
    const { apiKey, baseUrl } = expectDeployedApiEnv();
    const response = await clearCrowdStatusHistory(baseUrl, apiKey);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });

  it("rejects venue status writes without an API key", async () => {
    const { baseUrl } = expectDeployedApiEnv();
    const response = await fetch(`${baseUrl}/api/v1/venue-status-write`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ venue: "main", crowd_level: 2 }),
    });

    expect(response.status).toBe(401);
  });

  it("writes venue status and returns it from the public endpoint", async () => {
    const { apiKey, baseUrl } = expectDeployedApiEnv();
    await clearCrowdStatusHistory(baseUrl, apiKey);

    const writeResponse = await fetch(`${baseUrl}/api/v1/venue-status-write`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "VRIS-visitor-counter-APIKEY": apiKey,
      },
      body: JSON.stringify({ venue: "main", crowd_level: 2 }),
    });

    expect(writeResponse.status).toBe(200);
    await expect(writeResponse.json()).resolves.toEqual({ status: "ok" });

    const readResponse = await fetch(`${baseUrl}/api/v1/crowd-status`);

    expect(readResponse.status).toBe(200);
    await expect(readResponse.json()).resolves.toMatchObject({
      value1: 2,
    });

    await clearCrowdStatusHistory(baseUrl, apiKey);
  });
});

function clearCrowdStatusHistory(baseUrl: string, apiKey: string): Promise<Response> {
  return fetch(`${baseUrl}/api/v1/test/crowd-status-history`, {
    method: "DELETE",
    headers: { "VRIS-visitor-counter-APIKEY": apiKey },
  });
}

function getDeployedApiEnv(): DeployedApiEnv | null {
  if (process.env.RUN_DEPLOYED_API_TESTS !== "true") {
    return null;
  }

  const baseUrl = process.env.DEPLOYED_API_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.DEPLOYED_CLOUD_INGEST_API_KEY;

  if (!baseUrl || !apiKey) {
    return null;
  }

  return { apiKey, baseUrl };
}

function expectDeployedApiEnv(): DeployedApiEnv {
  if (!deployedApiEnv) {
    throw new Error(
      "RUN_DEPLOYED_API_TESTS=true, DEPLOYED_API_BASE_URL, and DEPLOYED_CLOUD_INGEST_API_KEY are required",
    );
  }

  return deployedApiEnv;
}
