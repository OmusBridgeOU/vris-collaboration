import { describe, expect, it, vi } from "vitest";

import type { Env } from "../src/cloudflare_types";
import worker from "../src/index";

type OrderItemInput = {
  clientKey: string;
  localProjectCode: string;
  quantity: number;
};

function order_env(): Env {
  return {
    TEST_ACCESS_REQUIRED: "false",
    PUBLIC_TOKEN_SECRET: "public-token-test-secret",
    DB: new Proxy(
      {},
      {
        get() {
          throw new Error("Unexpected D1 access");
        },
      },
    ),
    ORDER_IMAGES: { get: vi.fn() },
  } as Env;
}

function order_request(items: OrderItemInput[]) {
  const form = new FormData();
  form.append(
    "metadata",
    JSON.stringify({
      termsVersion: "1.1",
      ownershipConfirmed: true,
      portraitConfirmed: true,
      copyrightConfirmed: true,
      items,
    }),
  );

  return new Request("https://example.com/api/order-batches", {
    method: "POST",
    body: form,
  });
}

function order_items(count: number, quantity = 1): OrderItemInput[] {
  return Array.from({ length: count }, (_, index) => ({
    clientKey: `project-${index + 1}`,
    localProjectCode: String(index + 1).padStart(3, "0"),
    quantity,
  }));
}

async function error_body(response: Response) {
  return (await response.json()) as {
    error: { code: string; message: string };
  };
}

describe("order batch limits", () => {
  it("allows 20 designs through limit validation and rejects the 21st", async () => {
    const at_limit = await worker.fetch(
      order_request(order_items(20)),
      order_env(),
    );
    expect((await error_body(at_limit)).error.message).toBe(
      "Missing image files for project-1",
    );

    const over_limit = await worker.fetch(
      order_request(order_items(21)),
      order_env(),
    );
    expect(over_limit.status).toBe(422);
    expect(await error_body(over_limit)).toEqual({
      error: {
        code: "order_validation_error",
        message:
          "Order can include at most 20 designs. Remove one or more designs and try again.",
      },
    });
  });

  it("allows quantity 10 through limit validation and rejects quantity 11", async () => {
    const at_limit = await worker.fetch(
      order_request(order_items(1, 10)),
      order_env(),
    );
    expect((await error_body(at_limit)).error.message).toBe(
      "Missing image files for project-1",
    );

    const over_limit = await worker.fetch(
      order_request(order_items(1, 11)),
      order_env(),
    );
    expect(over_limit.status).toBe(422);
    expect(await error_body(over_limit)).toEqual({
      error: {
        code: "order_validation_error",
        message:
          "Each design can have at most 10 items. Reduce the quantity and try again.",
      },
    });
  });
});
