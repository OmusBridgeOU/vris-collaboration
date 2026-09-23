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

  await expect
    .poll(() => read_saved_font_family(page))
    .toBe(mincho_font_family);
  await expect
    .poll(() => read_saved_thumbnail(page))
    .toMatch(/^data:image\/jpeg/);

  await page.reload();
  await expect
    .poll(() => read_saved_font_family(page))
    .toBe(mincho_font_family);
});

async function open_new_editor(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await expect(page.getByLabel("缶バッジ編集プレビュー")).toBeVisible();
}

async function read_saved_font_family(page: Page) {
  const project = await read_first_project(page);
  return project?.editor_design?.text_layers?.[0]?.font_family ?? null;
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
