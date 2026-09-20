import type { R2Bucket, R2Object } from "../cloudflare_types";

export type StoredImage = {
  object_key: string;
  width_px: number;
  height_px: number;
  file_size_bytes: number;
  content_type: string;
};

export type ImageLimits = {
  max_upload_bytes: number;
  canvas_size_px: number;
};

export class ImageValidationError extends Error {}

export class ImageStorageService {
  constructor(private readonly bucket: R2Bucket) {}

  async validate_and_store_print_image(
    file: File,
    object_key: string,
    limits: ImageLimits,
  ): Promise<StoredImage> {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const dimensions = parse_png_dimensions(bytes);
    if (!dimensions) {
      throw new ImageValidationError("Print image must be a valid PNG");
    }
    if (
      dimensions.width_px !== limits.canvas_size_px ||
      dimensions.height_px !== limits.canvas_size_px
    ) {
      throw new ImageValidationError("Print image dimensions do not match the configured canvas");
    }
    validate_size(bytes, limits.max_upload_bytes);
    await this.bucket.put(object_key, bytes, {
      httpMetadata: { contentType: "image/png" },
    });
    return {
      object_key,
      width_px: dimensions.width_px,
      height_px: dimensions.height_px,
      file_size_bytes: bytes.byteLength,
      content_type: "image/png",
    };
  }

  async validate_and_store_thumbnail(
    file: File,
    object_key: string,
    limits: ImageLimits,
  ): Promise<StoredImage> {
    const bytes = new Uint8Array(await file.arrayBuffer());
    validate_size(bytes, limits.max_upload_bytes);
    const jpeg = is_jpeg(bytes);
    const png_dimensions = parse_png_dimensions(bytes);
    if (!jpeg && !png_dimensions) {
      throw new ImageValidationError("Thumbnail must be JPEG or PNG");
    }
    await this.bucket.put(object_key, bytes, {
      httpMetadata: { contentType: jpeg ? "image/jpeg" : "image/png" },
    });
    return {
      object_key,
      width_px: png_dimensions?.width_px ?? 360,
      height_px: png_dimensions?.height_px ?? 360,
      file_size_bytes: bytes.byteLength,
      content_type: jpeg ? "image/jpeg" : "image/png",
    };
  }

  async get_image(object_key: string): Promise<R2Object | null> {
    return this.bucket.get(object_key);
  }

  async delete_images(object_keys: string[]): Promise<void> {
    if (object_keys.length > 0) {
      await this.bucket.delete(object_keys);
    }
  }
}

function validate_size(bytes: Uint8Array, max_upload_bytes: number): void {
  if (bytes.byteLength === 0) {
    throw new ImageValidationError("Image file is empty");
  }
  if (bytes.byteLength > max_upload_bytes) {
    throw new ImageValidationError("Image file exceeds the configured size limit");
  }
}

function parse_png_dimensions(bytes: Uint8Array): { width_px: number; height_px: number } | null {
  const png_signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length < 24 || !png_signature.every((value, index) => bytes[index] === value)) {
    return null;
  }
  const chunk_type = String.fromCharCode(...bytes.slice(12, 16));
  if (chunk_type !== "IHDR") {
    return null;
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return {
    width_px: view.getUint32(16),
    height_px: view.getUint32(20),
  };
}

function is_jpeg(bytes: Uint8Array): boolean {
  return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[bytes.length - 2] === 0xff && bytes[bytes.length - 1] === 0xd9;
}
