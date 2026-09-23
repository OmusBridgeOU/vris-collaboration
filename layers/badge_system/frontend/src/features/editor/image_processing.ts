import {
  max_editor_edge_px,
  max_image_bytes,
  max_image_pixels,
  minimum_recommended_short_edge_px,
  supported_image_extensions,
  supported_image_mime_types,
} from "./editor_constants";
import type { ImageProcessingResult, PhotoLayer } from "./editor_types";

type Heic2AnyModule = {
  default?: (options: {
    blob: Blob;
    toType: string;
    quality: number;
  }) => Promise<Blob | Blob[]>;
};

export function validate_image_file(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const has_supported_type = supported_image_mime_types.has(file.type);
  const has_supported_extension = supported_image_extensions.has(extension);

  if (!has_supported_type && !has_supported_extension) {
    throw new Error(
      "JPEG、PNG、WebP、HEIC、HEIF形式の画像を選択してください。",
    );
  }

  if (file.size > max_image_bytes) {
    throw new Error("画像ファイルは20MB以下にしてください。");
  }
}

export async function process_image_file(
  file: File,
): Promise<ImageProcessingResult> {
  validate_image_file(file);

  const source_blob = await convert_heic_if_needed(file);
  const bitmap = await load_oriented_bitmap(source_blob);
  const total_pixels = bitmap.width * bitmap.height;

  if (total_pixels > max_image_pixels) {
    bitmap.close?.();
    throw new Error("画像は50メガピクセル以下にしてください。");
  }

  const resize_ratio = Math.min(
    1,
    max_editor_edge_px / Math.max(bitmap.width, bitmap.height),
  );
  const output_width = Math.max(1, Math.round(bitmap.width * resize_ratio));
  const output_height = Math.max(1, Math.round(bitmap.height * resize_ratio));
  const canvas = document.createElement("canvas");
  canvas.width = output_width;
  canvas.height = output_height;
  const context = get_canvas_context(canvas);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, output_width, output_height);
  context.drawImage(bitmap, 0, 0, output_width, output_height);
  bitmap.close?.();

  const data_url = canvas.toDataURL("image/jpeg", 0.92);
  const thumbnail_data_url = create_thumbnail(canvas);
  const short_edge = Math.min(output_width, output_height);
  const warnings: string[] = [];

  if (resize_ratio < 1) {
    warnings.push("編集用画像を長辺4096px以下へ縮小しました。");
  }

  if (short_edge < minimum_recommended_short_edge_px) {
    warnings.push(
      "短辺が600px未満のため、印刷品質が低くなる可能性があります。",
    );
  }

  const photo: PhotoLayer = {
    data_url,
    width: output_width,
    height: output_height,
    x: 600,
    y: 600,
    scale: 1200 / Math.max(output_width, output_height),
    rotation: 0,
    low_resolution: short_edge < minimum_recommended_short_edge_px,
    quality_warning: warnings.join(" "),
  };

  return { photo, thumbnail_data_url };
}

async function convert_heic_if_needed(file: File) {
  const lower_name = file.name.toLowerCase();
  const is_heic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    lower_name.endsWith(".heic") ||
    lower_name.endsWith(".heif");

  if (!is_heic) {
    return file;
  }

  const heic2any = (await import("heic2any")) as Heic2AnyModule;
  const converter = heic2any.default;

  if (!converter) {
    throw new Error(
      "HEIC/HEIF変換ライブラリを読み込めませんでした。JPEG、PNG形式に変換してから再度お試しください。",
    );
  }

  const converted = await converter({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });

  return Array.isArray(converted) ? converted[0] : converted;
}

async function load_oriented_bitmap(blob: Blob) {
  if ("createImageBitmap" in window) {
    return await createImageBitmap(blob, { imageOrientation: "from-image" });
  }

  return await new Promise<ImageBitmap>((resolve, reject) => {
    const image = new Image();
    image.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = get_canvas_context(canvas);
      context.drawImage(image, 0, 0);
      const bitmap = await createImageBitmap(canvas);
      URL.revokeObjectURL(image.src);
      resolve(bitmap);
    };
    image.onerror = () => {
      URL.revokeObjectURL(image.src);
      reject(new Error("画像を読み込めませんでした。"));
    };
    image.src = URL.createObjectURL(blob);
  });
}

function create_thumbnail(source: HTMLCanvasElement) {
  const edge = 240;
  const canvas = document.createElement("canvas");
  canvas.width = edge;
  canvas.height = edge;
  const context = get_canvas_context(canvas);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, edge, edge);
  const scale = edge / Math.max(source.width, source.height);
  const width = source.width * scale;
  const height = source.height * scale;
  context.drawImage(
    source,
    (edge - width) / 2,
    (edge - height) / 2,
    width,
    height,
  );

  return canvas.toDataURL("image/jpeg", 0.82);
}

function get_canvas_context(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    throw new Error("このブラウザでは本アプリを利用できません。");
  }

  return context;
}
