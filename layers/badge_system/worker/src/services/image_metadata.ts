export type SanitizedImage = {
  bytes: Uint8Array;
  content_type: "image/png" | "image/jpeg" | "image/webp";
  width: number;
  height: number;
};

// Container-only editing: compressed pixels are never decoded or re-encoded.
export function remove_image_metadata(bytes: Uint8Array): SanitizedImage {
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v))
    return png(bytes);
  if (bytes[0] === 255 && bytes[1] === 216) return jpeg(bytes);
  if (text(bytes, 0, 4) === "RIFF" && text(bytes, 8, 12) === "WEBP")
    return webp(bytes);
  return invalid();
}

function text(bytes: Uint8Array, start: number, end: number): string {
  return String.fromCharCode(...bytes.subarray(start, end));
}
function join(parts: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}
function invalid(): never {
  throw new Error("Invalid or unsupported image structure");
}
function dimensions(width: number, height: number) {
  if (!width || !height || width * height > 50_000_000) invalid();
}

function png(bytes: Uint8Array): SanitizedImage {
  const parts = [bytes.subarray(0, 8)];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 8,
    width = 0,
    height = 0,
    color = 0;
  let image_data = false,
    data_finished = false,
    palette = false,
    transparency = false;
  while (offset + 12 <= bytes.length) {
    const size = view.getUint32(offset),
      end = offset + size + 12;
    if (end > bytes.length) invalid();
    const type = text(bytes, offset + 4, offset + 8);
    if (!/^[A-Za-z]{4}$/.test(type) || (offset === 8 && type !== "IHDR"))
      invalid();
    if (type === "IHDR") {
      if (offset !== 8 || size !== 13) invalid();
      width = view.getUint32(offset + 8);
      height = view.getUint32(offset + 12);
      dimensions(width, height);
      const depth = bytes[offset + 16];
      color = bytes[offset + 17];
      const depths: Record<number, number[]> = {
        0: [1, 2, 4, 8, 16],
        2: [8, 16],
        3: [1, 2, 4, 8],
        4: [8, 16],
        6: [8, 16],
      };
      if (
        !depths[color]?.includes(depth) ||
        bytes[offset + 18] !== 0 ||
        bytes[offset + 19] !== 0 ||
        bytes[offset + 20] > 1
      )
        invalid();
    } else if (type === "IDAT") {
      if (data_finished || (color === 3 && !palette)) invalid();
      image_data = true;
    } else {
      if (image_data) data_finished = true;
      if (type === "PLTE") {
        if (palette || image_data || !size || size % 3 || size > 768) invalid();
        palette = true;
      } else if (type === "tRNS") {
        if (
          transparency ||
          image_data ||
          ![0, 2, 3].includes(color) ||
          (color === 0 && size !== 2) ||
          (color === 2 && size !== 6) ||
          (color === 3 && (!palette || !size || size > 256))
        )
          invalid();
        transparency = true;
      }
    }
    if (["acTL", "fcTL", "fdAT"].includes(type)) invalid(); // No animation flattening.
    if (["IHDR", "PLTE", "tRNS", "IDAT", "IEND"].includes(type))
      parts.push(bytes.subarray(offset, end));
    else if (type[0] === type[0].toUpperCase()) invalid();
    if (type === "IEND") {
      if (!image_data || size !== 0) invalid();
      return { bytes: join(parts), content_type: "image/png", width, height };
    }
    offset = end;
  }
  return invalid();
}

