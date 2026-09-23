import { expect, test } from "@playwright/test";

test("saved designs are the first smartphone page", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "作成したデザイン" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "新しいデザインを作る" }),
  ).toBeVisible();
  await expect(page.getByText("現在の設定")).toHaveCount(0);

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
});
