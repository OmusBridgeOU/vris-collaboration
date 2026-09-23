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
