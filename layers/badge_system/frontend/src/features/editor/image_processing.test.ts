import { process_image_file, validate_image_file } from "./image_processing";

describe("validate_image_file", () => {
  it("accepts supported saved image formats", () => {
    const file = new File(["image"], "badge.heic", {
      type: "image/heic",
    });

    expect(() => validate_image_file(file)).not.toThrow();
  });

  it("rejects unsupported upload formats", () => {
    const file = new File(["svg"], "badge.svg", {
      type: "image/svg+xml",
    });

    expect(() => validate_image_file(file)).toThrow(
      "JPEG、PNG、WebP、HEIC、HEIF形式の画像を選択してください。",
    );
  });

  it("paints a white background before drawing a transparent photo", async () => {
    const source_context = {
      drawImage: vi.fn(),
      fillRect: vi.fn(),
      fillStyle: "",
    };
    const thumbnail_context = {
      drawImage: vi.fn(),
      fillRect: vi.fn(),
      fillStyle: "",
    };
    const contexts = [source_context, thumbnail_context];
    let canvas_index = 0;
    vi.spyOn(document, "createElement").mockImplementation((tag_name) => {
      if (tag_name !== "canvas") {
        return document.createElement(tag_name);
      }
      const context = contexts[canvas_index++];
      return {
        getContext: vi.fn(() => context),
        height: 0,
        toDataURL: vi.fn(() => "data:image/jpeg;base64,processed"),
        width: 0,
      } as unknown as HTMLCanvasElement;
    });
    const bitmap = { close: vi.fn(), height: 1, width: 2 };
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => bitmap),
    );

    await process_image_file(
      new File(["transparent"], "transparent.png", { type: "image/png" }),
    );

    expect(source_context.fillStyle).toBe("#ffffff");
    expect(source_context.fillRect).toHaveBeenCalledWith(0, 0, 2, 1);
    expect(source_context.fillRect.mock.invocationCallOrder[0]).toBeLessThan(
      source_context.drawImage.mock.invocationCallOrder[0],
    );
  });
});
