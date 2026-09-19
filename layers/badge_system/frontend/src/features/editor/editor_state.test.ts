import {
  add_drawing_stroke,
  add_stamp,
  add_text,
  create_empty_design,
  create_history,
  move_selected_layer,
  redo_design,
  remove_selected_layer,
  snapshot_has_drawing_only_eraser,
  undo_design,
  update_text_layer,
} from "./editor_state";
import { default_font_family, font_catalog } from "./editor_constants";
import type { DrawingStroke } from "./editor_types";

describe("editor_state", () => {
  it("keeps undo and redo history for layer edits", () => {
    const history = create_history(create_empty_design("B-007"));
    const stamp_result = add_stamp(history, "vris_star");
    const with_text = add_text(stamp_result.history, "VRIS");

    expect(with_text.history.present.layer_order).toHaveLength(2);

    const undone = undo_design(with_text.history);
    expect(undone.present.layer_order).toHaveLength(1);

    const redone = redo_design(undone);
    expect(redone.present.layer_order).toHaveLength(2);
  });

  it("moves and removes only the selected editable layer", () => {
    const first = add_stamp(create_history(create_empty_design()), "vris_star");
    const second = add_text(first.history, "Text");
    const moved = move_selected_layer(second.history, first.selection, "front");

    expect(moved.present.layer_order.at(-1)).toBe(first.selection.id);

    const removed = remove_selected_layer(moved, first.selection);
    expect(removed.present.stamps).toHaveLength(0);
    expect(removed.present.text_layers).toHaveLength(1);
  });

  it("records eraser strokes without changing photo, stamps, or text", () => {
    const with_stamp = add_stamp(
      create_history(create_empty_design()),
      "vris_star",
    );
    const before = with_stamp.history.present;
    const stroke: DrawingStroke = {
      id: "eraser-1",
      mode: "eraser",
      color: "#000000",
      width: 24,
      opacity: 1,
      points: [
        { x: 10, y: 10 },
        { x: 60, y: 60 },
      ],
    };
    const after = add_drawing_stroke(with_stamp.history, stroke).present;

    expect(snapshot_has_drawing_only_eraser(before, after)).toBe(true);
  });

  it("stores font selection in text history and preserves undo and redo", () => {
    const added = add_text(create_history(create_empty_design()), "日本語");
    const text_id = added.selection.id;
    expect(added.history.present.text_layers[0].font_family).toBe(
      default_font_family,
    );

    const selected_font = font_catalog[2].font_family;
    const updated = update_text_layer(added.history, text_id, {
      font_family: selected_font,
    });
    expect(updated.present.text_layers[0].font_family).toBe(selected_font);
    expect(undo_design(updated).present.text_layers[0].font_family).toBe(
      default_font_family,
    );
    expect(
      redo_design(undo_design(updated)).present.text_layers[0].font_family,
    ).toBe(selected_font);
  });
});
