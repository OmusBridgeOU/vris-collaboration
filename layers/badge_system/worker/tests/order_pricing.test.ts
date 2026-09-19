import { describe, expect, it } from "vitest";
import { order_pricing } from "../src/services/order_pricing";

describe("order confirmation pricing", () => {
  it("uses the configured default and supports integer overrides including free items", () => {
    expect(order_pricing(3)).toEqual({
      unitPriceYen: 500,
      totalPriceYen: 1500,
    });
    expect(order_pricing(3, "700")).toEqual({
      unitPriceYen: 700,
      totalPriceYen: 2100,
    });
    expect(order_pricing(3, "0")).toEqual({
      unitPriceYen: 0,
      totalPriceYen: 0,
    });
  });
  it.each(["", "500yen", "-1", "1.5", " 500 ", "Infinity", "9007199254740992"])(
    "does not silently price invalid configuration %s",
    (price) => {
      expect(order_pricing(3, price)).toEqual({
        unitPriceYen: null,
        totalPriceYen: null,
      });
    },
  );
  it("rejects unsafe totals", () => {
    expect(order_pricing(3, String(Number.MAX_SAFE_INTEGER))).toEqual({
      unitPriceYen: null,
      totalPriceYen: null,
    });
  });
});
