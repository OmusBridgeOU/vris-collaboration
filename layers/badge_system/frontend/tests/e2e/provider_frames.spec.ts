import { expect, test } from "@playwright/test";

test("provider PNG frame stays selected after saving and reloading", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await page.getByRole("button", { name: "枠", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /^枠[1-7]を選択$/ }),
  ).toHaveCount(7);
  await page.getByRole("button", { name: "枠1を選択" }).click();
  await expect(page.getByRole("button", { name: "枠1を選択" })).toHaveText("");
  await expect(page.getByRole("button", { name: "枠1を選択" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByText(/^frame0[1-7]$/)).toHaveCount(0);
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
});

test("stamp choices show images without material names", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await page.getByRole("button", { name: "スタンプ", exact: true }).click();
  const choices = page.getByRole("button", { name: /^スタンプ\d+を追加$/ });
  expect(await choices.count()).toBeGreaterThan(0);
  for (const choice of await choices.all()) {
    await expect(choice).toHaveText("");
    await expect(choice.locator("img")).toHaveAttribute("alt", "");
  }
  await choices.first().click();
  await expect(page.getByText(/^typo\d+$/)).toHaveCount(0);
});
