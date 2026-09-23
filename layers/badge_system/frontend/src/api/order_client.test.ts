import type { PublicConfig } from "../types/api_types";
import { create_empty_design } from "../features/editor/editor_state";
import type { PurchaseListEntry } from "../features/projects/project_types";

const renderer_mocks = vi.hoisted(() => ({
  canvas_to_blob: vi.fn(async () => new Blob(["image"])),
  render_badge_design: vi.fn(async () => document.createElement("canvas")),
}));

vi.mock("../features/editor/editor_renderer", () => renderer_mocks);

import { create_order_batch } from "./order_client";

describe("create_order_batch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("extends frame artwork only for the print image and uses the project thumbnail", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              receptionNumber: "123456",
              publicToken: "token",
              status: "SUBMITTED",
              totalItemTypes: 1,
              totalQuantity: 1,
              createdAt: "2026-09-19T00:00:00Z",
              expiresAt: null,
              publicUrl: "/orders/token",
              items: [],
            }),
            {
              status: 201,
              headers: {
                "Content-Type": "application/json",
              },
            },
          ),
      ),
    );

    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;

      width = 360;
      height = 360;
      naturalWidth = 360;
      naturalHeight = 360;

      private source = "";

      get src() {
        return this.source;
      }

      set src(value: string) {
        this.source = value;

        queueMicrotask(() => {
          this.onload?.();
        });
      }

      async decode() {
        return undefined;
      }
    }

    vi.stubGlobal("Image", MockImage);

    const fill_rect = vi.fn();
    const draw_image = vi.fn();

    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () =>
        ({
          fillStyle: "",
          fillRect: fill_rect,
          drawImage: draw_image,
        }) as unknown as CanvasRenderingContext2D,
    );

    const design = create_empty_design();

    const entry = {
      project_id: design.project_id,
      quantity: 1,
      project: {
        project_id: design.project_id,
        local_project_code: design.local_project_code,
        editor_design: design,
        thumbnail_data_url:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB",
      },
    } as PurchaseListEntry;

    const config: PublicConfig = {
      termsVersion: "1.1",
      maxUploadBytesPerItem: 20_000_000,
      maxItemsPerBatch: 10,
      maxQuantityPerItem: 10,
      unitPriceYen: 500,
      canvasSizePx: 1200,
      finishDiameterRatio: 58 / 70,
      safeAreaRatio: 0.7,
      xShareText: "",
      xHashtags: [],
    };

    await create_order_batch({
      entries: [entry],
      config,
      confirmations: {
        ownership_confirmed: true,
        portrait_confirmed: true,
        copyright_confirmed: true,
      },
    });

    expect(renderer_mocks.render_badge_design).toHaveBeenCalledTimes(1);

    expect(renderer_mocks.render_badge_design).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        canvas_size_px: config.canvasSizePx,
        finish_diameter_ratio: 1,
        safe_area_ratio: config.safeAreaRatio,
        include_guides: false,
        extend_frame_to_bleed: true,
      }),
    );

    expect(fill_rect).toHaveBeenCalledWith(0, 0, 360, 360);

    expect(draw_image).toHaveBeenCalledWith(expect.anything(), 0, 0, 360, 360);

    expect(renderer_mocks.canvas_to_blob).toHaveBeenCalledTimes(2);
  });
});
