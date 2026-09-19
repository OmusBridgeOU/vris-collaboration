import { describe, expect, it } from "vitest";

import { get_config, public_config_response } from "../src/config";
import type { Env } from "../src/cloudflare_types";

describe("worker config", () => {
  it("defaults to free-tier batch upload sizing", () => {
    const config = get_config({} as Env);
    const public_config = public_config_response(config);

    expect(config.max_batch_upload_bytes).toBe(104_857_600);
    expect(public_config).toMatchObject({
      maxUploadBytesPerItem: 20_971_520,
      maxItemsPerBatch: 20,
      maxQuantityPerItem: 10,
      canvasSizePx: 1200,
      finishDiameterRatio: 58 / 70,
    });
    expect(public_config).not.toHaveProperty("orderExpirationMinutes");
  });

  it("keeps order limits configurable", () => {
    const config = get_config({
      MAX_ITEMS_PER_BATCH: "12",
      MAX_QUANTITY_PER_ITEM: "7",
    } as Env);

    expect(public_config_response(config)).toMatchObject({
      maxItemsPerBatch: 12,
      maxQuantityPerItem: 7,
    });
  });

  it("parses comma-separated hashtags", () => {
    const config = get_config({
      X_HASHTAGS: "VRIS, badge ,",
    } as Env);

    expect(config.x_hashtags).toEqual(["VRIS", "badge"]);
  });
});
