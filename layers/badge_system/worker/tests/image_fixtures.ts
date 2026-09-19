import { createRequire } from "node:module";

// Use Wrangler's locked local-image test runtime, never a production dependency.
const frontend_require = createRequire(
  new URL("../../frontend/package.json", import.meta.url),
);
const wrangler_require = createRequire(frontend_require.resolve("wrangler"));
const miniflare_require = createRequire(wrangler_require.resolve("miniflare"));
export const sharp = miniflare_require("sharp");

export async function make_png(
  width: number,
  height: number,
): Promise<Uint8Array> {
  return new Uint8Array(
    await sharp({
      create: { width, height, channels: 4, background: "#32aadd" },
    })
      .png({ compressionLevel: 9 })
      .toBuffer(),
  );
}

export function png_chunk(type: string, data: Uint8Array): Uint8Array {
  const chunk = new Uint8Array(data.length + 12);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, data.length);
  chunk.set(new TextEncoder().encode(type), 4);
  chunk.set(data, 8);
  let crc = 0xffffffff;
  for (const b of chunk.subarray(4, -4)) {
    crc ^= b;
    for (let i = 0; i < 8; i++)
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  view.setUint32(chunk.length - 4, (crc ^ 0xffffffff) >>> 0);
  return chunk;
}

export function join_bytes(...parts: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

export function add_png_metadata(image: Uint8Array): Uint8Array {
  return join_bytes(
    image.subarray(0, 33),
    png_chunk(
      "tEXt",
      new TextEncoder().encode("Comment\0PRIVATE_TEST_LOCATION"),
    ),
    png_chunk("eXIf", new TextEncoder().encode("PRIVATE_TEST_EXIF")),
    image.subarray(33),
    new TextEncoder().encode("PRIVATE_TRAILING_PAYLOAD"),
  );
}
