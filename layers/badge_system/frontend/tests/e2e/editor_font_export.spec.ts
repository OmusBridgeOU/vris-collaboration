import { expect, test, type Page } from "@playwright/test";

const mincho_font_family =
  '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "MS PMincho", serif';

test("visitor selects a font and keeps it after reload at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await open_new_editor(page);

  await page.getByRole("button", { name: "文字" }).click();
  await page.getByRole("button", { name: "テキストを追加" }).click();

  const font_selector = page.getByLabel("フォント");
  await expect(font_selector).toHaveValue("system-ui");
  await font_selector.selectOption({ label: "明朝" });
  await expect(font_selector).toHaveValue(mincho_font_family);
  expect((await font_selector.boundingBox())?.height).toBeGreaterThanOrEqual(
    44,
  );

  await expect
    .poll(() => read_saved_font_family(page))
    .toBe(mincho_font_family);
  await expect
    .poll(() => read_saved_thumbnail(page))
    .toMatch(/^data:image\/jpeg/);

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);

  await page.reload();
  await page.getByRole("button", { name: "編集" }).click();
  await page.getByRole("button", { name: "文字" }).click();
  const preview = page.getByLabel("缶バッジ編集プレビュー");
  const preview_box = await preview.boundingBox();
  if (!preview_box) {
    throw new Error("editor preview is not visible");
  }
  await preview.click({
    position: { x: preview_box.width / 2, y: preview_box.height / 2 },
  });

  await expect(page.getByLabel("フォント")).toHaveValue(mincho_font_family);
});

test("saved JPEG omits editor decoration and retains selected frame artwork", async ({
  page,
}) => {
  await open_new_editor(page);
  await upload_solid_photo(page);

  await page.getByRole("button", { name: "文字" }).click();
  await page.getByRole("button", { name: "テキストを追加" }).click();
  await page.getByLabel("テキスト").fill("日本語");
  await page.getByLabel("フォント").selectOption({ label: "ゴシック" });
  await page.getByRole("button", { name: "枠" }).click();
  await page.getByRole("button", { name: "ブルー" }).click();

  const download_event = page.waitForEvent("download");
  await page.getByRole("button", { name: "画像を保存" }).click();
  const download = await download_event;
  expect(download.suggestedFilename()).toMatch(/^vris-badge-001-\d+\.jpg$/);

  await expect.poll(() => read_share_image(page)).toMatch(/^data:image\/jpeg/);
  const share_image = await read_share_image(page);
  const pixels = await inspect_export_pixels(page, share_image);

  expect(pixels.width).toBe(1080);
  expect(pixels.height).toBe(1080);
  expect(pixels.blue_frame_pixels).toBeGreaterThan(1_000);
  expect(pixels.blue_center_pixels).toBeLessThan(50);
  expect(pixels.guide_pixels).toBeLessThan(50);
  expect(pixels.rotate_handle_pixels).toBeLessThan(50);
  expect(pixels.ui_border_pixels).toBeLessThan(100);

  await page.getByRole("button", { name: "文字" }).click();
  await page.getByLabel("フォント").selectOption({ label: "明朝" });
  await expect
    .poll(() => read_saved_font_family(page))
    .toBe(mincho_font_family);
  await expect.poll(() => read_share_image(page)).toBe("");
});

async function open_new_editor(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await expect(page.getByLabel("缶バッジ編集プレビュー")).toBeVisible();
}

async function upload_solid_photo(page: Page) {
  const base64_png = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("test canvas unavailable");
    }
    context.fillStyle = "#f5f1e8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png").split(",")[1];
  });

  await page.locator('input[type="file"]').setInputFiles({
    name: "solid_photo.png",
    mimeType: "image/png",
    buffer: Buffer.from(base64_png, "base64"),
  });
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const canvas = document.querySelector("canvas");
        return canvas?.toDataURL("image/png").length ?? 0;
      }),
    )
    .toBeGreaterThan(1_000);
}

async function read_saved_font_family(page: Page) {
  const project = await read_first_project(page);
  return project?.editor_design?.text_layers?.[0]?.font_family ?? null;
}

async function read_share_image(page: Page) {
  const project = await read_first_project(page);
  return project?.share_image_data_url ?? "";
}

async function read_saved_thumbnail(page: Page) {
  const project = await read_first_project(page);
  return project?.thumbnail_data_url ?? "";
}

async function read_first_project(page: Page) {
  return page.evaluate(
    () =>
      new Promise<{
        editor_design?: { text_layers?: Array<{ font_family?: string }> };
        share_image_data_url?: string | null;
        thumbnail_data_url?: string;
      } | null>((resolve, reject) => {
        const request = indexedDB.open("vris_badge_project_storage");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const transaction = database.transaction("projects", "readonly");
          const projects = transaction.objectStore("projects");
          const get_request = projects.getAll();
          get_request.onerror = () => reject(get_request.error);
          get_request.onsuccess = () => resolve(get_request.result[0] ?? null);
          transaction.oncomplete = () => database.close();
        };
      }),
  );
}

async function inspect_export_pixels(page: Page, image_data_url: string) {
  return page.evaluate(async (data_url) => {
    const image = new Image();
    image.src = data_url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      throw new Error("test canvas unavailable");
    }
    context.drawImage(image, 0, 0);
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let blue_frame_pixels = 0;
    let blue_center_pixels = 0;
    let guide_pixels = 0;
    let rotate_handle_pixels = 0;
    let ui_border_pixels = 0;
    const near_color = (
      red: number,
      green: number,
      blue: number,
      expected_red: number,
      expected_green: number,
      expected_blue: number,
      tolerance: number,
    ) =>
      Math.abs(red - expected_red) <= tolerance &&
      Math.abs(green - expected_green) <= tolerance &&
      Math.abs(blue - expected_blue) <= tolerance;

    for (let offset = 0; offset < data.length; offset += 4) {
      const pixel_index = offset / 4;
      const x = pixel_index % canvas.width;
      const y = Math.floor(pixel_index / canvas.width);
      const radius = Math.hypot(x - canvas.width / 2, y - canvas.height / 2);
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];

      if (near_color(red, green, blue, 37, 99, 235, 22)) {
        if (radius > 420) {
          blue_frame_pixels += 1;
        }
        if (radius < 350) {
          blue_center_pixels += 1;
        }
      }
      if (near_color(red, green, blue, 15, 118, 110, 18)) {
        guide_pixels += 1;
      }
      if (near_color(red, green, blue, 185, 28, 28, 18)) {
        rotate_handle_pixels += 1;
      }
      if (near_color(red, green, blue, 203, 213, 225, 12)) {
        ui_border_pixels += 1;
      }
    }

    return {
      width: canvas.width,
      height: canvas.height,
      blue_frame_pixels,
      blue_center_pixels,
      guide_pixels,
      rotate_handle_pixels,
      ui_border_pixels,
    };
  }, image_data_url);
}
