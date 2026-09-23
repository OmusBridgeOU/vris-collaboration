import {
  default_canvas_size_px,
  default_finish_diameter_ratio,
  frame_catalog,
  resolve_font_family,
  stamp_catalog,
} from "./editor_constants";
import type {
  BadgeDesign,
  DrawingStroke,
  FrameLayer,
  PhotoLayer,
  StampLayer,
  TextLayer,
} from "./editor_types";
import { prepare_frame_artwork } from "./frame_artwork";

export type BadgeRenderOptions = {
  canvas_size_px?: number;
  finish_diameter_ratio?: number;
  safe_area_ratio?: number;
  include_guides?: boolean;
  extend_frame_to_bleed?: boolean;
  output_type?: "image/png" | "image/jpeg";
  quality?: number;
};

export async function render_badge_design(
  design: BadgeDesign,
  options: BadgeRenderOptions = {},
) {
  const canvas_size = options.canvas_size_px ?? default_canvas_size_px;
  const canvas = document.createElement("canvas");
  canvas.width = canvas_size;
  canvas.height = canvas_size;
  const context = get_context(canvas);

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas_size, canvas_size);

  context.save();
  create_finish_clip(context, canvas_size, options.finish_diameter_ratio);

  if (design.photo) {
    const image = await load_image(design.photo.data_url);
    draw_photo(context, image, design.photo, canvas_size);
  }

  const drawing_canvas = render_drawing_layer(
    design.drawing_strokes,
    canvas_size,
  );

  for (const id of design.layer_order) {
    const stamp = design.stamps.find((layer) => layer.id === id);
    if (stamp) {
      const image_url = stamp_catalog.find(
        (catalog_item) => catalog_item.id === stamp.catalog_id,
      )?.image_url;
      if (image_url) {
        const image = await load_image(image_url);
        draw_custom_stamp(context, image, stamp, canvas_size);
      }
      continue;
    }

    const text_layer = design.text_layers.find((layer) => layer.id === id);
    if (text_layer) {
      draw_text_layer(context, text_layer, canvas_size);
    }
  }

  context.drawImage(drawing_canvas, 0, 0);
  context.restore();

  if (design.frame) {
    context.save();
    create_finish_clip(context, canvas_size, options.finish_diameter_ratio);
    await draw_frame(
      context,
      design.frame,
      canvas_size,
      options.extend_frame_to_bleed ?? false,
    );
    context.restore();
  }

  draw_copyright(context, canvas_size);

  if (options.include_guides) {
    draw_guides(
      context,
      canvas_size,
      options.finish_diameter_ratio ?? default_finish_diameter_ratio,
    );
  }

  return canvas;
}

function draw_custom_stamp(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  stamp: StampLayer,
  canvas_size: number,
) {
  const scale = canvas_size / default_canvas_size_px;
  const size = 190 * scale;
  const image_scale = size / Math.max(image.naturalWidth, image.naturalHeight);
  const width = image.naturalWidth * image_scale;
  const height = image.naturalHeight * image_scale;
  context.save();
  context.translate(stamp.x * scale, stamp.y * scale);
  context.rotate((stamp.rotation * Math.PI) / 180);
  context.scale(stamp.flipped ? -stamp.scale : stamp.scale, stamp.scale);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.restore();
}

export function canvas_to_blob(
  canvas: HTMLCanvasElement,
  type: "image/png" | "image/jpeg",
  quality?: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("画像を書き出せませんでした。"));
        }
      },
      type,
      quality,
    );
  });
}

export async function render_share_image(design: BadgeDesign) {
  const canvas = await render_badge_design(design, {
    canvas_size_px: 1080,
    output_type: "image/jpeg",
  });
  return canvas.toDataURL("image/jpeg", 0.92);
}

function render_drawing_layer(strokes: DrawingStroke[], canvas_size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas_size;
  canvas.height = canvas_size;
  const context = get_context(canvas);
  const scale = canvas_size / default_canvas_size_px;

  for (const stroke of strokes) {
    if (stroke.points.length < 1) {
      continue;
    }

    context.save();
    context.globalAlpha = stroke.opacity;
    context.globalCompositeOperation =
      stroke.mode === "eraser" ? "destination-out" : "source-over";
    context.strokeStyle = stroke.mode === "eraser" ? "#000000" : stroke.color;
    context.lineWidth = stroke.width * scale;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(stroke.points[0].x * scale, stroke.points[0].y * scale);

    for (const point of stroke.points.slice(1)) {
      context.lineTo(point.x * scale, point.y * scale);
    }

    context.stroke();
    context.restore();
  }

  return canvas;
}

function create_finish_clip(
  context: CanvasRenderingContext2D,
  canvas_size: number,
  finish_diameter_ratio = default_finish_diameter_ratio,
) {
  const radius = (canvas_size * finish_diameter_ratio) / 2;
  context.beginPath();
  context.arc(canvas_size / 2, canvas_size / 2, radius, 0, Math.PI * 2);
  context.clip();
}

