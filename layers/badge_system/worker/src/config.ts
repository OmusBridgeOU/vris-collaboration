import type { Env } from "./cloudflare_types";
import { order_pricing } from "./services/order_pricing";

export type AppConfig = {
  app_base_url: string;
  app_timezone: string;
  terms_version: string;
  max_upload_bytes_per_item: number;
  max_batch_upload_bytes: number;
  max_items_per_batch: number;
  max_quantity_per_item: number;
  unit_price_yen: number | null;
  canvas_size_px: number;
  finish_diameter_ratio: number;
  safe_area_ratio: number;
  x_share_text: string;
  x_hashtags: string[];
};

export function get_config(env: Env): AppConfig {
  return {
    app_base_url: env.APP_BASE_URL ?? "https://vris-badge.example.com",
    app_timezone: env.APP_TIMEZONE ?? "Asia/Tokyo",
    terms_version: env.TERMS_VERSION ?? "1.1",
    max_upload_bytes_per_item: number_setting(
      env.MAX_UPLOAD_BYTES_PER_ITEM,
      20_971_520,
    ),
    max_batch_upload_bytes: number_setting(
      env.MAX_BATCH_UPLOAD_BYTES,
      104_857_600,
    ),
    max_items_per_batch: number_setting(env.MAX_ITEMS_PER_BATCH, 20),
    max_quantity_per_item: number_setting(env.MAX_QUANTITY_PER_ITEM, 10),
    unit_price_yen: order_pricing(1, env.BADGE_UNIT_PRICE_YEN).unitPriceYen,
    canvas_size_px: number_setting(env.CANVAS_SIZE_PX, 1200),
    finish_diameter_ratio: float_setting(env.FINISH_DIAMETER_RATIO, 58 / 70),
    safe_area_ratio: float_setting(env.SAFE_AREA_RATIO, 0.7),
    x_share_text: env.X_SHARE_TEXT ?? "VRISでオリジナル缶バッジを作りました！",
    x_hashtags: split_list(env.X_HASHTAGS, ["VRIS", "VRISオリジナル缶バッジ"]),
  };
}

export function public_config_response(config: AppConfig) {
  return {
    termsVersion: config.terms_version,
    maxUploadBytesPerItem: config.max_upload_bytes_per_item,
    maxItemsPerBatch: config.max_items_per_batch,
    maxQuantityPerItem: config.max_quantity_per_item,
    unitPriceYen: config.unit_price_yen,
    canvasSizePx: config.canvas_size_px,
    finishDiameterRatio: config.finish_diameter_ratio,
    safeAreaRatio: config.safe_area_ratio,
    xShareText: config.x_share_text,
    xHashtags: config.x_hashtags,
  };
}

function number_setting(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function float_setting(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function split_list(value: string | undefined, fallback: string[]): string[] {
  if (!value) {
    return fallback;
  }
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}
