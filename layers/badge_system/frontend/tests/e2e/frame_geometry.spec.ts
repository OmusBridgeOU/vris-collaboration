import { expect, test } from "@playwright/test";

test("frame edge colors continue through 70mm only for print output", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const renderer_path = "/src/features/editor/editor_renderer.ts";
    const constants_path = "/src/features/editor/editor_constants.ts";
    const state_path = "/src/features/editor/editor_state.ts";
    const { render_badge_design } = await import(renderer_path);
    const { frame_catalog } = await import(constants_path);
    const { create_empty_design } = await import(state_path);
    const source = document.createElement("canvas");
    source.width = source.height = 200;
    const source_context = source.getContext("2d")!;
    source_context.strokeStyle = "#0066cc";
    source_context.lineWidth = 24;
    source_context.beginPath();
    source_context.arc(100, 100, 86, 0, Math.PI * 2);
    source_context.stroke();
    // Distinct decoration near the edge must survive, without entering the bleed.
    source_context.fillStyle = "#ff0000";
    source_context.fillRect(96, 8, 8, 10);
    source_context.fillRect(185, 96, 15, 8);
    const id = "geometry_fixture";
    frame_catalog.push({
      id,
      label: id,
      color: "transparent",
      image_url: source.toDataURL(),
    });
    const design = create_empty_design();
    design.frame = { catalog_id: id, label: id, color: "transparent" };
    const measure = (canvas: HTMLCanvasElement) => {
      const size = canvas.width;
      const context = canvas.getContext("2d")!;
      const pixels = context.getImageData(0, 0, size, size).data;
      let red_count = 0,
        max_red_radius = 0;
      for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
          const offset = (y * size + x) * 4;
          if (
            pixels[offset] > 200 &&
            pixels[offset + 1] < 30 &&
            pixels[offset + 2] < 30
          ) {
            red_count++;
            max_red_radius = Math.max(
              max_red_radius,
              Math.hypot(x + 0.5 - size / 2, y + 0.5 - size / 2),
            );
          }
        }
      const sample = (x: number, y: number) =>
        Array.from(
          context.getImageData(Math.floor(x * size), Math.floor(y * size), 1, 1)
            .data,
        );
      return {
        red_count,
        max_red_radius,
        inner: sample(0.5, 0.1),
        outer: sample(0.5, 0.025),
        outer_right: sample(0.975, 0.5),
        center: sample(0.5, 0.5),
        corner: sample(0, 0),
      };
    };
    const measurements = [];
    for (const size of [360, 1080, 1200]) {
      const preview_canvas = await render_badge_design(design, {
        canvas_size_px: size,
        finish_diameter_ratio: 1,
      });
      const print_canvas = await render_badge_design(design, {
        canvas_size_px: size,
        finish_diameter_ratio: 1,
        extend_frame_to_bleed: true,
      });
      measurements.push({
        size,
        preview: measure(preview_canvas),
        print: measure(print_canvas),
      });
    }
    frame_catalog.pop();
    return measurements;
  });
  for (const measurement of result) {
    for (const output of [measurement.preview, measurement.print]) {
      expect(output.red_count).toBeGreaterThan(0);
      expect(output.max_red_radius).toBeLessThan(
        (measurement.size * 58) / 70 / 2,
      );
      expect(output.inner).toEqual([0, 102, 204, 255]);
      expect(output.center).toEqual([255, 255, 255, 255]);
      expect(output.corner).toEqual([255, 255, 255, 255]);
    }
    expect(measurement.preview.outer).toEqual([255, 255, 255, 255]);
    expect(measurement.preview.outer_right).toEqual([255, 255, 255, 255]);
    expect(measurement.print.outer).toEqual(measurement.print.inner);
    expect(measurement.print.outer_right).toEqual(measurement.print.inner);
  }
});
