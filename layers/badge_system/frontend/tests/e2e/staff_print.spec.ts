import { expect, test } from "@playwright/test";
import { staff_order_fixture as order } from "../../src/test/staff_order_fixture";

test("staff confirms an ID and prints isolated postcard pages on mobile", async ({
  page,
  browserName,
}) => {
  const writes: string[] = [];
  const image_buffers: Buffer[] = [];
  let lookup_order = order;
  let lookup_requests = 0;
  page.on("request", (request) => {
    if (request.method() !== "GET") writes.push(request.url());
  });
  await page.route("**/api/auth/me", (route) =>
    route.fulfill({
      json: {
        id: "staff",
        displayName: "共有スタッフ",
        roles: ["reception"],
        authMode: "shared_basic",
      },
    }),
  );
  await page.route(
    "**/api/staff/order-batches/by-reception-number/*",
    (route) => {
      lookup_requests += 1;
      if (route.request().url().endsWith("/48317"))
        return route.fulfill({
          json: { ...lookup_order, expiresAt: null },
        });
      return route.fulfill({
        status: 404,
        json: { error: { message: "注文が見つかりません" } },
      });
    },
  );
  await page.route("**/api/staff/order-items/*/print-image", (route) =>
    route.fulfill({
      contentType: "image/png",
      body: route.request().url().includes(order.items[0].id)
        ? image_buffers[0]
        : image_buffers[1],
    }),
  );
  await page.addInitScript(() => {
    Object.assign(window, { print_calls: 0 });
    window.print = () => {
      Object.assign(window, {
        print_calls:
          (window as unknown as { print_calls: number }).print_calls + 1,
      });
    };
  });
  await page.goto("/staff");
  const pictures = await page.evaluate(() =>
    ["A", "B"].map((label, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 400;
      const context = canvas.getContext("2d")!;
      context.fillStyle = "white";
      context.fillRect(0, 0, 400, 400);
      context.fillStyle = index ? "#c45672" : "#168b86";
      context.beginPath();
      context.arc(200, 200, 190, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "white";
      context.font = "bold 160px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, 200, 205);
      return canvas.toDataURL("image/png").split(",")[1];
    }),
  );
  image_buffers.push(
    ...pictures.map((picture) => Buffer.from(picture, "base64")),
  );
  await page
    .getByLabel("受付番号（5桁）")
    .fill("https://badge.example/o/48317");
  await page.getByRole("button", { name: "注文検索" }).click();
  await expect(page.getByRole("alert")).toContainText("5桁数字");
  expect(lookup_requests).toBe(0);
  await page.getByLabel("受付番号（5桁）").fill("48317");
  await page.getByRole("button", { name: "注文検索" }).click();
  await expect(
    page.getByRole("button", { name: "印刷", exact: true }),
  ).toBeEnabled();
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await expect(page.locator(".postcard_page")).toHaveCount(3);
  await expect(page.locator(".postcard_page img")).toHaveCount(6);
  await expect(page.getByText("1,500円", { exact: true })).toBeVisible();
  await expect(page.getByText("3個", { exact: true })).toBeVisible();
  const gallery = page.getByRole("list", { name: "注文画像一覧" });
  await expect(gallery.getByRole("img")).toHaveCount(3);
  await expect(page.getByAltText("48317-01 1枚目")).toBeVisible();
  await expect(page.getByAltText("48317-02 1枚目")).toBeVisible();
  await expect(page.getByAltText("48317-02 2枚目")).toBeVisible();
  await expect(page.getByText("受付番号", { exact: true })).toHaveCount(0);
  await expect(page.getByText("注文内容の確認")).toHaveCount(0);
  await expect(page.getByText("完成画像を拡大")).toHaveCount(0);
  await expect(page.locator("details")).toHaveCount(0);
  await expect(
    page.getByText(/確認してください|画像領域|注文数量とは別/),
  ).toHaveCount(0);
  for (const width of [320, 375, 430]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const targets = await page
      .getByRole("button", { name: /の注文を取りやめ/ })
      .evaluateAll((buttons) =>
        buttons.map((button) => {
          const box = button.getBoundingClientRect();
          return box.width >= 44 && box.height >= 44;
        }),
      );
    expect(targets.every(Boolean)).toBe(true);
    await page.screenshot({
      path: `../docs/screenshots/staff_design_grid_${browserName}_${width}.png`,
      fullPage: true,
    });
  }
  await expect(page.getByRole("combobox")).toHaveCount(0);
  await page.getByRole("button", { name: "印刷", exact: true }).click();
  expect(
    await page.evaluate(
      () => (window as unknown as { print_calls: number }).print_calls,
    ),
  ).toBe(1);
  await expect(
    page.getByRole("button", { name: /48317-01 の注文を取りやめ/ }),
  ).toBeDisabled();
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await expect(
    page.getByRole("button", { name: "印刷", exact: true }),
  ).toBeEnabled();
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("#root")).toBeHidden();
  const boxes = await page.locator(".postcard_page").evaluateAll((pages) =>
    pages.map((page) => {
      const box = page.getBoundingClientRect();
      const images = Array.from(page.querySelectorAll("img"), (image) => {
        const rect = image.getBoundingClientRect();
        return {
          src: image.src,
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
        };
      });
      return { width: box.width, height: box.height, images };
    }),
  );
  for (const box of boxes) {
    expect(box.width).toBeCloseTo((100 * 96) / 25.4, 0);
    expect(box.height).toBeCloseTo((148 * 96) / 25.4, 0);
    expect(new Set(box.images.map((image) => image.src)).size).toBe(1);
    expect(box.images[0].bottom).toBeLessThan(box.images[1].top);
    expect(box.images).toHaveLength(2);
  }
  const printed_badges = await page
    .locator(".postcard_badge")
    .evaluateAll((badges) =>
      badges.map((badge) => {
        const badge_box = badge.getBoundingClientRect();
        const mark = badge.querySelector(
          ".postcard_alignment_mark",
        ) as HTMLElement;
        const mark_box = mark.getBoundingClientRect();
        return {
          width: badge_box.width,
          height: badge_box.height,
          angle: mark.dataset.angleDegrees,
          mark_width: mark_box.width,
          mark_height: mark_box.height,
          mark_background: getComputedStyle(mark).backgroundColor,
          dot_width: Number.parseFloat(getComputedStyle(mark, "::after").width),
          dot_height: Number.parseFloat(
            getComputedStyle(mark, "::after").height,
          ),
          dot_background: getComputedStyle(mark, "::after").backgroundColor,
          mark_center_x: mark_box.left + mark_box.width / 2 - badge_box.left,
          mark_center_y: mark_box.top + mark_box.height / 2 - badge_box.top,
        };
      }),
    );
  expect(printed_badges).toHaveLength(6);
  for (const badge of printed_badges) {
    expect(badge.width).toBeCloseTo((70 * 96) / 25.4, 0);
    expect(badge.height).toBeCloseTo((70 * 96) / 25.4, 0);
    expect(badge.angle).toBe("-17");
    expect(badge.mark_width).toBeCloseTo((3 * 96) / 25.4, 1);
    expect(badge.mark_height).toBeCloseTo((3 * 96) / 25.4, 1);
    expect(badge.mark_background).toBe("rgb(255, 255, 255)");
    expect(badge.dot_width).toBeCloseTo((1.2 * 96) / 25.4, 1);
    expect(badge.dot_height).toBeCloseTo((1.2 * 96) / 25.4, 1);
    expect(badge.dot_background).toBe("rgb(0, 0, 0)");
    expect(badge.mark_center_x / badge.width).toBeCloseTo(
      0.5 + Math.sin((-17 * Math.PI) / 180) * 0.5,
      2,
    );
    expect(badge.mark_center_y / badge.height).toBeCloseTo(
      0.5 - Math.cos((-17 * Math.PI) / 180) * 0.5,
      2,
    );
  }
  expect(boxes[0].images[0].src).not.toBe(boxes[1].images[0].src);
  expect(boxes[1].images[0].src).toBe(boxes[2].images[0].src);
  if (browserName === "chromium") {
    await page.pdf({
      path: "../.wrangler/staff_postcards_two.pdf",
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
    });
  }
  await page.emulateMedia({ media: "screen" });
  // Removing either visible copy subtracts one badge from that design.
  await page
    .getByRole("button", { name: /48317-02 の注文を取りやめ/ })
    .nth(1)
    .click();
  await expect(gallery.getByRole("img")).toHaveCount(2);
  await expect(page.getByAltText("48317-02 1枚目")).toBeVisible();
  await expect(page.getByAltText("48317-02 2枚目")).toHaveCount(0);
  await expect(page.getByText("2個", { exact: true })).toBeVisible();
  await expect(page.getByText("1,000円", { exact: true })).toBeVisible();
  await expect(page.locator(".postcard_page")).toHaveCount(2);
  await expect(page.locator(".postcard_page img")).toHaveCount(4);
  await page.screenshot({
    path: `../docs/screenshots/staff_design_removed_${browserName}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: /48317-01 の注文を取りやめ/ }).click();
  await expect(page.getByText("1個", { exact: true })).toBeVisible();
  await expect(page.getByText("500円", { exact: true })).toBeVisible();
  await expect(page.locator(".postcard_page")).toHaveCount(1);
  await page.getByRole("button", { name: /48317-02 の注文を取りやめ/ }).click();
  await expect(page.getByText("0個", { exact: true })).toBeVisible();
  await expect(page.getByText("0円", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "印刷", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".postcard_pages")).toHaveCount(0);
  await page.getByRole("button", { name: "取りやめを戻す" }).click();
  await expect(page.getByText("1個", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "印刷", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "注文検索" }).click();
  await expect(gallery.getByRole("img")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "取りやめを戻す" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: /48317-01 の注文を取りやめ/ }).click();
  await page.reload();
  await page.getByLabel("受付番号（5桁）").fill("48317");
  await page.getByRole("button", { name: "注文検索" }).click();
  await expect(gallery.getByRole("img")).toHaveCount(3);
  // Long grids keep totals and the final row reachable on small screens.
  lookup_order = {
    ...order,
    items: order.items.map((item) => ({ ...item, quantity: 10 })),
    totalQuantity: 20,
    totalPriceYen: 10000,
  };
  await page.getByRole("button", { name: "注文検索" }).click();
  await expect(gallery.getByRole("img")).toHaveCount(20);
  for (const width of [320, 375, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await expect(page.getByText("20個", { exact: true })).toBeInViewport();
    await expect(page.getByText("10,000円", { exact: true })).toBeInViewport();
    const layout = await page.evaluate(() => {
      const footer = document.querySelector("footer")!.getBoundingClientRect();
      const rows = document.querySelectorAll(
        'ul[aria-label="注文画像一覧"] li',
      );
      const last = rows[rows.length - 1].getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        last_bottom: last.bottom,
        footer_top: footer.top,
      };
    });
    expect(layout.overflow).toBe(false);
    expect(layout.last_bottom).toBeLessThanOrEqual(layout.footer_top);
  }
  await page
    .getByRole("button", { name: /48317-01 の注文を取りやめ/ })
    .first()
    .click();
  await expect(gallery.getByRole("img")).toHaveCount(19);
  await expect(page.getByText("19個", { exact: true })).toBeVisible();
  await expect(page.getByText("9,500円", { exact: true })).toBeVisible();
  await expect(page.locator(".postcard_page")).toHaveCount(19);
  await page.getByRole("button", { name: "取りやめを戻す" }).click();
  await expect(gallery.getByRole("img")).toHaveCount(20);
  await page.getByLabel("受付番号（5桁）").fill("58318");
  await page.getByRole("button", { name: "注文検索" }).click();
  await expect(page.getByRole("alert")).toHaveText("注文が見つかりません");
  await expect(page.locator(".postcard_pages")).toHaveCount(0);
  expect(writes).toEqual([]);
});

test("camera denial retains manual order lookup", async ({ page }) => {
  await page.route("**/api/auth/me", (route) =>
    route.fulfill({
      json: {
        displayName: "スタッフ",
        roles: ["reception"],
        authMode: "shared_basic",
      },
    }),
  );
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: async () => {
          throw new DOMException("denied", "NotAllowedError");
        },
      },
      configurable: true,
    });
  });
  await page.goto("/staff");
  await page.getByRole("button", { name: "カメラでQRを読む" }).click();
  await expect(page.getByRole("status")).toContainText("受付番号を入力");
  await page.getByRole("button", { name: "カメラを閉じる" }).click();
  await expect(page.getByLabel("受付番号（5桁）")).toBeEnabled();
  await expect(page.locator("video")).toHaveCount(0);
});
