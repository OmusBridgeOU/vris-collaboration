import { describe, expect, it } from "vitest";

import { error_response, no_store_headers } from "../src/http";

describe("http helpers", () => {
  it("marks image responses as private and non-cacheable", () => {
    const headers = no_store_headers("image/png");

    expect(headers.get("cache-control")).toBe("no-store, private");
    expect(headers.get("content-type")).toBe("image/png");
    expect(headers.get("x-content-type-options")).toBe("nosniff");
  });

  it("uses the common API error shape", async () => {
    const response = error_response(422, "order_validation_error", "Invalid order");

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "order_validation_error",
        message: "Invalid order",
      },
    });
  });
});
