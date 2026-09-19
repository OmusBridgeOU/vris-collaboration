import { describe, expect, it, vi } from "vitest";

import {
  format_item_code,
  generate_reception_number,
} from "../src/code_generation";

describe("order code generation", () => {
  it("uses cryptographic randomness to issue five-digit reception numbers", () => {
    const get_random_values = vi.spyOn(crypto, "getRandomValues");

    for (let index = 0; index < 100; index += 1) {
      const reception_number = generate_reception_number();
      expect(reception_number).toMatch(/^[1-9]\d{4}$/);
      expect(Number(reception_number)).toBeGreaterThanOrEqual(10_000);
      expect(Number(reception_number)).toBeLessThanOrEqual(99_999);
    }

    expect(get_random_values.mock.calls.length).toBeGreaterThanOrEqual(100);
    get_random_values.mockRestore();
  });

  it("bases item codes on the numeric reception number", () => {
    expect(format_item_code("48317", 1)).toBe("48317-01");
    expect(format_item_code("48317", 12)).toBe("48317-12");
  });
});
