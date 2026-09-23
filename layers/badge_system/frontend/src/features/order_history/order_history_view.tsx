import { QrCode } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import type { OrderHistoryEntry } from "../projects/project_types";

type OrderHistoryViewProps = {
  orders: OrderHistoryEntry[];
  on_back: () => void;
};

const format_datetime = (value: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const numeric_project_code = (local_project_code: string) =>
  local_project_code.replace(/\D/g, "") || local_project_code;

export function OrderHistoryView({ orders, on_back }: OrderHistoryViewProps) {
  const [selected_order, set_selected_order] =
    useState<OrderHistoryEntry | null>(null);
  const [qr_data_url, set_qr_data_url] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!selected_order) {
      set_qr_data_url(null);
      return () => {
        active = false;
      };
    }

    void QRCode.toDataURL(selected_order.reception_number, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 320,
    })
      .then((data_url) => {
        if (active) set_qr_data_url(data_url);
      })
      .catch(() => {
        if (active) set_qr_data_url(null);
      });

    return () => {
      active = false;
    };
  }, [selected_order]);

  if (selected_order) {
    return (
      <section className="grid gap-4">
        <div className="grid justify-items-center gap-3 rounded-md border border-slate-200 bg-white p-4">
          {qr_data_url ? (
            <img
              alt={`${selected_order.reception_number}の注文QR`}
              className="h-72 w-72 max-w-full"
              src={qr_data_url}
            />
          ) : (
            <p className="rounded-md bg-amber-50 p-3 text-sm leading-6 text-amber-900">
              QR画像を作成できませんでした。下の受付番号をスタッフへ提示してください。
            </p>
          )}
          <p className="text-center text-3xl font-bold tracking-[0.2em] text-slate-900">
            {selected_order.reception_number}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-2 rounded-md border border-slate-200 bg-white p-4 text-sm">
          <dt className="text-slate-600">注文日時</dt>
          <dd className="text-right font-bold">
            {format_datetime(selected_order.ordered_at)}
          </dd>
          <dt className="text-slate-600">合計数量</dt>
          <dd className="text-right font-bold">
            {selected_order.total_quantity}
          </dd>
          <dt className="text-slate-600">合計金額（税込）</dt>
          <dd className="text-right font-bold">
            {format_price(selected_order.total_price_yen)}
          </dd>
        </dl>

        <button
          className="min-h-12 rounded-md border border-slate-300 bg-white px-3 font-semibold"
          onClick={() => set_selected_order(null)}
          type="button"
        >
          注文履歴へ戻る
        </button>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <h2 className="text-xl font-bold">注文履歴</h2>

      {orders.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-sm leading-6 text-slate-700">
          この端末で作成した注文はまだありません。
        </p>
      ) : (
        <div className="grid gap-3">
          {orders.map((order) => (
            <article
              className="grid gap-3 rounded-md border border-slate-200 bg-white p-4"
              key={order.order_id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-600">受付番号</p>
                  <h3 className="text-lg font-bold">
                    {order.reception_number}
                  </h3>
                </div>
                <time className="text-right text-xs text-slate-600">
                  {format_datetime(order.ordered_at)}
                </time>
              </div>
              <div className="grid gap-2">
                {order.items.map((item) => (
                  <div
                    className="flex items-center gap-3 rounded-md bg-slate-50 p-2"
                    key={item.local_project_code}
                  >
                    <img
                      alt={`${numeric_project_code(item.local_project_code)}のサムネイル`}
                      className="h-14 w-14 rounded-full border border-slate-200 object-cover"
                      src={item.thumbnail_data_url}
                    />
                    <p className="flex-1 font-semibold">
                      {numeric_project_code(item.local_project_code)}
                    </p>
                    <p className="text-sm font-semibold">{item.quantity}個</p>
                  </div>
                ))}
              </div>
              <p className="text-right text-sm font-bold">
                合計 {order.total_quantity}個
              </p>
              <button
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-semibold"
                onClick={() => set_selected_order(order)}
                type="button"
              >
                <QrCode aria-hidden="true" size={18} />
                注文QRを表示
              </button>
            </article>
          ))}
        </div>
      )}

      <button
        className="min-h-12 rounded-md border border-slate-300 bg-white px-3 font-semibold"
        onClick={on_back}
        type="button"
      >
        デザイン一覧へ戻る
      </button>
    </section>
  );
}

function format_price(value: number | null | undefined) {
  return typeof value === "number"
    ? `${value.toLocaleString("ja-JP")}円`
    : "価格未設定";
}
