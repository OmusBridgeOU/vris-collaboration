import {
  default_canvas_size_px,
  default_finish_diameter_ratio,
} from "./editor_constants";

// Keep only the most recently used frame; previews and exports reuse its pixels.
let cached_frame:
  | { url: string; extend_to_bleed: boolean; canvas: HTMLCanvasElement }
  | undefined;

export function prepare_frame_artwork(
  image: HTMLImageElement,
  extend_to_bleed = false,
) {
  if (
    cached_frame?.url === image.src &&
    cached_frame.extend_to_bleed === extend_to_bleed
  )
    return cached_frame.canvas;
  const source = document.createElement("canvas");
  source.width = image.naturalWidth;
  source.height = image.naturalHeight;
  const source_context = source.getContext("2d", { willReadFrequently: true });
  if (!source_context) throw new Error("フレームを読み込めませんでした。");
  source_context.drawImage(image, 0, 0);
  const pixels = source_context.getImageData(0, 0, source.width, source.height);
  const center_x = source.width / 2;
  const center_y = source.height / 2;
  let outer_radius = 0;
  for (let y = 0; y < source.height; y++) {
    for (let x = 0; x < source.width; x++) {
      if (pixels.data[(y * source.width + x) * 4 + 3] === 0) continue;
      outer_radius = Math.max(
        outer_radius,
        Math.hypot(x + 0.5 - center_x, y + 0.5 - center_y),
      );
    }
  }
  const canvas = document.createElement("canvas");
  const size = default_canvas_size_px;
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("フレームを描画できませんでした。");
  if (outer_radius > 0) {
    // Include pixel corners and leave one output pixel inside the finish line.
    const scale =
      ((size * default_finish_diameter_ratio) / 2 - 1) /
      (outer_radius + Math.SQRT1_2);
    if (extend_to_bleed) {
      draw_bleed(
        context,
        pixels,
        source.width,
        source.height,
        scale,
        outer_radius,
      );
    }
    context.drawImage(
      image,
      (size - source.width * scale) / 2,
      (size - source.height * scale) / 2,
      source.width * scale,
      source.height * scale,
    );
  }
  cached_frame = { url: image.src, extend_to_bleed, canvas };
  return canvas;
}

function draw_bleed(
  context: CanvasRenderingContext2D,
  pixels: ImageData,
  source_width: number,
  source_height: number,
  scale: number,
  outer_radius: number,
) {
  const size = default_canvas_size_px;
  const center_x = source_width / 2;
  const center_y = source_height / 2;
  const directions = 2048;
  const edges = Array.from({ length: directions }, (_, index) => {
    const angle = (index * Math.PI * 2) / directions;
    const dx = Math.cos(angle),
      dy = Math.sin(angle);
    let edge: { radius: number; offset: number } | undefined;
    for (let radius = Math.ceil(outer_radius); radius > 0; radius--) {
      const x = Math.floor(center_x + dx * radius);
      const y = Math.floor(center_y + dy * radius);
      if (x < 0 || y < 0 || x >= source_width || y >= source_height) continue;
      const offset = (y * source_width + x) * 4;
      const alpha = pixels.data[offset + 3];
      if (alpha > 0 && !edge) edge = { radius: radius * scale, offset };
      // Avoid extending the transparent antialiased fringe across the bleed.
      if (alpha >= 250) return { radius: radius * scale, offset };
    }
    return edge;
  });
  // Use the surrounding border color, so isolated lettering and branch tips
  // stay inside the finish instead of becoming long streaks in the bleed.
  const colors = edges.map((edge, index) => {
    if (!edge) return undefined;
    const samples: number[] = [];
    for (let step = -12; step <= 12; step++) {
      const neighbor = edges[(index + step * 8 + directions) % directions];
      if (neighbor) samples.push(neighbor.offset);
    }
    return [0, 1, 2, 3].map((channel) => {
      const values = samples
        .map((offset) => pixels.data[offset + channel])
        .sort((a, b) => a - b);
      return values[Math.floor(values.length / 2)];
    });
  });
  const minimum_radius = Math.min(
    ...edges.filter((edge) => edge !== undefined).map((edge) => edge.radius),
  );
  const bleed = context.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - size / 2,
        dy = y + 0.5 - size / 2;
      const radius_squared = dx * dx + dy * dy;
      if (
        radius_squared > (size * size) / 4 ||
        radius_squared < minimum_radius * minimum_radius
      )
        continue;
      const angle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
      const index = Math.floor((angle * directions) / (Math.PI * 2));
      const edge = edges[index],
        color = colors[index];
      if (!edge || !color || radius_squared < edge.radius * edge.radius)
        continue;
      const offset = (y * size + x) * 4;
      for (let channel = 0; channel < 4; channel++)
        bleed.data[offset + channel] = color[channel];
    }
  }
  context.putImageData(bleed, 0, 0);
}
