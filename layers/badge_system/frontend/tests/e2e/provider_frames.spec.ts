import { expect, test } from "@playwright/test";

test("provider PNG frame stays selected after saving and reloading", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await page.getByRole("button", { name: "枠", exact: true }).click();
  await expect(page.getByRole("button", { name: /frame0[1-7]/ })).toHaveCount(
    7,
  );
  await page.getByRole("button", { name: /frame01/ }).click();
  const read_frame = () =>
    page.evaluate(
      async () =>
        new Promise<string | undefined>((resolve, reject) => {
          const request = indexedDB.open("vris_badge_project_storage");
          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
            const database = request.result;
            const transaction = database.transaction("projects", "readonly");
            const query = transaction
              .objectStore("projects")
              .index("by-local-code")
              .get("001");
            query.onsuccess = () =>
              resolve(query.result?.editor_design?.frame?.catalog_id);
            query.onerror = () => reject(query.error);
            transaction.oncomplete = () => database.close();
          };
        }),
    );
  await expect.poll(read_frame).toBe("provider_frame_frame01");
  await page.reload();
  await page.getByRole("button", { name: "編集", exact: true }).click();
  await page.getByRole("button", { name: "枠", exact: true }).click();
  await expect.poll(read_frame).toBe("provider_frame_frame01");
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.screenshot({
    path: `../docs/screenshots/provider_frames_${test.info().project.name}.png`,
  });
});
