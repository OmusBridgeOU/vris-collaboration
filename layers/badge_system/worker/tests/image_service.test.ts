import { make_png, add_png_metadata, sharp } from "./image_fixtures";
import { describe, expect, it } from "vitest";

import type { R2Bucket, R2Object } from "../src/cloudflare_types";
import { ImageStorageService } from "../src/services/image_service";

class MemoryR2Bucket implements R2Bucket {
  readonly objects = new Map<
    string,
    { bytes: Uint8Array; content_type?: string }
  >();

  async get(key: string): Promise<R2Object | null> {
    const object = this.objects.get(key);
    if (!object) {
      return null;
    }
    return {
      body: new Blob([object.bytes]).stream(),
      httpMetadata: { contentType: object.content_type },
      size: object.bytes.byteLength,
    };
  }

  async put(
    key: string,
    value: ArrayBuffer | ArrayBufferView | ReadableStream<Uint8Array>,
    options?: { httpMetadata?: { contentType?: string } },
  ): Promise<void> {
    if (value instanceof ReadableStream) {
      throw new Error("stream put is not used in this test");
    }
    const bytes =
      value instanceof ArrayBuffer
        ? new Uint8Array(value)
        : new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    this.objects.set(key, {
      bytes,
      content_type: options?.httpMetadata?.contentType,
    });
  }

  async delete(keys: string | string[]): Promise<void> {
    for (const key of Array.isArray(keys) ? keys : [keys]) {
      this.objects.delete(key);
    }
  }
}

describe("image storage service", () => {
  it("stores the actual thumbnail format, dimensions and sanitized size", async () => {
    const bucket = new MemoryR2Bucket();
    const service = new ImageStorageService(bucket);
    const source = await sharp(await make_png(96, 72))
      .withExif({ IFD0: { ImageDescription: "PRIVATE_TEST_LOCATION" } })
      .jpeg()
      .toBuffer();
    const stored = await service.validate_and_store_thumbnail(
      new File([source], "thumbnail.jpg", { type: "image/jpeg" }),
      "thumbnail",
      { max_upload_bytes: 20_000, canvas_size_px: 360 },
    );
    const saved = bucket.objects.get("thumbnail")!;
    expect(stored).toMatchObject({
      width_px: 96,
      height_px: 72,
      content_type: "image/jpeg",
      file_size_bytes: saved.bytes.length,
    });
    expect((await sharp(saved.bytes).metadata()).exif).toBeUndefined();
    expect(saved.content_type).toBe("image/jpeg");
  });

  it("never writes invalid, mislabeled or oversized files to R2", async () => {
    const bucket = new MemoryR2Bucket();
    const service = new ImageStorageService(bucket);
    const png = await make_png(360, 360);
    for (const [bytes, mime, limit] of [
      [png.subarray(0, 33), "image/png", 20_000],
      [png, "image/jpeg", 20_000],
      [png, "image/png", 10],
      [new Uint8Array(), "image/png", 20_000],
    ] as const) {
      await expect(
        service.validate_and_store_thumbnail(
          new File([bytes], "image", { type: mime }),
          "invalid",
          { max_upload_bytes: limit, canvas_size_px: 360 },
        ),
      ).rejects.toThrow();
    }
    expect(bucket.objects.size).toBe(0);
  });

  it("stores valid PNG print images in private R2 without exposing the key", async () => {
    const bucket = new MemoryR2Bucket();
    const service = new ImageStorageService(bucket);
    const png = add_png_metadata(await make_png(1200, 1200));

    const stored = await service.validate_and_store_print_image(
      new File([png], "print.png", { type: "image/png" }),
      "orders/private-key/print.png",
      { max_upload_bytes: 20_000, canvas_size_px: 1200 },
    );

    expect(stored).toMatchObject({
      object_key: "orders/private-key/print.png",
      width_px: 1200,
      height_px: 1200,
      content_type: "image/png",
    });
    expect(bucket.objects.has("orders/private-key/print.png")).toBe(true);
    expect(
      new TextDecoder().decode(
        bucket.objects.get("orders/private-key/print.png")!.bytes,
      ),
    ).not.toContain("PRIVATE_");
    expect(stored.file_size_bytes).toBeLessThan(png.byteLength);
  });

  it("rejects print images with the wrong dimensions", async () => {
    const bucket = new MemoryR2Bucket();
    const service = new ImageStorageService(bucket);

    await expect(
      service.validate_and_store_print_image(
        new File([await make_png(360, 360)], "print.png", {
          type: "image/png",
        }),
        "orders/private-key/print.png",
        { max_upload_bytes: 20_000, canvas_size_px: 1200 },
      ),
    ).rejects.toThrow("dimensions");
  });
});
