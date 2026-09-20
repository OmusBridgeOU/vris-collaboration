import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QRCode from "qrcode";
import { PurchaseListView } from "./purchase_list_view";
import type { OrderBatchCreatedResponse } from "../../types/api_types";
import type { PurchaseListEntry } from "../projects/project_types";

vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi.fn(async () => "data:image/png;base64,qr-code"),
  },
}));

const entry: PurchaseListEntry = {
  project_id: "project-1",
  quantity: 2,
  added_at: "2026-06-22T10:00:00.000Z",
  updated_at: "2026-06-22T10:00:00.000Z",
  project: {
    project_id: "project-1",
    local_project_code: "001",
    design_name: "夏祭りの思い出",
    editor_state: {
      source_image_data_url: null,
      edited_image_data_url: "data:image/png;base64,preview",
      thumbnail_data_url: "data:image/png;base64,thumbnail",
      stamps: [],
      drawing_paths: [],
      texts: [],
      frame_asset_id: null,
      layer_order: [],
      zoom: 1,
      rotation: 0,
    },
    thumbnail_data_url: "data:image/png;base64,thumbnail",
    share_image_data_url: null,
    created_at: "2026-06-22T10:00:00.000Z",
    updated_at: "2026-06-22T10:00:00.000Z",
    ordered: false,
  },
};

const created_order: OrderBatchCreatedResponse = {
  receptionNumber: "48317",
  publicToken: "public-token",
  status: "UPLOADED",
  totalItemTypes: 1,
  totalQuantity: 2,
  createdAt: "2026-06-22T10:00:00+09:00",
  expiresAt: null,
  publicUrl: "/o/public-token",
  items: [
    {
      itemCode: "48317-01",
      localProjectCode: "001",
      quantity: 2,
    },
  ],
};

describe("PurchaseListView", () => {
  it("confirms rights and shows the created order QR", async () => {
    const on_create_order = vi.fn(async () => created_order);

    render(
      <PurchaseListView
        entries={[entry]}
        max_items_per_batch={20}
        max_quantity_per_item={10}
        unit_price_yen={500}
        on_back_to_projects={vi.fn()}
        on_create_order={on_create_order}
        on_edit_project={vi.fn()}
        on_limit_error={vi.fn()}
        on_remove={vi.fn()}
        on_update_quantity={vi.fn()}
      />,
    );

    expect(screen.getByText("合計金額（税込）")).toBeVisible();
    expect(screen.getByText("1,000円")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /QR/ }));

    expect(screen.getByRole("heading", { name: "001" })).toBeVisible();
    expect(screen.queryByText("夏祭りの思い出")).not.toBeInTheDocument();
    expect(screen.queryByText(/管理コード/)).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "注文を確定してQRを作成" }),
    ).toBeDisabled();

    fireEvent.click(
      screen.getByLabelText("使用する画像の利用権を確認しました"),
    );
    fireEvent.click(
      screen.getByLabelText("人物が写る場合の肖像権を確認しました"),
    );
    fireEvent.click(
      screen.getByLabelText("著作権を侵害しない画像であることを確認しました"),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "注文を確定してQRを作成" }),
    );

    await waitFor(() => {
      expect(on_create_order).toHaveBeenCalledWith({
        ownership_confirmed: true,
        portrait_confirmed: true,
        copyright_confirmed: true,
      });
    });
    await waitFor(() => {
      expect(screen.getAllByText("48317").length).toBeGreaterThan(0);
    });
    expect(screen.getByRole("heading", { name: "001" })).toBeVisible();
    expect(QRCode.toDataURL).toHaveBeenCalledWith(
      "48317",
      expect.objectContaining({ errorCorrectionLevel: "M" }),
    );
    expect(screen.getByAltText("48317の注文QR")).toHaveAttribute(
      "src",
      "data:image/png;base64,qr-code",
    );
    expect(screen.queryByText("/o/public-token")).toBeNull();
    expect(screen.queryByText("public-token")).toBeNull();
  });

  it("reports how to add another design when the purchase list is full", () => {
    render(
      <PurchaseListView
        entries={[entry]}
        max_items_per_batch={1}
        max_quantity_per_item={10}
        unit_price_yen={500}
        on_back_to_projects={vi.fn()}
        on_create_order={vi.fn()}
        on_edit_project={vi.fn()}
        on_limit_error={vi.fn()}
        on_remove={vi.fn()}
        on_update_quantity={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "購入リストは最大1種類までです。別のデザインを追加するには、購入リストから不要なデザインを外してください。",
      ),
    ).toBeVisible();
  });
});
