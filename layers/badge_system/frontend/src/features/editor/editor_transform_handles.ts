import type {
  BadgeDesign,
  EditorSelection,
  StampLayer,
  StrokePoint,
  TextLayer,
} from "./editor_types";

export type TransformHandleAction = "move" | "scale" | "rotate";

export type TransformBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type TransformHit = {
  selection: EditorSelection;
  action: TransformHandleAction;
};

type TransformHitOptions = {
  cycle_overlapping_selection?: boolean;
  include_photo_target?: boolean;
};

const stamp_box_size_px = 190;
const minimum_text_box_width_px = 120;
const maximum_handle_hit_radius_px = 54;
const minimum_handle_hit_radius_px = 8;
const rotate_handle_offset_px = 92;

export function get_transform_box(
  design: BadgeDesign,
  selection: EditorSelection | undefined,
): TransformBox | undefined {
  if (!selection) {
    return undefined;
  }

  if (selection.kind === "photo") {
    const photo = design.photo;
    if (!photo) {
      return undefined;
    }

    return {
      x: photo.x,
      y: photo.y,
      width: photo.width * photo.scale,
      height: photo.height * photo.scale,
      rotation: photo.rotation,
    };
  }

  if (selection.kind === "stamp") {
    const stamp = design.stamps.find((layer) => layer.id === selection.id);
    return stamp ? stamp_box(stamp) : undefined;
  }

  const text_layer = design.text_layers.find(
    (layer) => layer.id === selection.id,
  );
  return text_layer ? text_box(text_layer) : undefined;
}

export function get_transform_box_corners(box: TransformBox) {
  const half_width = box.width / 2;
  const half_height = box.height / 2;

  return [
    rotate_point({ x: -half_width, y: -half_height }, box),
    rotate_point({ x: half_width, y: -half_height }, box),
    rotate_point({ x: half_width, y: half_height }, box),
    rotate_point({ x: -half_width, y: half_height }, box),
  ];
}

export function get_transform_control_points(box: TransformBox) {
  const corners = get_transform_box_corners(box);
  const top_center = rotate_point({ x: 0, y: -box.height / 2 }, box);
  const rotate_handle = rotate_point(
    { x: 0, y: -box.height / 2 - rotate_handle_offset_px },
    box,
  );

  return {
    corners,
    rotate_handle,
    top_center,
  };
}

export function hit_test_transform(
  design: BadgeDesign,
  point: StrokePoint,
  current_selection: EditorSelection | undefined,
  options: TransformHitOptions = {},
): TransformHit | undefined {
  const selected_box = is_transform_selection_enabled(
    current_selection,
    options,
  )
    ? get_transform_box(design, current_selection)
    : undefined;
  if (selected_box && current_selection) {
    const controls = get_transform_control_points(selected_box);
    const move_target = {
      ...selected_box,
      width: selected_box.width * 0.6,
      height: selected_box.height * 0.6,
    };
    if (point_in_rotated_box(point, move_target)) {
      return { selection: current_selection, action: "move" };
    }

    const handle_hit_radius = Math.min(
      maximum_handle_hit_radius_px,
      Math.max(
        minimum_handle_hit_radius_px,
        Math.min(selected_box.width, selected_box.height) * 0.28,
      ),
    );
    if (
      controls.corners.some(
        (corner) => distance(corner, point) <= handle_hit_radius,
      )
    ) {
      return { selection: current_selection, action: "scale" };
    }

    if (
      distance(controls.rotate_handle, point) <= maximum_handle_hit_radius_px
    ) {
      return { selection: current_selection, action: "rotate" };
    }
  }

  const hit_targets = get_transform_targets(design, options).filter((target) =>
    point_in_rotated_box(point, target.box),
  );

  if (hit_targets.length === 0) {
    return undefined;
  }

  const selected_index = current_selection
    ? hit_targets.findIndex((target) =>
        selections_equal(target.selection, current_selection),
      )
    : -1;
  const target =
    options.cycle_overlapping_selection && selected_index > 0
      ? hit_targets[selected_index - 1]
      : selected_index >= 0 && !options.cycle_overlapping_selection
        ? hit_targets[selected_index]
        : hit_targets.at(-1);

  return target ? { selection: target.selection, action: "move" } : undefined;
}

function get_transform_targets(
  design: BadgeDesign,
  options: TransformHitOptions,
) {
  const targets: Array<{ selection: EditorSelection; box: TransformBox }> = [];

  if (design.photo && options.include_photo_target) {
    targets.push({
      selection: { kind: "photo" },
      box: {
        x: design.photo.x,
        y: design.photo.y,
        width: design.photo.width * design.photo.scale,
        height: design.photo.height * design.photo.scale,
        rotation: design.photo.rotation,
      },
    });
  }

  for (const id of design.layer_order) {
    const stamp = design.stamps.find((layer) => layer.id === id);
    if (stamp) {
      targets.push({
        selection: { kind: "stamp", id },
        box: stamp_box(stamp),
      });
      continue;
    }

    const text_layer = design.text_layers.find((layer) => layer.id === id);
    if (text_layer) {
      targets.push({
        selection: { kind: "text", id },
        box: text_box(text_layer),
      });
    }
  }

  return targets;
}

function is_transform_selection_enabled(
  selection: EditorSelection | undefined,
  options: TransformHitOptions,
) {
  return Boolean(
    selection && (selection.kind !== "photo" || options.include_photo_target),
  );
}

function stamp_box(stamp: StampLayer): TransformBox {
  const size = stamp_box_size_px * stamp.scale;
  return {
    x: stamp.x,
    y: stamp.y,
    width: size,
    height: size,
    rotation: stamp.rotation,
  };
}

function text_box(text_layer: TextLayer): TransformBox {
  const estimated_width = Math.max(
    minimum_text_box_width_px,
    text_layer.text.length * text_layer.font_size * 0.62,
  );

  return {
    x: text_layer.x,
    y: text_layer.y,
    width: estimated_width * text_layer.scale,
    height: text_layer.font_size * 1.25 * text_layer.scale,
    rotation: text_layer.rotation,
  };
}

function point_in_rotated_box(point: StrokePoint, box: TransformBox) {
  const angle = (-box.rotation * Math.PI) / 180;
  const local_x =
    (point.x - box.x) * Math.cos(angle) - (point.y - box.y) * Math.sin(angle);
  const local_y =
    (point.x - box.x) * Math.sin(angle) + (point.y - box.y) * Math.cos(angle);

  return (
    Math.abs(local_x) <= box.width / 2 && Math.abs(local_y) <= box.height / 2
  );
}

function rotate_point(point: StrokePoint, box: TransformBox) {
  const angle = (box.rotation * Math.PI) / 180;
  return {
    x: box.x + point.x * Math.cos(angle) - point.y * Math.sin(angle),
    y: box.y + point.x * Math.sin(angle) + point.y * Math.cos(angle),
  };
}

function distance(a: StrokePoint, b: StrokePoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function selections_equal(
  first: EditorSelection | undefined,
  second: EditorSelection | undefined,
) {
  if (!first || !second || first.kind !== second.kind) {
    return false;
  }

  if (first.kind === "photo" && second.kind === "photo") {
    return true;
  }

  return "id" in first && "id" in second && first.id === second.id;
}
