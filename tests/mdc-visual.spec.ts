/**
 * @nuxtjs/mdc ビジュアルリグレッションテスト
 *
 * 目的:
 *   @nuxtjs/mdc のパッケージ更新前後でページの見た目が変わっていないことを確認する
 *
 * 使い方:
 *   1. パッケージ更新「前」に一度実行してベースライン画像を作成する
 *      npx playwright test mdc-visual.spec.ts --update-snapshots
 *
 *   2. パッケージを更新する（package.json を変更して npm install など）
 *
 *   3. 再度実行して差分がないことを確認する
 *      npx playwright test mdc-visual.spec.ts
 *
 *   4. 差分がある場合、playwright-report/ に差分画像が生成されるので確認する
 */

import { test, expect } from "@playwright/test";

// -------------------------------------------------------
// ✏️ 確認したいページのパスをここに列挙してください
// -------------------------------------------------------
const MDC_PAGES = [
  "/docs/privacy-policy",// プライバシーポリシー
  "/docs/pr-member-guideline",// メンバー向け募集要項
  "/docs/code-of-conduct",// 行動規範
];

// -------------------------------------------------------
// ✏️ テスト対象のベースURLを指定します
//    通常は playwright.config.ts の baseURL が使われるため
//    そちらを設定していれば変更不要です
// -------------------------------------------------------
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

// スクリーンショット比較のオプション
const SCREENSHOT_OPTIONS = {
  // ピクセル単位のズレ許容値（フォントのアンチエイリアスなど微細な差異を無視）
  maxDiffPixels: 100,
};

// -------------------------------------------------------
// テスト本体
// -------------------------------------------------------
for (const pagePath of MDC_PAGES) {
  test(`[MDC] 見た目の変化なし: ${pagePath}`, async ({ page }) => {
    await page.goto(`${BASE_URL}${pagePath}`);

    // ページ内の画像・フォントの読み込みが完了するまで待機
    await page.waitForLoadState("networkidle");

    // ✏️ Lazy Loadが多いページではこれを追加すると確実
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500); // スクロール後の読み込みを少し待つ
    await page.evaluate(() => window.scrollTo(0, 0)); // 先頭に戻す

    // ページ全体のスクリーンショットを撮影してベースラインと比較
    await expect(page).toHaveScreenshot(
      // スナップショットのファイル名（ページパスをファイル名に変換）
      `${pagePath.replace(/\//g, "_").replace(/^_/, "")}.png`,
      {
        ...SCREENSHOT_OPTIONS,
        // ページ全体をキャプチャ（スクロール分も含む）
        fullPage: true,
      }
    );
  });
}