function jpeg(bytes: Uint8Array): SanitizedImage {
  const parts = [bytes.subarray(0, 2)];
  let offset = 2,
    width = 0,
    height = 0;
  let scanned = false;
  const frames = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce,
    0xcf,
  ]);
  while (offset < bytes.length) {
    const start = offset;
    if (bytes[offset++] !== 255) invalid();
    while (bytes[offset] === 255) offset++;
    const marker = bytes[offset++];
    if (marker === 0xd9) {
      if (!scanned || !width) invalid();
      parts.push(bytes.subarray(start, offset));
      return { bytes: join(parts), content_type: "image/jpeg", width, height };
    }
    if (offset + 2 > bytes.length) invalid();
    const size = (bytes[offset] << 8) | bytes[offset + 1],
      end = offset + size;
    if (size < 2 || end > bytes.length) invalid();
    if (frames.has(marker)) {
      if (width || size < 8) invalid();
      height = (bytes[offset + 3] << 8) | bytes[offset + 4];
      width = (bytes[offset + 5] << 8) | bytes[offset + 6];
      const components = bytes[offset + 7];
      if (![1, 3, 4].includes(components) || size !== 8 + 3 * components)
        invalid();
      dimensions(width, height);
    }
    if ((marker >= 0xe0 && marker <= 0xef) || marker === 0xfe) {
      // APP14's color-transform indicator affects pixel interpretation. Rebuild
      // its fixed decoder header; do not copy arbitrary application metadata.
      if (
        marker === 0xee &&
        size === 14 &&
        text(bytes, offset + 2, offset + 7) === "Adobe"
      ) {
        const transform = bytes[end - 1];
        if (transform > 2) invalid();
        parts.push(
          new Uint8Array([
            255,
            238,
            0,
            14,
            65,
            100,
            111,
            98,
            101,
            0,
            100,
            0,
            0,
            0,
            0,
            transform,
          ]),
        );
      }
    } else if (
      frames.has(marker) ||
      [0xc4, 0xcc, 0xda, 0xdb, 0xdd].includes(marker)
    )
      parts.push(bytes.subarray(start, end));
    else invalid();
    offset = end;
    if (marker === 0xda) {
      if (!width || size < 6) invalid();
      scanned = true;
      const scan_start = offset;
      while (offset < bytes.length) {
        if (bytes[offset] !== 255) {
          offset++;
          continue;
        }
        let next_offset = offset + 1;
        while (bytes[next_offset] === 255) next_offset++;
        const next = bytes[next_offset];
        if (next === 0 || (next >= 0xd0 && next <= 0xd7)) {
          offset = next_offset + 1;
          continue;
        }
        break;
      }
      parts.push(bytes.subarray(scan_start, offset));
    }
  }
  return invalid();
}

function webp(bytes: Uint8Array): SanitizedImage {
  if (bytes.length < 20) invalid();
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const limit = view.getUint32(4, true) + 8;
  if (limit > bytes.length || limit < 20) invalid();
  const parts: Uint8Array[] = [];
  let offset = 12,
    width = 0,
    height = 0,
    canvas_width = 0,
    canvas_height = 0;
  let alpha = false;
  while (offset + 8 <= limit) {
    const kind = text(bytes, offset, offset + 4),
      size = view.getUint32(offset + 4, true);
    const end = offset + 8 + size,
      padded_end = end + (size % 2);
    if (padded_end > limit) invalid();
    const data = offset + 8;
    if (kind === "VP8X") {
      if (offset !== 12 || size !== 10 || bytes[data] & 2) invalid();
      canvas_width = uint24(bytes, data + 4) + 1;
      canvas_height = uint24(bytes, data + 7) + 1;
      dimensions(canvas_width, canvas_height);
      const header = bytes.slice(offset, end);
      header[8] &= 0x10; // Keep only the alpha flag, clear EXIF/XMP/ICC/reserved bits.
      header.fill(0, 9, 12);
      parts.push(header);
    } else if (kind === "VP8 " || kind === "VP8L") {
      if (width) invalid();
      if (kind === "VP8 ") {
        if (
          size < 10 ||
          bytes[data] & 1 ||
          text(bytes, data + 3, data + 6) !== "\x9d\x01\x2a"
        )
          invalid();
        width = view.getUint16(data + 6, true) & 0x3fff;
        height = view.getUint16(data + 8, true) & 0x3fff;
      } else {
        if (size < 5 || bytes[data] !== 0x2f || bytes[data + 4] & 0xe0)
          invalid();
        const packed = view.getUint32(data + 1, true);
        width = (packed & 0x3fff) + 1;
        height = ((packed >>> 14) & 0x3fff) + 1;
      }
      dimensions(width, height);
      parts.push(bytes.subarray(offset, end));
      if (size % 2) parts.push(new Uint8Array(1));
    } else if (kind === "ALPH") {
      if (alpha || width || !canvas_width || !size) invalid();
      alpha = true;
      parts.push(bytes.subarray(offset, end));
      if (size % 2) parts.push(new Uint8Array(1));
    } else if (kind === "ANIM" || kind === "ANMF") invalid();
    offset = padded_end;
  }
  if (
    offset !== limit ||
    !width ||
    (canvas_width && (canvas_width !== width || canvas_height !== height))
  )
    invalid();
  const payload = join(parts),
    header = bytes.slice(0, 12);
  new DataView(header.buffer).setUint32(4, payload.length + 4, true);
  return {
    bytes: join([header, payload]),
    content_type: "image/webp",
    width,
    height,
  };
}
function uint24(bytes: Uint8Array, offset: number): number {
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
}
