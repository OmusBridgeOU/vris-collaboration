import { expect, test } from "@playwright/test";

test("creator credits open without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "クレジット" }).click();
  await expect(page.getByRole("heading", { name: "クレジット" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "提供素材1", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
});
