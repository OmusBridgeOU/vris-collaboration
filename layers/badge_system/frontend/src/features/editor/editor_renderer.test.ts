import {
  default_font_family,
  font_catalog,
  frame_catalog,
  stamp_catalog,
} from "./editor_constants";
import { render_badge_design, render_share_image } from "./editor_renderer";
import { create_empty_design } from "./editor_state";
import type { BadgeDesign } from "./editor_types";

describe("editor_renderer", () => {
  const font_commands: string[] = [];
  const stroke_style_commands: string[] = [];
  const set_line_dash = vi.fn();
  let context: CanvasRenderingContext2D;

  beforeEach(() => {
    font_commands.length = 0;
    stroke_style_commands.length = 0;
    set_line_dash.mockReset();
    context = create_recording_context(
      font_commands,
      stroke_style_commands,
      set_line_dash,
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      context,
    );
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue(
      "data:image/jpeg;base64,rendered",
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("uses the selected font for preview, thumbnail, shared JPEG, and print PNG renders", async () => {
    const selected_font = font_catalog[2];
    const design = text_design(selected_font.font_family);

    await render_badge_design(design, {
      canvas_size_px: 1200,
      include_guides: true,
    });
    await render_badge_design(design, {
      canvas_size_px: 360,
      include_guides: false,
    });
    await render_share_image(design);
    await render_badge_design(design, {
      canvas_size_px: 1200,
      include_guides: false,
      output_type: "image/png",
    });

    expect(font_commands).toHaveLength(4);
    expect(
      font_commands.every((font) =>
        font.includes(selected_font.fallback_stack),
      ),
    ).toBe(true);
  });

  it("uses a safe system fallback when a stored font is unavailable", async () => {
    await render_badge_design(text_design("Unavailable Font"));

    expect(font_commands).toEqual([
      `700 96px ${default_font_family}, sans-serif`,
    ]);
  });

  it("keeps selected frame artwork but omits editor guides from shared images", async () => {
    const design = text_design(default_font_family);
    design.frame = {
      catalog_id: "vris_blue",
      label: "ブルー",
      color: "#2563eb",
    };

    await render_share_image(design);

    expect(set_line_dash).not.toHaveBeenCalled();
    expect(stroke_style_commands).toContain("#2563eb");
    expect(stroke_style_commands).not.toContain("#0f766e");

    stroke_style_commands.length = 0;
    await render_badge_design(design, { include_guides: true });
    expect(set_line_dash).toHaveBeenCalledWith([12, 10]);
    expect(stroke_style_commands).toContain("#0f766e");
  });

  it("clips the visitor saved image at the 58mm finish diameter", async () => {
    await render_share_image(text_design(default_font_family));

    expect(context.arc).toHaveBeenCalledWith(
      540,
      540,
      540 * (58 / 70),
      0,
      Math.PI * 2,
    );
  });

  it("draws a provider PNG stamp from the stamp directory catalog", async () => {
    class LoadedImage {
      naturalHeight = 100;
      naturalWidth = 200;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }
    }
    vi.stubGlobal("Image", LoadedImage);
    stamp_catalog.push({
      id: "provider_sample_stamp",
      label: "サンプル",
      category: "provider",
      color: "transparent",
      image_url: "/assets/sample.png",
    });
    const design = create_empty_design();
    design.stamps = [
      {
        id: "stamp-1",
        catalog_id: "provider_sample_stamp",
        label: "サンプル",
        x: 600,
        y: 600,
        scale: 1,
        rotation: 0,
        flipped: false,
        color: "transparent",
      },
    ];
    design.layer_order = ["stamp-1"];

    try {
      await render_badge_design(design);
      expect(context.drawImage).toHaveBeenCalledWith(
        expect.any(LoadedImage),
        -95,
        -47.5,
        190,
        95,
      );
    } finally {
      stamp_catalog.pop();
    }
  });

  it("draws a provider PNG frame across the full canvas", async () => {
    class LoadedImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }
    }
    vi.stubGlobal("Image", LoadedImage);
    frame_catalog.push({
      id: "provider_frame_sample_frame",
      label: "sample_frame",
      color: "transparent",
      image_url: "/assets/sample-frame.png",
    });
    const design = create_empty_design();
    design.frame = {
      catalog_id: "provider_frame_sample_frame",
      label: "sample_frame",
      color: "transparent",
    };

    try {
      await render_badge_design(design);
      expect(context.drawImage).toHaveBeenCalledWith(
        expect.any(LoadedImage),
        0,
        0,
        1200,
        1200,
      );
    } finally {
      frame_catalog.pop();
    }
  });
});

function text_design(font_family: string): BadgeDesign {
  const design = create_empty_design();
  design.text_layers = [
    {
      id: "text-1",
      text: "日本語",
      font_family,
      font_size: 96,
      color: "#111827",
      outline_color: "#ffffff",
      outline_width: 8,
      bold: true,
      x: 600,
      y: 600,
      scale: 1,
      rotation: 0,
    },
  ];
  design.layer_order = ["text-1"];
  return design;
}

function create_recording_context(
  font_commands: string[],
  stroke_style_commands: string[],
  set_line_dash: ReturnType<typeof vi.fn>,
) {
  let current_font = "";
  let current_stroke_style: string | CanvasGradient | CanvasPattern = "";
  const recording_context = {
    arc: vi.fn(),
    beginPath: vi.fn(),
    clip: vi.fn(),
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    rotate: vi.fn(),
    save: vi.fn(),
    scale: vi.fn(),
    setLineDash: set_line_dash,
    stroke: vi.fn(),
    strokeText: vi.fn(),
    translate: vi.fn(),
  };

  Object.defineProperties(recording_context, {
    font: {
      get: () => current_font,
      set: (font: string) => {
        current_font = font;
        font_commands.push(font);
      },
    },
    strokeStyle: {
      get: () => current_stroke_style,
      set: (stroke_style: string | CanvasGradient | CanvasPattern) => {
        current_stroke_style = stroke_style;
        if (typeof stroke_style === "string") {
          stroke_style_commands.push(stroke_style);
        }
      },
    },
  });

  return recording_context as unknown as CanvasRenderingContext2D;
}
