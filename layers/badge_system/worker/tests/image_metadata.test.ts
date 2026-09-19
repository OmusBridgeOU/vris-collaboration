import { describe, expect, it } from "vitest";
import { remove_image_metadata } from "../src/services/image_metadata";
import {
  add_png_metadata,
  join_bytes,
  make_png,
  png_chunk,
  sharp,
} from "./image_fixtures";

async function pixels(bytes: Uint8Array) {
  return sharp(bytes).raw().toBuffer();
}
const payload = new TextEncoder().encode("PRIVATE_TEST_LOCATION");
function jpeg_segment(marker: number, data: Uint8Array) {
  return join_bytes(
    new Uint8Array([
      255,
      marker,
      (data.length + 2) >> 8,
      (data.length + 2) & 255,
    ]),
    data,
  );
}

describe("metadata removal without re-encoding", () => {
  it("removes PNG text, EXIF and trailing bytes while preserving the compressed image exactly", async () => {
    const original = await make_png(48, 32);
    const sanitized = remove_image_metadata(add_png_metadata(original));
    const clean = remove_image_metadata(original);
    expect(sanitized.bytes).toEqual(clean.bytes);
    expect(await pixels(sanitized.bytes)).toEqual(await pixels(original));
    expect(sanitized).toMatchObject({
      width: 48,
      height: 32,
      content_type: "image/png",
    });
    expect(new TextDecoder().decode(sanitized.bytes)).not.toContain("PRIVATE_");
  });

  it.each([false, true])(
    "removes JPEG APP and comment data, including progressive scans (%s)",
    async (progressive) => {
      const original = new Uint8Array(
        await sharp(await make_png(48, 32))
          .jpeg({ progressive })
          .toBuffer(),
      );
      const dirty = join_bytes(
        original.subarray(0, 2),
        jpeg_segment(225, payload),
        jpeg_segment(226, payload),
        jpeg_segment(237, payload),
        jpeg_segment(254, payload),
        original.subarray(2, -2),
        jpeg_segment(254, payload),
        original.subarray(-2),
        payload,
      );
      const result = remove_image_metadata(dirty);
      expect(result.bytes).toEqual(remove_image_metadata(original).bytes);
      expect(await pixels(result.bytes)).toEqual(await pixels(original));
      expect(result).toMatchObject({
        width: 48,
        height: 32,
        content_type: "image/jpeg",
      });
      expect(new TextDecoder().decode(result.bytes)).not.toContain("PRIVATE_");
    },
  );

  it.each([false, true])(
    "removes WebP EXIF/XMP/ICC while retaining compressed pixels (lossless=%s)",
    async (lossless) => {
      const original = new Uint8Array(
        await sharp(await make_png(48, 32))
          .webp({ lossless })
          .toBuffer(),
      );
      const dirty = new Uint8Array(
        await sharp(original)
          .withExif({ IFD0: { ImageDescription: "PRIVATE_TEST_LOCATION" } })
          .withXmp(
            '<x:xmpmeta xmlns:x="adobe:ns:meta/">PRIVATE_TEST_LOCATION</x:xmpmeta>',
          )
          .withIccProfile("srgb")
          .webp({ lossless })
          .toBuffer(),
      );
      const result = remove_image_metadata(dirty);
      const metadata = await sharp(result.bytes).metadata();
      expect(metadata.exif).toBeUndefined();
      expect(metadata.xmp).toBeUndefined();
      expect(metadata.icc).toBeUndefined();
      expect(await pixels(result.bytes)).toEqual(await pixels(dirty));
      expect(result).toMatchObject({
        width: 48,
        height: 32,
        content_type: "image/webp",
      });
      expect(new TextDecoder().decode(result.bytes)).not.toContain("PRIVATE_");
      // Retained VP8/VP8L payload bytes must be copied, not generated anew.
      for (const kind of ["VP8 ", "VP8L"]) {
        const source = webp_payload(dirty, kind),
          saved = webp_payload(result.bytes, kind);
        expect(saved).toEqual(source);
      }
    },
  );

  it("preserves JPEG Adobe color interpretation without arbitrary application data", async () => {
    const original = new Uint8Array(
      await sharp(await make_png(16, 16))
        .toColourspace("cmyk")
        .jpeg()
        .toBuffer(),
    );
    const result = remove_image_metadata(original);
    expect(await pixels(result.bytes)).toEqual(await pixels(original));
  });

  it("preserves transparent palette PNGs and WebP alpha", async () => {
    const image = await sharp({
      create: {
        width: 16,
        height: 16,
        channels: 4,
        background: { r: 10, g: 50, b: 80, alpha: 0.5 },
      },
    })
      .png({ palette: true })
      .toBuffer();
    for (const bytes of [
      new Uint8Array(image),
      new Uint8Array(await sharp(image).webp().toBuffer()),
    ]) {
      expect(await pixels(remove_image_metadata(bytes).bytes)).toEqual(
        await pixels(bytes),
      );
    }
  });

  it("rejects header-only, truncated and oversized containers", async () => {
    const png = await make_png(8, 8);
    for (const bad of [
      png.subarray(0, 33),
      png.subarray(0, png.length - 2),
      new Uint8Array([255, 216, 255, 217]),
    ])
      expect(() => remove_image_metadata(bad)).toThrow();
    const huge = png.slice();
    new DataView(huge.buffer).setUint32(16, 100_000);
    new DataView(huge.buffer).setUint32(20, 100_000);
    expect(() => remove_image_metadata(huge)).toThrow();
  });

  it("rejects APNG rather than deleting its animation frames", async () => {
    const png = await make_png(8, 8);
    expect(() =>
      remove_image_metadata(
        join_bytes(
          png.subarray(0, 33),
          png_chunk("acTL", new Uint8Array(8)),
          png.subarray(33),
        ),
      ),
    ).toThrow();
  });
});

function webp_payload(bytes: Uint8Array, kind: string): Uint8Array | undefined {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let offset = 12; offset + 8 <= bytes.length; ) {
    const size = view.getUint32(offset + 4, true);
    if (new TextDecoder().decode(bytes.subarray(offset, offset + 4)) === kind)
      return bytes.subarray(offset + 8, offset + 8 + size);
    offset += 8 + size + (size % 2);
  }
}
