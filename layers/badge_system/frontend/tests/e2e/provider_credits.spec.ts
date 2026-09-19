import { expect, test } from "@playwright/test";

test("visitor can open creator credits without mobile overflow", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "クレジット" }).click();

  await expect(page.getByRole("heading", { name: "クレジット" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "提供PNGスタンプ" }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: /のスタンプ/ })).toHaveCount(14);
  await expect(page.getByText("内蔵スタンプ・フレーム")).toHaveCount(0);
  await expect(page.getByText("UIアイコン")).toHaveCount(0);
  await expect(page.getByText(/ライセンス/)).toHaveCount(0);
  await expect(page.getByText("SNS・Web")).toHaveCount(14);
  const columns = await page
    .locator("li")
    .first()
    .evaluate((card) =>
      getComputedStyle(card).gridTemplateColumns.split(" ").filter(Boolean),
    );
  expect(columns).toHaveLength(2);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false);

  await page.screenshot({
    path: `../docs/screenshots/provider_credits_${test.info().project.name}.png`,
  });
});