function draw_photo(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  photo: PhotoLayer,
  canvas_size: number,
) {
  const scale = canvas_size / default_canvas_size_px;
  context.save();
  context.translate(photo.x * scale, photo.y * scale);
  context.rotate((photo.rotation * Math.PI) / 180);
  context.scale(photo.scale * scale, photo.scale * scale);
  context.drawImage(image, -photo.width / 2, -photo.height / 2);
  context.restore();
}

function draw_text_layer(
  context: CanvasRenderingContext2D,
  text_layer: TextLayer,
  canvas_size: number,
) {
  const scale = canvas_size / default_canvas_size_px;
  context.save();
  context.translate(text_layer.x * scale, text_layer.y * scale);
  context.rotate((text_layer.rotation * Math.PI) / 180);
  context.scale(text_layer.scale * scale, text_layer.scale * scale);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `${text_layer.bold ? "700 " : ""}${text_layer.font_size}px ${resolve_font_family(
    text_layer.font_family,
  )}`;
  context.lineJoin = "round";

  if (text_layer.outline_width > 0) {
    context.strokeStyle = text_layer.outline_color;
    context.lineWidth = text_layer.outline_width;
    context.strokeText(text_layer.text, 0, 0);
  }

  context.fillStyle = text_layer.color;
  context.fillText(text_layer.text, 0, 0);
  context.restore();
}

function draw_copyright(
  context: CanvasRenderingContext2D,
  canvas_size: number,
) {
  const scale = canvas_size / default_canvas_size_px;
  const finish_radius = (canvas_size * default_finish_diameter_ratio) / 2;
  const x = canvas_size / 2 + finish_radius * 0.68;
  const bottom_y = canvas_size / 2 + finish_radius * 0.68;
  const font_size = 22 * scale;
  const line_height = 28 * scale;
  const lines = ["©HIKKY", "©Vket Real in Sapporo"];

  context.save();
  create_finish_clip(context, canvas_size, default_finish_diameter_ratio);
  context.font = `600 ${font_size}px system-ui, sans-serif`;
  context.textAlign = "right";
  context.textBaseline = "alphabetic";
  context.lineJoin = "round";
  context.strokeStyle = "rgba(255, 255, 255, 0.95)";
  context.lineWidth = 5 * scale;
  context.fillStyle = "#111827";

  lines.forEach((line, index) => {
    const y = bottom_y - (lines.length - 1 - index) * line_height;
    context.strokeText(line, x, y);
    context.fillText(line, x, y);
  });
  context.restore();
}

async function draw_frame(
  context: CanvasRenderingContext2D,
  frame: FrameLayer,
  canvas_size: number,
  extend_to_bleed: boolean,
) {
  const image_url = frame_catalog.find(
    (catalog_item) => catalog_item.id === frame.catalog_id,
  )?.image_url;
  if (image_url) {
    const image = await load_image(image_url);
    context.drawImage(
      prepare_frame_artwork(image, extend_to_bleed),
      0,
      0,
      canvas_size,
      canvas_size,
    );
    return;
  }

  const finish_radius = (canvas_size * default_finish_diameter_ratio) / 2;
  const frame_width = canvas_size * 0.075;
  const radius = finish_radius - frame_width / 2;
  context.save();
  if (extend_to_bleed) {
    context.strokeStyle = frame.color;
    context.lineWidth = canvas_size / 2 - finish_radius + frame_width;
    context.beginPath();
    context.arc(
      canvas_size / 2,
      canvas_size / 2,
      (canvas_size / 2 + finish_radius - frame_width) / 2,
      0,
      Math.PI * 2,
    );
    context.stroke();
  }
  context.strokeStyle = frame.color;
  context.lineWidth = frame_width;
  context.beginPath();
  context.arc(canvas_size / 2, canvas_size / 2, radius, 0, Math.PI * 2);
  context.stroke();
  context.strokeStyle = "#111827";
  context.lineWidth = canvas_size * 0.01;
  context.beginPath();
  context.arc(canvas_size / 2, canvas_size / 2, radius, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

function draw_guides(
  context: CanvasRenderingContext2D,
  canvas_size: number,
  finish_diameter_ratio: number,
) {
  context.save();
  context.setLineDash([12, 10]);
  context.strokeStyle = "#0f766e";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(
    canvas_size / 2,
    canvas_size / 2,
    (canvas_size * finish_diameter_ratio) / 2,
    0,
    Math.PI * 2,
  );
  context.stroke();
  context.restore();
}

function load_image(data_url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("プレビュー画像を読み込めませんでした。"));
    image.src = data_url;
  });
}

function get_context(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvasを初期化できませんでした。");
  }

  return context;
}
