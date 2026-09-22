import { expect, test } from "@playwright/test";

test("creator credits button stays hidden until metadata is ready", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "クレジット" })).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);
});
