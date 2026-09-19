import {
  get_transform_box,
  get_transform_control_points,
  hit_test_transform,
} from "./editor_transform_handles";
import { create_empty_design } from "./editor_state";
import type { BadgeDesign } from "./editor_types";

function design_with_photo(): BadgeDesign {
  return {
    ...create_empty_design("B-009"),
    photo: {
      data_url: "data:image/png;base64,test",
      width: 400,
      height: 300,
      scale: 1,
      rotation: 0,
      x: 600,
      y: 600,
      low_resolution: false,
    },
  };
}

describe("editor_transform_handles", () => {
  it("hits the selected layer body as a move action", () => {
    const design = design_with_photo();
    const hit = hit_test_transform(
      design,
      { x: 600, y: 600 },
      { kind: "photo" },
      { include_photo_target: true },
    );

    expect(hit).toEqual({
      selection: { kind: "photo" },
      action: "move",
    });
  });

  it("does not hit the photo unless photo operations are enabled", () => {
    const design = design_with_photo();

    expect(
      hit_test_transform(design, { x: 600, y: 600 }, { kind: "photo" }),
    ).toBeUndefined();
  });

  it("hits a selected layer corner as a scale action", () => {
    const design = design_with_photo();
    const box = get_transform_box(design, { kind: "photo" });
    expect(box).toBeDefined();

    const controls = get_transform_control_points(box!);
    const hit = hit_test_transform(
      design,
      controls.corners[2],
      {
        kind: "photo",
      },
      { include_photo_target: true },
    );

    expect(hit).toEqual({
      selection: { kind: "photo" },
      action: "scale",
    });
  });

  it("does not hit empty canvas space", () => {
    const design = design_with_photo();

    expect(
      hit_test_transform(design, { x: 50, y: 50 }, { kind: "photo" }),
    ).toBeUndefined();
  });

  it("keeps the current selection when dragging an overlapped object", () => {
    const design: BadgeDesign = {
      ...create_empty_design("B-010"),
      stamps: [
        {
          id: "lower-stamp",
          catalog_id: "vris_star",
          label: "Lower",
          x: 600,
          y: 600,
          scale: 1,
          rotation: 0,
          flipped: false,
          color: "#2563eb",
        },
        {
          id: "upper-stamp",
          catalog_id: "vris_star",
          label: "Upper",
          x: 600,
          y: 600,
          scale: 1,
          rotation: 0,
          flipped: false,
          color: "#ef4444",
        },
      ],
      layer_order: ["lower-stamp", "upper-stamp"],
    };

    expect(hit_test_transform(design, { x: 600, y: 600 }, undefined)).toEqual({
      selection: { kind: "stamp", id: "upper-stamp" },
      action: "move",
    });

    expect(
      hit_test_transform(
        design,
        { x: 600, y: 600 },
        {
          kind: "stamp",
          id: "upper-stamp",
        },
      ),
    ).toEqual({
      selection: { kind: "stamp", id: "upper-stamp" },
      action: "move",
    });

    expect(
      hit_test_transform(
        design,
        { x: 600, y: 600 },
        {
          kind: "stamp",
          id: "lower-stamp",
        },
      ),
    ).toEqual({
      selection: { kind: "stamp", id: "lower-stamp" },
      action: "move",
    });
  });

  it("selects the layer below the current selection when tapping an overlap", () => {
    const design: BadgeDesign = {
      ...create_empty_design("B-011"),
      stamps: [
        {
          id: "lower-stamp",
          catalog_id: "vris_star",
          label: "Lower",
          x: 600,
          y: 600,
          scale: 1,
          rotation: 0,
          flipped: false,
          color: "#2563eb",
        },
        {
          id: "upper-stamp",
          catalog_id: "vris_star",
          label: "Upper",
          x: 600,
          y: 600,
          scale: 1,
          rotation: 0,
          flipped: false,
          color: "#ef4444",
        },
      ],
      layer_order: ["lower-stamp", "upper-stamp"],
    };

    expect(
      hit_test_transform(
        design,
        { x: 600, y: 600 },
        {
          kind: "stamp",
          id: "upper-stamp",
        },
        { cycle_overlapping_selection: true },
      ),
    ).toEqual({
      selection: { kind: "stamp", id: "lower-stamp" },
      action: "move",
    });

    expect(
      hit_test_transform(
        design,
        { x: 600, y: 600 },
        {
          kind: "stamp",
          id: "lower-stamp",
        },
        { cycle_overlapping_selection: true },
      ),
    ).toEqual({
      selection: { kind: "stamp", id: "upper-stamp" },
      action: "move",
    });
  });
});
