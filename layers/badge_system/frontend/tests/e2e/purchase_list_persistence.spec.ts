import { expect, test, type Page } from "@playwright/test";

const database_name = "vris_badge_project_storage";
const thumbnail =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%230f766e'/%3E%3C/svg%3E";

async function seed_version_2_database(page: Page) {
  await page.addInitScript(
    ({ database_name, thumbnail }) => {
      const request = indexedDB.open(database_name, 2);
      request.onupgradeneeded = () => {
        const database = request.result;
        const projects = database.createObjectStore("projects", {
          keyPath: "project_id",
        });
        projects.createIndex("by-local-code", "local_project_code", {
          unique: true,
        });
        projects.createIndex("by-updated-at", "updated_at");
        const purchase_list = database.createObjectStore("purchase_list", {
          keyPath: "project_id",
        });
        purchase_list.createIndex("by-updated-at", "updated_at");
        const purchase_history = database.createObjectStore(
          "purchase_history",
          { keyPath: "reception_number" },
        );
        purchase_history.createIndex("by-ordered-at", "ordered_at");
        const metadata = database.createObjectStore("metadata", {
          keyPath: "key",
        });
        const timestamp = "2026-09-13T00:00:00.000Z";

        projects.put({
          project_id: "project-001",
          local_project_code: "001",
          design_name: "デザイン 001",
          editor_state: {
            source_image_data_url: null,
            edited_image_data_url: thumbnail,
            thumbnail_data_url: thumbnail,
            stamps: [],
            drawing_paths: [],
            texts: [],
            frame_asset_id: null,
            layer_order: [],
            zoom: 1,
            rotation: 0,
          },
          thumbnail_data_url: thumbnail,
          share_image_data_url: null,
          created_at: timestamp,
          updated_at: timestamp,
          ordered: false,
        });
        purchase_list.put({
          project_id: "project-001",
          quantity: 2,
          added_at: timestamp,
          updated_at: timestamp,
        });
        purchase_history.put({
          reception_number: "40000",
          ordered_at: timestamp,
          total_quantity: 1,
          items: [],
        });
        metadata.put({ key: "next_project_number", value: 2 });
      };
      request.onsuccess = () => request.result.close();
    },
    { database_name, thumbnail },
  );
}

async function mock_order_api(page: Page) {
  await page.route("**/api/config", (route) =>
    route.fulfill({
      json: {
        termsVersion: "1.1",
        maxUploadBytesPerItem: 20_971_520,
        maxItemsPerBatch: 20,
        maxQuantityPerItem: 10,
        unitPriceYen: 500,
        canvasSizePx: 1200,
        finishDiameterRatio: 0.92,
        safeAreaRatio: 0.7,
        xShareText: "オリジナル缶バッジを作りました！",
        xHashtags: ["オリジナル缶バッジ"],
      },
    }),
  );
  await page.route("**/api/order-batches", (route) =>
    route.fulfill({
      json: {
        receptionNumber: "48317",
        publicToken: "compatibility-token",
        publicUrl: "https://example.invalid/orders/compatibility-token",
        status: "uploaded",
        totalItemTypes: 1,
        totalQuantity: 2,
        createdAt: "2026-09-13T01:02:03.000Z",
        expiresAt: null,
        items: [
          {
            itemCode: "48317-01",
            localProjectCode: "001",
            quantity: 2,
          },
        ],
      },
    }),
  );
}

async function submit_order(page: Page) {
  await page.getByRole("button", { name: "購入用QRを作成する" }).click();
  for (const confirmation of await page.getByRole("checkbox").all()) {
    await confirmation.check();
  }
  await page.getByRole("button", { name: "注文を確定してQRを作成" }).click();
  await expect(page.getByText("48317", { exact: true }).first()).toBeVisible();
}

test("removes legacy history and keeps the purchase list after ordering", async ({
  page,
}) => {
  await seed_version_2_database(page);
  await mock_order_api(page);
  await page.goto("/");

  await expect(page.getByRole("button", { name: /過去の購入/ })).toHaveCount(0);
  await page.getByRole("button", { name: /^購入リスト/ }).click();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();
  await expect(page.locator("output")).toHaveText("2");

  const upgraded_database = await page.evaluate(async (name) => {
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(name);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
    const transaction = database.transaction(
      ["projects", "purchase_list"],
      "readonly",
    );
    const project_count = await new Promise<number>((resolve, reject) => {
      const request = transaction.objectStore("projects").count();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
    const purchase_list_count = await new Promise<number>((resolve, reject) => {
      const request = transaction.objectStore("purchase_list").count();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
    const result = {
      version: database.version,
      stores: Array.from(database.objectStoreNames),
      project_count,
      purchase_list_count,
    };
    database.close();
    return result;
  }, database_name);
  expect(upgraded_database).toMatchObject({
    version: 3,
    project_count: 1,
    purchase_list_count: 1,
  });
  expect(upgraded_database.stores).not.toContain("purchase_history");

  await submit_order(page);
  await page.getByRole("button", { name: "デザイン一覧へ戻る" }).click();
  await page.getByRole("button", { name: "購入リスト", exact: true }).click();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();
  await expect(page.locator("output")).toHaveText("2");

  await page.reload();
  await page.getByRole("button", { name: /^購入リスト/ }).click();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();
  await expect(page.locator("output")).toHaveText("2");
});
