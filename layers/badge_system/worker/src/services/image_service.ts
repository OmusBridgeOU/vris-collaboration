import type { R2Bucket, R2Object } from "../cloudflare_types";
import { remove_image_metadata } from "./image_metadata";

export type StoredImage = {
  object_key: string;
  width_px: number;
  height_px: number;
  file_size_bytes: number;
  content_type: string;
};
export type ImageLimits = { max_upload_bytes: number; canvas_size_px: number };
export class ImageValidationError extends Error {}

export class ImageStorageService {
  constructor(private readonly bucket: R2Bucket) {}

  async validate_and_store_print_image(
    file: File,
    key: string,
    limits: ImageLimits,
  ): Promise<StoredImage> {
    return this.sanitize_and_store(file, key, limits, true);
  }
  async validate_and_store_thumbnail(
    file: File,
    key: string,
    limits: ImageLimits,
  ): Promise<StoredImage> {
    return this.sanitize_and_store(file, key, limits, false);
  }
  private async sanitize_and_store(
    file: File,
    key: string,
    limits: ImageLimits,
    print: boolean,
  ): Promise<StoredImage> {
    if (!file.size || file.size > limits.max_upload_bytes)
      throw new ImageValidationError(
        "Image file is empty or exceeds the configured size limit",
      );
    let image;
    try {
      image = remove_image_metadata(new Uint8Array(await file.arrayBuffer()));
    } catch {
      throw new ImageValidationError("Invalid or unsupported image structure");
    }
    if (
      file.type !== image.content_type ||
      (print && image.content_type !== "image/png")
    ) {
      throw new ImageValidationError(
        "Image MIME type must match its format; print images must be PNG",
      );
    }
    if (
      print &&
      (image.width !== limits.canvas_size_px ||
        image.height !== limits.canvas_size_px)
    ) {
      throw new ImageValidationError(
        "Print image dimensions do not match the configured canvas",
      );
    }
    if (
      !print &&
      (image.width > limits.canvas_size_px ||
        image.height > limits.canvas_size_px)
    ) {
      throw new ImageValidationError(
        "Thumbnail dimensions exceed the configured canvas",
      );
    }
    await this.bucket.put(key, image.bytes, {
      httpMetadata: { contentType: image.content_type },
    });
    return {
      object_key: key,
      width_px: image.width,
      height_px: image.height,
      file_size_bytes: image.bytes.byteLength,
      content_type: image.content_type,
    };
  }
  async get_image(key: string): Promise<R2Object | null> {
    return this.bucket.get(key);
  }
  async delete_images(keys: string[]): Promise<void> {
    if (keys.length) await this.bucket.delete(keys);
  }
}
