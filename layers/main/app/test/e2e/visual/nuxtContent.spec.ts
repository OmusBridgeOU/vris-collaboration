// app/test/e2e/visual/pages.spec.ts
import { test, expect } from '@playwright/test'

// テスト対象となるページ: nuxtContentを使用しているページ
const PAGES = [
  { name: 'terms', path: '/documents/terms' },
  { name: 'policy', path: '/documents/policy' },
]

for (const { name, path } of PAGES) {
  test(`${name}: ページの表示がベース画像と一致する`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot(`${name}.png`, {
      maxDiffPixelRatio: 0.02,
      fullPage: true,
    })
  })
}
