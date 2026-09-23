import { useCallback, useEffect, useState } from "react";
import { fetch_public_config } from "../api/config_client";
import {
  create_order_batch,
  type OrderConfirmations,
} from "../api/order_client";
import { BadgeEditor } from "../features/editor/badge_editor";
import { HelpView } from "../features/help/help_view";
import { OrderHistoryView } from "../features/order_history/order_history_view";
import { ProjectList } from "../features/projects/project_list";
import type {
  LocalBadgeProject,
  OrderHistoryEntry,
  PurchaseListEntry,
} from "../features/projects/project_types";
import { useProjectStorage } from "../features/projects/use_project_storage";
import { PurchaseListView } from "../features/purchase_list/purchase_list_view";
import { CreditsView } from "../features/credits/credits_view";
import {
  design_limit_message,
  order_limit_error,
  quantity_limit_message,
} from "../features/purchase_list/order_limits";
import { StaffApp } from "../features/staff/staff_app";
import { XSharePanel } from "../features/x_share/x_share_panel";
import {
  create_project_share_image,
  create_share_file_name,
  save_image_to_device,
} from "../features/x_share/x_share_service";
import type { PublicConfig } from "../types/api_types";
import { CopyrightNotice } from "./copyright_notice";

const fallback_config: PublicConfig = {
  termsVersion: "1.1",
  maxUploadBytesPerItem: 20_971_520,
  maxItemsPerBatch: 20,
  maxQuantityPerItem: 10,
  unitPriceYen: 500,
  canvasSizePx: 1200,
  finishDiameterRatio: 58 / 70,
  safeAreaRatio: 0.7,
  xShareText: "オリジナル缶バッジを作りました！",
  xHashtags: ["オリジナル缶バッジ"],
};

type AppView =
  | "projects"
  | "editor"
  | "purchase_list"
  | "order_history"
  | "help"
  | "credits"
  | "x_share";

