import type {
  FontCatalogItem,
  FrameCatalogItem,
  StampCatalogItem,
} from "./editor_types";
import { provider_stamp_catalog } from "./provider_stamp_catalog";
import { provider_frame_catalog } from "./provider_frame_catalog";

export const accepted_image_types =
  "image/jpeg,image/png,image/webp,image/heic,image/heif";

export const supported_image_mime_types = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export const supported_image_extensions = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "heic",
  "heif",
]);

export const max_image_bytes = 20 * 1024 * 1024;
export const max_image_pixels = 50_000_000;
export const max_editor_edge_px = 4096;
export const minimum_recommended_short_edge_px = 600;

export const default_canvas_size_px = 1200;
export const badge_finish_diameter_mm = 58;
export const print_bleed_diameter_mm = 70;
export const default_finish_diameter_ratio =
  badge_finish_diameter_mm / print_bleed_diameter_mm;
export const full_bleed_diameter_ratio = 1;
export const default_safe_area_ratio = 0.7;
export const auto_save_delay_ms = 500;
export const default_font_family = "system-ui";

export const font_catalog: FontCatalogItem[] = [
  {
    id: "system-ui",
    label: "標準",
    font_family: default_font_family,
    fallback_stack: "system-ui, sans-serif",
  },
  {
    id: "japanese-gothic",
    label: "ゴシック",
    font_family: '"Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
    fallback_stack:
      '"Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, system-ui, sans-serif',
  },
  {
    id: "japanese-mincho",
    label: "明朝",
    font_family:
      '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "MS PMincho", serif',
    fallback_stack:
      '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "MS PMincho", serif',
  },
  {
    id: "japanese-rounded",
    label: "丸ゴシック",
    font_family: '"Hiragino Maru Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
    fallback_stack:
      '"Hiragino Maru Gothic ProN", "Yu Gothic", Meiryo, system-ui, sans-serif',
  },
];

export function normalize_font_family(font_family: unknown) {
  return (
    font_catalog.find((font) => font.font_family === font_family)
      ?.font_family ?? default_font_family
  );
}

export function resolve_font_family(font_family: unknown) {
  const normalized_font_family = normalize_font_family(font_family);
  return (
    font_catalog.find((font) => font.font_family === normalized_font_family)
      ?.fallback_stack ?? font_catalog[0].fallback_stack
  );
}

const built_in_stamp_catalog: StampCatalogItem[] = [
  {
    id: "vris_star",
    label: "星",
    category: "basic",
    color: "#f59e0b",
  },
  {
    id: "vris_spark",
    label: "きらめき",
    category: "basic",
    color: "#14b8a6",
  },
  {
    id: "vris_heart",
    label: "ハート",
    category: "basic",
    color: "#ec4899",
  },
  {
    id: "vris_circle",
    label: "丸",
    category: "basic",
    color: "#22c55e",
  },
];

export const stamp_catalog: StampCatalogItem[] = [
  ...built_in_stamp_catalog,
  ...provider_stamp_catalog,
];

export const frame_catalog: FrameCatalogItem[] = [
  {
    id: "none",
    label: "枠なし",
    color: "transparent",
  },
  ...provider_frame_catalog,
];

export function create_project_id() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function create_layer_id(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
