import {
  create_layer_id,
  create_project_id,
  default_canvas_size_px,
  default_font_family,
  frame_catalog,
  stamp_catalog,
} from "./editor_constants";
import type {
  BadgeDesign,
  DrawingStroke,
  EditorHistory,
  EditorSelection,
  EditorSnapshot,
  FrameLayer,
  PhotoLayer,
  StampLayer,
  TextLayer,
} from "./editor_types";

export function create_empty_design(code = "001"): BadgeDesign {
  const now = new Date().toISOString();

  return {
    project_id: create_project_id(),
    local_project_code: code,
    stamps: [],
    drawing_strokes: [],
    text_layers: [],
    layer_order: [],
    created_at: now,
    updated_at: now,
    ordered: false,
  };
}

export function create_history(design = create_empty_design()): EditorHistory {
  return {
    past: [],
    present: design,
    future: [],
  };
}

export function clone_design(design: BadgeDesign): BadgeDesign {
  return JSON.parse(JSON.stringify(design)) as BadgeDesign;
}

export function commit_design(
  history: EditorHistory,
  update: (draft: BadgeDesign) => void,
): EditorHistory {
  const next = clone_design(history.present);
  update(next);
  next.updated_at = new Date().toISOString();

  return {
    past: [...history.past, history.present].slice(-40),
    present: next,
    future: [],
  };
}

export function undo_design(history: EditorHistory): EditorHistory {
  const previous = history.past.at(-1);
  if (!previous) {
    return history;
  }

  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  };
}

export function redo_design(history: EditorHistory): EditorHistory {
  const next = history.future[0];
  if (!next) {
    return history;
  }

  return {
    past: [...history.past, history.present],
    present: next,
    future: history.future.slice(1),
  };
}

export function set_photo(
  history: EditorHistory,
  photo: PhotoLayer,
  thumbnail_data_url: string,
) {
  return commit_design(history, (draft) => {
    draft.photo = photo;
    draft.thumbnail_data_url = thumbnail_data_url;
  });
}

export function reset_photo_transform(history: EditorHistory) {
  return commit_design(history, (draft) => {
    if (!draft.photo) {
      return;
    }

    draft.photo.x = default_canvas_size_px / 2;
    draft.photo.y = default_canvas_size_px / 2;
    draft.photo.scale = 1;
    draft.photo.rotation = 0;
  });
}

export function add_stamp(history: EditorHistory, catalog_id: string) {
  const catalog_item =
    stamp_catalog.find((stamp) => stamp.id === catalog_id) ?? stamp_catalog[0];
  const id = create_layer_id("stamp");
  const stamp: StampLayer = {
    id,
    catalog_id: catalog_item.id,
    label: catalog_item.label,
    x: default_canvas_size_px / 2,
    y: default_canvas_size_px / 2,
    scale: 1,
    rotation: 0,
    flipped: false,
    color: catalog_item.color,
  };

  return {
    history: commit_design(history, (draft) => {
      draft.stamps.push(stamp);
      draft.layer_order.push(id);
    }),
    selection: { kind: "stamp", id } satisfies EditorSelection,
  };
}

export function add_text(history: EditorHistory, value = "テキスト") {
  const id = create_layer_id("text");
  const text_layer: TextLayer = {
    id,
    text: value,
    font_family: default_font_family,
    font_size: 96,
    color: "#111827",
    outline_color: "#ffffff",
    outline_width: 8,
    bold: true,
    x: default_canvas_size_px / 2,
    y: default_canvas_size_px / 2,
    scale: 1,
    rotation: 0,
  };

  return {
    history: commit_design(history, (draft) => {
      draft.text_layers.push(text_layer);
      draft.layer_order.push(id);
    }),
    selection: { kind: "text", id } satisfies EditorSelection,
  };
}

export function set_frame(history: EditorHistory, catalog_id: string) {
  const catalog_item =
    frame_catalog.find((frame) => frame.id === catalog_id) ?? frame_catalog[0];

  return commit_design(history, (draft) => {
    draft.frame =
      catalog_item.id === "none"
        ? undefined
        : ({
            catalog_id: catalog_item.id,
            label: catalog_item.label,
            color: catalog_item.color,
          } satisfies FrameLayer);
  });
}

