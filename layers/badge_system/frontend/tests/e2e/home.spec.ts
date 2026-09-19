import { expect, test } from "@playwright/test";

async function seed_twenty_one_designs(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await page.getByRole("button", { name: "戻る" }).click();

  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("vris_badge_project_storage");
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const database = request.result;
        const transaction = database.transaction(
          ["projects", "purchase_list"],
          "readwrite",
        );
        const projects = transaction.objectStore("projects");
        const purchase_list = transaction.objectStore("purchase_list");
        const timestamp = "2026-09-12T00:00:00.000Z";
        projects.clear();
        purchase_list.clear();

        for (let index = 1; index <= 21; index += 1) {
          const code = String(index).padStart(3, "0");
          const project_id = `project-${code}`;
          const thumbnail_data_url =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";
          projects.put({
            project_id,
            local_project_code: code,
            editor_state: {
              source_image_data_url: null,
              edited_image_data_url: thumbnail_data_url,
              thumbnail_data_url,
              stamps: [],
              drawing_paths: [],
              texts: [],
              frame_asset_id: null,
              layer_order: [],
              zoom: 1,
              rotation: 0,
            },
            thumbnail_data_url,
            share_image_data_url: null,
            created_at: timestamp,
            updated_at: timestamp,
            ordered: false,
          });
          if (index <= 20) {
            purchase_list.put({
              project_id,
              quantity: 1,
              added_at: timestamp,
              updated_at: timestamp,
            });
          }
        }

        transaction.oncomplete = () => {
          database.close();
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
      };
    });
  });

  await page.reload();
}

test("saved designs are the first smartphone page", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "作成したデザイン" }),
  ).toBeVisible();
  await expect(page.getByText("現在の設定")).toHaveCount(0);

  const horizontal_overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(horizontal_overflow).toBe(false);

  const vertical_overflow = await page.evaluate(
    () => document.documentElement.scrollHeight > window.innerHeight + 1,
  );
  expect(vertical_overflow).toBe(false);

  await page.screenshot({
    path: `../docs/screenshots/design_list_home_${test.info().project.name}.png`,
  });
});

test("visitor can create and keep a local design on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();
  await page.getByRole("button", { name: /購入リストに追加/ }).click();
  await expect(page.getByRole("status")).toHaveText(
    "001を購入リストに1個追加しました。",
  );
  await page.screenshot({
    path: `../docs/screenshots/purchase_feedback_${test.info().project.name}.png`,
  });
  await page.getByRole("button", { name: "戻る" }).click();
  await expect(
    page.getByRole("heading", { name: "作成したデザイン" }),
  ).toBeVisible();
  await page.getByRole("button", { exact: true, name: "購入リスト" }).click();

  await expect(
    page.getByRole("heading", { name: "購入予定の缶バッジ" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();

  const horizontal_overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(horizontal_overflow).toBe(false);

  const vertical_overflow = await page.evaluate(
    () => document.documentElement.scrollHeight > window.innerHeight + 1,
  );
  expect(vertical_overflow).toBe(false);
});

test("mobile editor exposes image tools without horizontal overflow", async ({
  page,
  browserName,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();

  await expect(page.getByRole("heading", { name: /^\d{3}$/ })).toBeVisible();
  await expect(page.getByLabel("缶バッジ編集プレビュー")).toBeVisible();
  await expect(
    page.getByText("点線までが缶バッジになります（直径58mm）"),
  ).toBeVisible();
  await expect(page.getByText("写真を選択する")).toBeVisible();
  await expect(page.getByText(/3D/)).toHaveCount(0);

  await page.getByRole("button", { name: "ペン" }).click();
  await expect(page.getByRole("button", { name: /消しゴム/ })).toBeVisible();

  const horizontal_overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(horizontal_overflow).toBe(false);

  const page_scroll_locked = await page.evaluate(() => {
    const root_style = window.getComputedStyle(document.documentElement);
    const body_style = window.getComputedStyle(document.body);
    return (
      root_style.overflowY === "hidden" && body_style.overflowY === "hidden"
    );
  });
  expect(page_scroll_locked).toBe(true);

  if (browserName === "chromium") {
    await page.screenshot({
      path: "tests/e2e/screenshots/mobile_editor_390.png",
    });
  }
});

test("visitor sees the quantity 10 limit without changing the purchase list", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await page.getByRole("button", { name: /購入リストに追加/ }).click();
  await page.getByRole("button", { name: "戻る" }).click();
  await page.getByRole("button", { exact: true, name: "購入リスト" }).click();

  const quantity = page.locator("output");
  for (
    let expected_quantity = 2;
    expected_quantity <= 10;
    expected_quantity += 1
  ) {
    await page.getByLabel("数量を増やす").click();
    await expect(quantity).toHaveText(String(expected_quantity));
  }

  await page.getByLabel("数量を増やす").click();
  await expect(
    page.getByText(
      "1デザインの数量は最大10個です。10個以下にして注文してください。",
    ),
  ).toBeVisible();
  await expect(quantity).toHaveText("10");
});

test("visitor cannot add a 21st design to the purchase list", async ({
  page,
}) => {
  await seed_twenty_one_designs(page);
  const extra_design = page.locator("article").filter({
    has: page.getByRole("heading", {
      exact: true,
      name: "021",
    }),
  });
  await extra_design.getByRole("button", { name: /購入リストに追加/ }).click();
  await expect(
    page.getByText(
      "購入リストは最大20種類までです。別のデザインを追加するには、購入リストから不要なデザインを外してください。",
    ),
  ).toBeVisible();

  await page.getByRole("button", { exact: true, name: "購入リスト" }).click();
  await expect(page.locator("article")).toHaveCount(20);
});

test("visitor sees numeric identifiers without names or management labels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /新しいデザインを作る/ }).click();
  await page.getByRole("button", { name: "戻る" }).click();

  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("vris_badge_project_storage");
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const database = request.result;
        const transaction = database.transaction("projects", "readwrite");
        const projects = transaction.objectStore("projects");
        const get_request = projects.index("by-local-code").get("001");
        get_request.onerror = () => reject(get_request.error);
        get_request.onsuccess = () => {
          const legacy_project = get_request.result;
          legacy_project.design_name = "デザイン 001";
          projects.put(legacy_project);
        };
        transaction.oncomplete = () => {
          database.close();
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
      };
    });
  });

  await page.reload();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();
  await expect(page.getByText(/管理コード/)).toHaveCount(0);
  await expect(page.getByText(/デザイン 001/)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "名前を変更" })).toHaveCount(0);

  const design = page.locator("article").filter({
    has: page.getByRole("heading", { name: "001" }),
  });
  await design.getByRole("button", { name: "編集" }).click();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();

  await page.getByRole("button", { name: "戻る" }).click();
  await design.getByRole("button", { name: /購入リストに追加/ }).click();
  await page.getByRole("button", { exact: true, name: "購入リスト" }).click();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();
  await expect(page.getByText(/管理コード/)).toHaveCount(0);
  await page.getByRole("button", { name: /購入用QRを作成する/ }).click();
  await expect(page.getByRole("heading", { name: "001" })).toBeVisible();

  const horizontal_overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(horizontal_overflow).toBe(false);
});