export function App() {
  const storage = useProjectStorage();
  const [config, set_config] = useState<PublicConfig>(fallback_config);
  const is_staff_path = window.location.pathname.startsWith("/staff");
  const [view, set_view] = useState<AppView>("projects");
  const [projects, set_projects] = useState<LocalBadgeProject[]>([]);
  const [purchase_entries, set_purchase_entries] = useState<
    PurchaseListEntry[]
  >([]);
  const [order_history, set_order_history] = useState<OrderHistoryEntry[]>([]);
  const [selected_project_id, set_selected_project_id] = useState<
    string | null
  >(null);
  const [notice, set_notice] = useState<string | null>(null);
  const [share_image_saved_project_id, set_share_image_saved_project_id] =
    useState<string | null>(null);
  const [share_error, set_share_error] = useState<string | null>(null);

  const navigate_to_view = useCallback((next_view: AppView) => {
    set_notice(null);
    set_share_error(null);
    set_view(next_view);
  }, []);

  useEffect(() => {
    if (is_staff_path) {
      return;
    }
    void fetch_public_config()
      .then(set_config)
      .catch(() => set_config(fallback_config));
  }, [is_staff_path]);

  const refresh_local_state = useCallback(async () => {
    const [stored_projects, stored_purchase_entries, stored_order_history] =
      await Promise.all([
        storage.list_projects(),
        storage.list_purchase_entries(),
        storage.list_order_history(),
      ]);

    set_projects(stored_projects);
    set_purchase_entries(stored_purchase_entries);
    set_order_history(stored_order_history);
  }, [storage]);

  useEffect(() => {
    if (is_staff_path) {
      return;
    }
    void refresh_local_state();
  }, [is_staff_path, refresh_local_state]);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timeout_id = window.setTimeout(() => set_notice(null), 4_000);
    return () => window.clearTimeout(timeout_id);
  }, [notice]);

  if (is_staff_path) {
    return <StaffApp />;
  }

  const selected_project =
    projects.find((project) => project.project_id === selected_project_id) ??
    null;
  const purchase_project_ids = new Set(
    purchase_entries.map((entry) => entry.project_id),
  );

  const create_project = async () => {
    const project = await storage.create_project();
    await refresh_local_state();
    set_selected_project_id(project.project_id);
    navigate_to_view("editor");
  };

  const duplicate_project = async (project_id: string) => {
    const project = await storage.duplicate_project(project_id);
    await refresh_local_state();
    set_notice(`${project.local_project_code} を複製しました。`);
  };

  const delete_project = async (project_id: string) => {
    const project = projects.find(
      (candidate) => candidate.project_id === project_id,
    );
    const confirmed = window.confirm(
      `${project?.local_project_code ?? "このデザイン"}を削除しますか？`,
    );

    if (!confirmed) {
      return;
    }

    await storage.delete_project(project_id);
    await refresh_local_state();
    set_notice("デザインを削除しました。");
  };

  const add_to_purchase_list = async (project_id: string) => {
    const existing_entry = purchase_entries.find(
      (entry) => entry.project_id === project_id,
    );
    if (!existing_entry && purchase_entries.length >= config.maxItemsPerBatch) {
      set_notice(design_limit_message(config.maxItemsPerBatch));
      return;
    }
    if (
      existing_entry &&
      existing_entry.quantity >= config.maxQuantityPerItem
    ) {
      set_notice(quantity_limit_message(config.maxQuantityPerItem));
      return;
    }

    const entry = await storage.add_to_purchase_list(
      project_id,
      config.maxItemsPerBatch,
      config.maxQuantityPerItem,
    );
    if (!entry) {
      set_notice(design_limit_message(config.maxItemsPerBatch));
      return;
    }

    await refresh_local_state();
    set_notice(
      `${entry.project.local_project_code}をカートに1個追加しました。`,
    );
  };

  const update_purchase_quantity = async (
    project_id: string,
    quantity: number,
  ) => {
    if (quantity > config.maxQuantityPerItem) {
      set_notice(quantity_limit_message(config.maxQuantityPerItem));
      return;
    }

    await storage.update_purchase_quantity(
      project_id,
      quantity,
      config.maxQuantityPerItem,
    );
    await refresh_local_state();
  };

  const remove_from_purchase_list = async (project_id: string) => {
    await storage.remove_from_purchase_list(project_id);
    await refresh_local_state();
  };

  const create_purchase_order = async (confirmations: OrderConfirmations) => {
    const current_entries = purchase_entries;
    const limit_error = order_limit_error(
      current_entries,
      config.maxItemsPerBatch,
      config.maxQuantityPerItem,
    );
    if (limit_error) {
      throw new Error(limit_error);
    }

    const order = await create_order_batch({
      entries: current_entries,
      config,
      confirmations,
    });

    let local_update_failed = false;

    try {
      await storage.save_order_history({
        order_id: order.publicToken,
        reception_number: order.receptionNumber,
        ordered_at: order.createdAt,
        total_quantity: order.totalQuantity,
        unit_price_yen: config.unitPriceYen,
        total_price_yen:
          config.unitPriceYen == null
            ? null
            : config.unitPriceYen * order.totalQuantity,
        items: current_entries.map((entry) => ({
          local_project_code: entry.project.local_project_code,
          thumbnail_data_url: entry.project.thumbnail_data_url,
          quantity: entry.quantity,
        })),
      });

      for (const entry of current_entries) {
        await storage.save_project({
          ...entry.project,
          editor_design: entry.project.editor_design
            ? { ...entry.project.editor_design, ordered: true }
            : entry.project.editor_design,
          ordered: true,
        });
      }

      await refresh_local_state();
    } catch {
      local_update_failed = true;
    }

    if (local_update_failed) {
      set_notice(
        `注文は作成されました。受付番号 ${order.receptionNumber} を控えてください。この端末のデザイン状態の更新に失敗しました。カートは保持されています。`,
      );
    }

    return order;
  };

  const save_share_image = async (project_id: string) => {
    const project = projects.find(
      (candidate) => candidate.project_id === project_id,
    );

    if (!project) {
      return;
    }

    try {
      const share_image = await create_project_share_image(project);
      const save_method = await save_image_to_device(
        share_image,
        create_share_file_name(project),
      );
      const saved_project = await storage.save_project({
        ...project,
        share_image_data_url: share_image,
      });
      await refresh_local_state();
      set_share_image_saved_project_id(saved_project.project_id);
      set_share_error(null);
      set_notice(
        save_method === "shared"
          ? "端末の共有メニューを開きました。画像の保存先に写真アプリを選択してください。"
          : "Xへ投稿する際は、保存した画像を投稿画面で添付してください。",
      );
    } catch {
      set_share_error("画像の保存に失敗しました。もう一度お試しください。");
    }
  };

  const open_editor = (project_id: string) => {
    set_selected_project_id(project_id);
    navigate_to_view("editor");
  };

  const open_x_share = (project_id: string) => {
    set_selected_project_id(project_id);
    navigate_to_view("x_share");
  };

  const render_content = () => {
    if (view === "projects") {
      return (
        <ProjectList
          on_add_to_purchase_list={add_to_purchase_list}
          on_create_project={create_project}
          on_delete_project={delete_project}
          on_duplicate_project={duplicate_project}
          on_edit_project={open_editor}
          on_open_x_share={open_x_share}
          on_open_purchase_list={() => navigate_to_view("purchase_list")}
          on_open_order_history={() => navigate_to_view("order_history")}
          on_open_help={() => navigate_to_view("help")}
          on_open_credits={() => navigate_to_view("credits")}
          on_save_image={save_share_image}
          projects={projects}
          purchase_project_ids={purchase_project_ids}
        />
      );
    }

    if (view === "purchase_list") {
      return (
        <PurchaseListView
          entries={purchase_entries}
          max_items_per_batch={config.maxItemsPerBatch}
          max_quantity_per_item={config.maxQuantityPerItem}
          unit_price_yen={config.unitPriceYen}
          on_back_to_projects={() => navigate_to_view("projects")}
          on_create_order={create_purchase_order}
          on_edit_project={open_editor}
          on_limit_error={set_notice}
          on_remove={remove_from_purchase_list}
          on_update_quantity={update_purchase_quantity}
        />
      );
    }

    if (view === "order_history") {
      return (
        <OrderHistoryView
          on_back={() => navigate_to_view("projects")}
          orders={order_history}
        />
      );
    }

    if (view === "help") {
      return <HelpView on_back={() => navigate_to_view("projects")} />;
    }

    if (view === "credits") {
      return <CreditsView on_back={() => navigate_to_view("projects")} />;
    }

    if (view === "editor" && selected_project) {
      return (
        <BadgeEditor
          config={config}
          on_add_to_purchase_list={add_to_purchase_list}
          on_back={() => {
            void refresh_local_state();
            navigate_to_view("projects");
          }}
          project={selected_project}
          storage={storage}
        />
      );
    }

    if (view === "x_share" && selected_project) {
      return (
        <XSharePanel
          config={config}
          error_message={share_error}
          image_saved={
            share_image_saved_project_id === selected_project.project_id ||
            Boolean(selected_project.share_image_data_url)
          }
          on_back={() => navigate_to_view("projects")}
          on_save_image={() => save_share_image(selected_project.project_id)}
          project={selected_project}
        />
      );
    }

    return null;
  };

  if (view === "editor" && selected_project) {
    return (
      <>
        {render_content()}
        <NoticePopup message={notice} />
      </>
    );
  }

  return (
    <main className="min-h-dvh bg-paper text-ink">
      <section className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
        {render_content()}

        <footer className="mt-auto pt-6">
          <CopyrightNotice />
        </footer>
      </section>

      <NoticePopup message={notice} />
    </main>
  );
}

function NoticePopup({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="fixed left-4 right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-50 mx-auto max-w-[398px] rounded-md border border-teal-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-teal-900 shadow-lg"
      role="status"
    >
      {message}
    </div>
  );
}
