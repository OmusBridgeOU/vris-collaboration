import { Minus, PenLine, Plus, QrCode, Trash2 } from "lucide-react";
import QRCode from "qrcode";
import { useState } from "react";
import type { OrderConfirmations } from "../../api/order_client";
import type { OrderBatchCreatedResponse } from "../../types/api_types";
import type { PurchaseListEntry } from "../projects/project_types";
import { design_limit_message, quantity_limit_message } from "./order_limits";

type PurchaseListViewProps = {
  entries: PurchaseListEntry[];
  max_items_per_batch: number;
  max_quantity_per_item: number;
  on_create_order: (
    confirmations: OrderConfirmations,
  ) => Promise<OrderBatchCreatedResponse>;
  on_limit_error: (message: string) => void;
  on_update_quantity: (project_id: string, quantity: number) => void;
  on_remove: (project_id: string) => void;
  on_edit_project: (project_id: string) => void;
  on_back_to_projects: () => void;
};

const numeric_project_code = (local_project_code: string) =>
  local_project_code.replace(/\D/g, "") || local_project_code;

export function PurchaseListView({
  entries,
  max_items_per_batch,
  max_quantity_per_item,
  on_create_order,
  on_limit_error,
  on_update_quantity,
  on_remove,
  on_edit_project,
  on_back_to_projects,
}: PurchaseListViewProps) {
  const [phase, set_phase] = useState<"list" | "confirm" | "complete">("list");
  const [confirmations, set_confirmations] = useState<OrderConfirmations>({
    ownership_confirmed: false,
    portrait_confirmed: false,
    copyright_confirmed: false,
  });
  const [is_submitting, set_is_submitting] = useState(false);
  const [error_message, set_error_message] = useState<string | null>(null);
  const [created_order, set_created_order] =
    useState<OrderBatchCreatedResponse | null>(null);
  const [created_order_entries, set_created_order_entries] = useState<
    PurchaseListEntry[]
  >([]);
  const [qr_data_url, set_qr_data_url] = useState<string | null>(null);
  const total_quantity = entries.reduce(
    (total, entry) => total + entry.quantity,
    0,
  );
  const can_confirm =
    confirmations.ownership_confirmed &&
    confirmations.portrait_confirmed &&
    confirmations.copyright_confirmed;

  async function submit_order() {
    set_is_submitting(true);
    set_error_message(null);

    try {
      const order = await on_create_order(confirmations);
      set_created_order(order);
      set_created_order_entries(entries);
      try {
        set_qr_data_url(
          await QRCode.toDataURL(order.receptionNumber, {
            errorCorrectionLevel: "M",
            margin: 2,
            width: 320,
          }),
        );
      } catch {
        set_qr_data_url(null);
      }
      set_phase("complete");
    } catch (error) {
      set_error_message(
        error instanceof Error ? error.message : "注文を作成できませんでした",
      );
    } finally {
      set_is_submitting(false);
    }
  }

  if (phase === "complete" && created_order) {
    return (
      <section className="grid gap-4">
        <div>
          <p className="text-sm font-medium text-accent">注文QR</p>
          <h2 className="text-xl font-bold">{created_order.receptionNumber}</h2>
        </div>
        <div className="grid justify-items-center gap-3 rounded-md border border-slate-200 bg-white p-4">
          {qr_data_url ? (
            <img
              alt={`${created_order.receptionNumber}の注文QR`}
              className="h-72 w-72 max-w-full"
              src={qr_data_url}
            />
          ) : (
            <p className="rounded-md bg-amber-50 p-3 text-sm leading-6 text-amber-900">
              QR画像を作成できませんでした。下の受付番号をスタッフへ提示してください。
            </p>
          )}
          <p className="text-center text-3xl font-bold tracking-[0.2em] text-slate-900">
            {created_order.receptionNumber}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-2 rounded-md border border-slate-200 bg-white p-4 text-sm">
          <dt className="text-slate-600">受付番号</dt>
          <dd className="text-right font-bold">
            {created_order.receptionNumber}
          </dd>
          <dt className="text-slate-600">デザイン種類数</dt>
          <dd className="text-right font-bold">
            {created_order.totalItemTypes}
          </dd>
          <dt className="text-slate-600">合計数量</dt>
          <dd className="text-right font-bold">
            {created_order.totalQuantity}
          </dd>
        </dl>
        <OrderDesignList entries={created_order_entries} />
        <button
          className="min-h-12 rounded-md border border-slate-300 bg-white px-3 font-semibold"
          onClick={on_back_to_projects}
          type="button"
        >
          デザイン一覧へ戻る
        </button>
      </section>
    );
  }

  if (phase === "confirm") {
    return (
      <section className="grid gap-4">
        <div>
          <p className="text-sm font-medium text-accent">注文確認</p>
          <h2 className="text-xl font-bold">購入用QRを作成</h2>
        </div>
        <dl className="grid grid-cols-2 gap-2 rounded-md border border-slate-200 bg-white p-4 text-sm">
          <dt className="text-slate-600">デザイン種類数</dt>
          <dd className="text-right font-bold">{entries.length}</dd>
          <dt className="text-slate-600">合計数量</dt>
          <dd className="text-right font-bold">{total_quantity}</dd>
        </dl>
        <OrderDesignList entries={entries} />
        <div className="grid gap-2 rounded-md border border-slate-200 bg-white p-4">
          <ConfirmationCheckbox
            checked={confirmations.ownership_confirmed}
            label="使用する画像の利用権を確認しました"
            on_change={(checked) =>
              set_confirmations((current) => ({
                ...current,
                ownership_confirmed: checked,
              }))
            }
          />
          <ConfirmationCheckbox
            checked={confirmations.portrait_confirmed}
            label="人物が写る場合の肖像権を確認しました"
            on_change={(checked) =>
              set_confirmations((current) => ({
                ...current,
                portrait_confirmed: checked,
              }))
            }
          />
          <ConfirmationCheckbox
            checked={confirmations.copyright_confirmed}
            label="著作権を侵害しない画像であることを確認しました"
            on_change={(checked) =>
              set_confirmations((current) => ({
                ...current,
                copyright_confirmed: checked,
              }))
            }
          />
        </div>
        {error_message ? (
          <p className="rounded-md bg-red-50 p-3 text-sm leading-6 text-red-800">
            {error_message}
          </p>
        ) : null}
        <div className="grid gap-2">
          <button
            className="min-h-12 rounded-md border border-slate-300 bg-white px-3 font-semibold"
            disabled={is_submitting}
            onClick={() => set_phase("list")}
            type="button"
          >
            購入リストへ戻る
          </button>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-action px-3 font-semibold text-white disabled:bg-slate-400"
            disabled={!can_confirm || is_submitting || entries.length === 0}
            onClick={() => void submit_order()}
            type="button"
          >
            <QrCode aria-hidden="true" size={18} />
            {is_submitting ? "注文を作成中..." : "注文を確定してQRを作成"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <div>
        <p className="text-sm font-medium text-accent">購入リスト</p>
        <h2 className="text-xl font-bold">購入予定の缶バッジ</h2>
      </div>

      {entries.length >= max_items_per_batch ? (
        <p className="rounded-md bg-amber-50 p-3 text-sm leading-6 text-amber-900">
          {design_limit_message(max_items_per_batch)}
        </p>
      ) : null}

      {entries.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-sm leading-6 text-slate-700">
          購入リストは空です。デザイン一覧から 001
          などのデザインを追加してください。
        </p>
      ) : (
        <div className="grid gap-3">
          {entries.map((entry) => (
            <article
              className="rounded-md border border-slate-200 bg-white p-3"
              key={entry.project_id}
            >
              <div className="flex gap-3">
                <img
                  alt={`${numeric_project_code(entry.project.local_project_code)}のサムネイル`}
                  className="h-20 w-20 shrink-0 rounded-md border border-slate-200 object-cover"
                  src={entry.project.thumbnail_data_url}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold">
                    {numeric_project_code(entry.project.local_project_code)}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-semibold">数量</span>
                    <button
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-300"
                      disabled={entry.quantity <= 1}
                      onClick={() =>
                        on_update_quantity(entry.project_id, entry.quantity - 1)
                      }
                      type="button"
                    >
                      <Minus aria-label="数量を減らす" size={18} />
                    </button>
                    <output className="min-w-8 text-center text-lg font-bold">
                      {entry.quantity}
                    </output>
                    <button
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-300"
                      onClick={() => {
                        if (entry.quantity >= max_quantity_per_item) {
                          on_limit_error(
                            quantity_limit_message(max_quantity_per_item),
                          );
                          return;
                        }
                        on_update_quantity(
                          entry.project_id,
                          entry.quantity + 1,
                        );
                      }}
                      type="button"
                    >
                      <Plus aria-label="数量を増やす" size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-semibold"
                  onClick={() => on_edit_project(entry.project_id)}
                  type="button"
                >
                  <PenLine aria-hidden="true" size={17} />
                  編集
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-red-200 px-3 text-sm font-semibold text-red-700"
                  onClick={() => on_remove(entry.project_id)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={17} />
                  一覧から外す
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <dl className="grid grid-cols-2 gap-2 rounded-md border border-slate-200 bg-white p-4 text-sm">
        <dt className="text-slate-600">デザイン種類数</dt>
        <dd className="text-right font-bold">{entries.length}</dd>
        <dt className="text-slate-600">合計数量</dt>
        <dd className="text-right font-bold">{total_quantity}</dd>
      </dl>

      <div className="grid gap-2">
        <button
          className="min-h-12 rounded-md border border-slate-300 bg-white px-3 font-semibold"
          onClick={on_back_to_projects}
          type="button"
        >
          デザイン一覧へ戻る
        </button>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-action px-3 font-semibold text-white disabled:bg-slate-400"
          disabled={entries.length === 0}
          onClick={() => set_phase("confirm")}
          type="button"
        >
          <QrCode aria-hidden="true" size={18} />
          購入用QRを作成する
        </button>
      </div>
    </section>
  );
}

function OrderDesignList({ entries }: { entries: PurchaseListEntry[] }) {
  return (
    <div aria-label="購入対象デザイン" className="grid gap-2">
      {entries.map((entry) => (
        <article
          className="flex gap-3 rounded-md border border-slate-200 bg-white p-3"
          key={entry.project_id}
        >
          <img
            alt={`${numeric_project_code(entry.project.local_project_code)}のサムネイル`}
            className="h-16 w-16 shrink-0 rounded-md border border-slate-200 object-cover"
            src={entry.project.thumbnail_data_url}
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-bold">
              {numeric_project_code(entry.project.local_project_code)}
            </h3>
            <p className="mt-1 text-sm font-semibold">数量 {entry.quantity}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ConfirmationCheckbox({
  checked,
  label,
  on_change,
}: {
  checked: boolean;
  label: string;
  on_change: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-md border border-slate-200 px-3 text-sm font-semibold">
      <input
        checked={checked}
        className="h-5 w-5 accent-action"
        onChange={(event) => on_change(event.target.checked)}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}
