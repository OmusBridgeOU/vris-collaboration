import { describe, expect, it } from "vitest";

import type { R2Bucket, R2Object } from "../src/cloudflare_types";
import { ImageStorageService } from "../src/services/image_service";

class MemoryR2Bucket implements R2Bucket {
  readonly objects = new Map<string, { bytes: Uint8Array; content_type?: string }>();

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
  it("stores valid PNG print images in private R2 without exposing the key", async () => {
    const bucket = new MemoryR2Bucket();
    const service = new ImageStorageService(bucket);
    const png = make_png_header(1200, 1200);

    const stored = await service.validate_and_store_print_image(
      new File([png], "print.png", { type: "image/png" }),
      "orders/private-key/print.png",
      { max_upload_bytes: 1024, canvas_size_px: 1200 },
    );

    expect(stored).toMatchObject({
      object_key: "orders/private-key/print.png",
      width_px: 1200,
      height_px: 1200,
      content_type: "image/png",
    });
    expect(bucket.objects.has("orders/private-key/print.png")).toBe(true);
  });

  it("rejects print images with the wrong dimensions", async () => {
    const bucket = new MemoryR2Bucket();
    const service = new ImageStorageService(bucket);

    await expect(
      service.validate_and_store_print_image(
        new File([make_png_header(360, 360)], "print.png", {
          type: "image/png",
        }),
        "orders/private-key/print.png",
        { max_upload_bytes: 1024, canvas_size_px: 1200 },
      ),
    ).rejects.toThrow("dimensions");
  });
});

function make_png_header(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(33);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  bytes.set([0x00, 0x00, 0x00, 0x0d], 8);
  bytes.set([0x49, 0x48, 0x44, 0x52], 12);
  const view = new DataView(bytes.buffer);
  view.setUint32(16, width);
  view.setUint32(20, height);
  return bytes;
}
