import { validate_image_file } from "./image_processing";

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
});