export function update_selected_transform(
  history: EditorHistory,
  selection: EditorSelection | undefined,
  transform: Partial<Pick<PhotoLayer, "x" | "y" | "scale" | "rotation">>,
) {
  return commit_design(history, (draft) => {
    const target = find_selected_transformable(draft, selection);
    if (!target) {
      return;
    }

    Object.assign(target, transform);
  });
}

export function remove_selected_layer(
  history: EditorHistory,
  selection: EditorSelection | undefined,
) {
  if (!selection || selection.kind === "photo") {
    return history;
  }

  return commit_design(history, (draft) => {
    if (selection.kind === "stamp") {
      draft.stamps = draft.stamps.filter((stamp) => stamp.id !== selection.id);
    }

    if (selection.kind === "text") {
      draft.text_layers = draft.text_layers.filter(
        (text_layer) => text_layer.id !== selection.id,
      );
    }

    draft.layer_order = draft.layer_order.filter((id) => id !== selection.id);
  });
}

export function move_selected_layer(
  history: EditorHistory,
  selection: EditorSelection | undefined,
  direction: "front" | "back",
) {
  if (!selection || selection.kind === "photo") {
    return history;
  }

  return commit_design(history, (draft) => {
    const index = draft.layer_order.indexOf(selection.id);
    if (index === -1) {
      return;
    }

    draft.layer_order.splice(index, 1);
    if (direction === "front") {
      draft.layer_order.push(selection.id);
    } else {
      draft.layer_order.unshift(selection.id);
    }
  });
}

export function update_text_layer(
  history: EditorHistory,
  id: string,
  update: Partial<TextLayer>,
) {
  return commit_design(history, (draft) => {
    const text_layer = draft.text_layers.find((layer) => layer.id === id);
    if (text_layer) {
      Object.assign(text_layer, update);
    }
  });
}

export function update_stamp_layer(
  history: EditorHistory,
  id: string,
  update: Partial<StampLayer>,
) {
  return commit_design(history, (draft) => {
    const stamp = draft.stamps.find((layer) => layer.id === id);
    if (stamp) {
      Object.assign(stamp, update);
    }
  });
}

export function add_drawing_stroke(
  history: EditorHistory,
  stroke: DrawingStroke,
) {
  return commit_design(history, (draft) => {
    draft.drawing_strokes.push(stroke);
  });
}

export function reset_design(history: EditorHistory) {
  const current = history.present;
  const reset = create_empty_design(current.local_project_code);
  reset.project_id = current.project_id;
  reset.created_at = current.created_at;

  return {
    past: [...history.past, history.present].slice(-40),
    present: reset,
    future: [],
  };
}

export function get_selected_text(
  design: BadgeDesign,
  selection: EditorSelection | undefined,
) {
  if (!selection || selection.kind !== "text") {
    return undefined;
  }

  return design.text_layers.find((layer) => layer.id === selection.id);
}

export function get_selected_stamp(
  design: BadgeDesign,
  selection: EditorSelection | undefined,
) {
  if (!selection || selection.kind !== "stamp") {
    return undefined;
  }

  return design.stamps.find((layer) => layer.id === selection.id);
}

export function snapshot_has_drawing_only_eraser(
  before: EditorSnapshot,
  after: EditorSnapshot,
) {
  return (
    before.photo?.data_url === after.photo?.data_url &&
    before.stamps.length === after.stamps.length &&
    before.text_layers.length === after.text_layers.length &&
    after.drawing_strokes.some((stroke) => stroke.mode === "eraser")
  );
}

function find_selected_transformable(
  design: BadgeDesign,
  selection: EditorSelection | undefined,
) {
  if (!selection || selection.kind === "photo") {
    return design.photo;
  }

  if (selection.kind === "stamp") {
    return design.stamps.find((stamp) => stamp.id === selection.id);
  }

  return design.text_layers.find(
    (text_layer) => text_layer.id === selection.id,
  );
}
