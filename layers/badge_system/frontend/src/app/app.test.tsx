import "@testing-library/jest-dom/vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { App } from "./app";
import { create_order_batch } from "../api/order_client";
import { ProjectStorageProvider } from "../features/projects/project_storage_context";
import { create_memory_project_storage } from "../indexed_db/memory_project_storage";

vi.mock("../api/order_client", async (import_original) => {
  const actual = await import_original<typeof import("../api/order_client")>();
  return { ...actual, create_order_batch: vi.fn(actual.create_order_batch) };
});

const render_app = async (
  prepare_storage?: (
    storage: ReturnType<typeof create_memory_project_storage>,
  ) => Promise<void>,
) => {
  const storage = create_memory_project_storage();
  await prepare_storage?.(storage);

  render(
    <ProjectStorageProvider storage={storage}>
      <App />
    </ProjectStorageProvider>,
  );

  await act(async () => {
    await Promise.resolve();
  });

  return storage;
};

describe("App", () => {
  it("opens on the saved design list with credits temporarily hidden", async () => {
    await render_app();

    expect(
      screen.getByRole("heading", { name: "作成したデザイン" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /新しいデザインを作る/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /購入リスト/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /過去の購入/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "クレジット" }),
    ).not.toBeInTheDocument();
    const header_buttons = screen
      .getByRole("heading", { name: "作成したデザイン" })
      .parentElement?.nextElementSibling?.querySelectorAll("button");
    expect(
      Array.from(header_buttons ?? [], (button) => button.textContent),
    ).toEqual(["購入リスト", "新規"]);
    expect(screen.queryByText("現在の設定")).not.toBeInTheDocument();
  });

  it("keeps the current purchase list after a successful order", async () => {
    vi.mocked(create_order_batch).mockResolvedValueOnce({
      receptionNumber: "48317",
      publicToken: "not-persisted",
      publicUrl: "https://example.invalid/not-persisted",
      status: "uploaded",
      totalItemTypes: 1,
      totalQuantity: 1,
      createdAt: "2026-09-13T01:02:03.000Z",
      expiresAt: null,
      items: [
        {
          itemCode: "48317-01",
          localProjectCode: "001",
          quantity: 1,
        },
      ],
    });
    const storage = await render_app(async (prepared_storage) => {
      const project = await prepared_storage.create_project();
      await prepared_storage.add_to_purchase_list(project.project_id, 20, 10);
    });

    fireEvent.click(screen.getByRole("button", { name: "購入リスト" }));
    fireEvent.click(
      await screen.findByRole("button", { name: "購入用QRを作成する" }),
    );
    for (const checkbox of screen.getAllByRole("checkbox")) {
      fireEvent.click(checkbox);
    }
    fireEvent.click(
      screen.getByRole("button", { name: "注文を確定してQRを作成" }),
    );

    expect(await screen.findByRole("heading", { name: "48317" })).toBeVisible();
    expect(create_order_batch).toHaveBeenCalledOnce();
    const entries = await storage.list_purchase_entries();
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ quantity: 1 });
    expect(entries[0].project.ordered).toBe(true);
  });

  it("keeps the existing list when a 21st design is added", async () => {
    let extra_project_id = "";
    const storage = await render_app(async (prepared_storage) => {
      for (let index = 0; index < 21; index += 1) {
        const project = await prepared_storage.create_project();
        if (index < 20) {
          await prepared_storage.add_to_purchase_list(
            project.project_id,
            20,
            10,
          );
        } else {
          extra_project_id = project.project_id;
        }
      }
    });

    const extra_project_heading = await screen.findByRole("heading", {
      name: "021",
    });
    const extra_project_card = extra_project_heading.closest("article");
    expect(extra_project_card).not.toBeNull();
    fireEvent.click(
      within(extra_project_card as HTMLElement).getByRole("button", {
        name: /購入リストに追加/,
      }),
    );

    expect(await screen.findByRole("status")).toHaveTextContent(
      "購入リストは最大20種類までです。別のデザインを追加するには、購入リストから不要なデザインを外してください。",
    );
    const entries = await storage.list_purchase_entries();
    expect(entries).toHaveLength(20);
    expect(entries.some((entry) => entry.project_id === extra_project_id)).toBe(
      false,
    );
  });

  it("keeps a design at quantity 10 and explains the limit", async () => {
    const storage = await render_app(async (prepared_storage) => {
      const project = await prepared_storage.create_project();
      await prepared_storage.add_to_purchase_list(project.project_id, 20, 10);
      await prepared_storage.update_purchase_quantity(
        project.project_id,
        10,
        10,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "購入リスト" }));
    await screen.findByRole("heading", { name: "購入予定の缶バッジ" });
    fireEvent.click(screen.getByLabelText("数量を増やす"));

    expect(
      await screen.findByText(
        "1デザインの数量は最大10個です。10個以下にして注文してください。",
      ),
    ).toBeVisible();
    expect((await storage.list_purchase_entries())[0].quantity).toBe(10);
  });

  it("creates a local project and adds it to the purchase list", async () => {
    await render_app();

    fireEvent.click(
      screen.getByRole("button", { name: /新しいデザインを作る/ }),
    );

    await screen.findByLabelText("缶バッジ編集プレビュー");
    expect(screen.getByRole("heading", { name: "001" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /購入リストに追加/ }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "001を購入リストに1個追加しました。",
    );
    fireEvent.click(screen.getByRole("button", { name: "戻る" }));
    fireEvent.click(screen.getByRole("button", { name: "購入リスト" }));

    expect(
      await screen.findByRole("heading", { name: "購入予定の缶バッジ" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "001" })).toBeInTheDocument();
    expect(screen.queryByText(/管理コード/)).not.toBeInTheDocument();
    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("duplicates a design from the project list", async () => {
    await render_app();

    fireEvent.click(
      screen.getByRole("button", { name: /新しいデザインを作る/ }),
    );
    await screen.findByLabelText("缶バッジ編集プレビュー");
    expect(screen.getByRole("heading", { name: "001" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "戻る" }));

    expect(
      await screen.findByRole("heading", { name: "001" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /複製/ }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "002" })).toBeInTheDocument();
    });
  });

  it("does not expose stored names, management labels, or rename controls", async () => {
    await render_app(async (prepared_storage) => {
      await prepared_storage.create_project({ design_name: "秋の記念" });
    });

    expect(await screen.findByRole("heading", { name: "001" })).toBeVisible();
    expect(screen.queryByText("秋の記念")).not.toBeInTheDocument();
    expect(screen.queryByText(/管理コード/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "名前を変更" }),
    ).not.toBeInTheDocument();
  });
});
