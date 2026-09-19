import {
  badge_finish_diameter_mm,
  default_finish_diameter_ratio,
  default_font_family,
  font_catalog,
  print_bleed_diameter_mm,
  normalize_font_family,
  resolve_font_family,
} from "./editor_constants";

describe("editor_constants", () => {
  it("maps the 58mm finish guide onto the 70mm bleed canvas", () => {
    expect(badge_finish_diameter_mm).toBe(58);
    expect(print_bleed_diameter_mm).toBe(70);
    expect(default_finish_diameter_ratio).toBeCloseTo(58 / 70, 6);
  });

  it("provides an approved Japanese-capable font catalog with system-ui first", () => {
    expect(font_catalog[0]).toMatchObject({
      id: "system-ui",
      font_family: default_font_family,
    });
    expect(font_catalog.map((font) => font.label)).toEqual([
      "標準",
      "ゴシック",
      "明朝",
      "丸ゴシック",
    ]);
    for (const font of font_catalog.slice(1)) {
      expect(font.fallback_stack).toMatch(/Hiragino|Yu Gothic|Yu Mincho/);
      expect(font.fallback_stack).toMatch(/(?:sans-serif|serif)$/);
    }
  });

  it("falls back unknown or unavailable stored fonts to system-ui", () => {
    expect(normalize_font_family("unapproved-font")).toBe(default_font_family);
    expect(resolve_font_family("unapproved-font")).toBe(
      "system-ui, sans-serif",
    );
  });
});
