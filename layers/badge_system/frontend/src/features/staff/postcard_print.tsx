import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { StaffOrderBatch } from "../../types/api_types";
import "./postcard_print.css";

const staff_alignment_mark_angle_degrees = -17;

function alignment_mark_position(
  angle_degrees = staff_alignment_mark_angle_degrees,
) {
  const radians = (angle_degrees * Math.PI) / 180;

  return {
    left_percent: 50 + Math.sin(radians) * 50,
    top_percent: 50 - Math.cos(radians) * 50,
  };
}

const alignment_mark = alignment_mark_position();

export function PostcardPrint({ order }: { order: StaffOrderBatch }) {
  const copies = 2;

  const [preview_images, set_preview_images] = useState<string[]>([]);
  const [print_images, set_print_images] = useState<string[]>([]);
  const [error, set_error] = useState("");
  const [printing, set_printing] = useState(false);
  const [removed_item_ids, set_removed_item_ids] = useState<string[]>([]);

  const printing_ref = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const urls: string[] = [];
    let active = true;

    set_preview_images([]);
    set_print_images([]);
    set_error("");
    set_removed_item_ids([]);

    async function load_image(
      source: string,
      expected_path: RegExp,
    ): Promise<string> {
      const url = new URL(source, window.location.origin);

      if (
        url.origin !== window.location.origin ||
        !expected_path.test(url.pathname)
      ) {
        throw new Error("画像の取得先が正しくありません。");
      }

      const response = await fetch(url.href, {
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          "画像を取得できません。注文を再検索してください。",
        );
      }

      const blob = await response.blob();

      if (!active) {
        throw new Error("cancelled");
      }

      if (!blob.type.startsWith("image/")) {
        throw new Error(
          "画像を読み込めません。注文を再検索してください。",
        );
      }

      const object_url = URL.createObjectURL(blob);
      urls.push(object_url);

      const image = new Image();
      image.src = object_url;
      await image.decode();

      return object_url;
    }

    async function prepare() {
      try {
        if (!order.items.length) {
          throw new Error("注文に画像がありません。");
        }

        const ready_images = await Promise.all(
          order.items.map(async (item) => {
            const [preview_image, print_image] = await Promise.all([
              load_image(
                item.thumbnailUrl,
                /^\/api\/staff\/order-items\/[^/]+\/thumbnail$/,
              ),
              load_image(
                item.imageUrl,
                /^\/api\/staff\/order-items\/[^/]+\/print-image$/,
              ),
            ]);

            return {
              preview_image,
              print_image,
            };
          }),
        );

        if (active) {
          set_preview_images(
            ready_images.map((entry) => entry.preview_image),
          );
          set_print_images(
            ready_images.map((entry) => entry.print_image),
          );
        }
      } catch (caught) {
        if (active) {
          controller.abort();

          set_error(
            caught instanceof Error
              ? caught.message
              : "画像を準備できません。再検索してください。",
          );
        }
      }
    }

    void prepare();

    return () => {
      active = false;
      controller.abort();

      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [order]);

  useEffect(() => {
    const finish = () => {
      printing_ref.current = false;
      set_printing(false);
    };

    window.addEventListener("afterprint", finish);

    return () => {
      window.removeEventListener("afterprint", finish);
    };
  }, []);

  const ready =
    preview_images.length === order.items.length &&
    print_images.length === order.items.length &&
    order.items.length > 0 &&
    !error;

  const removed_counts = removed_item_ids.reduce((counts, item_id) => {
    counts.set(item_id, (counts.get(item_id) ?? 0) + 1);
    return counts;
  }, new Map<string, number>());

  const selected_items = order.items
    .map((item, index) => ({
      item,
      preview_image: preview_images[index],
      print_image: print_images[index],
      remaining_quantity: Math.max(
        0,
        item.quantity - (removed_counts.get(item.id) ?? 0),
      ),
    }))
    .filter(({ remaining_quantity }) => remaining_quantity > 0);

  const quantity = selected_items.reduce(
    (total, { remaining_quantity }) => total + remaining_quantity,
    0,
  );

  const price =
    order.unitPriceYen != null &&
    Number.isSafeInteger(order.unitPriceYen) &&
    order.unitPriceYen >= 0 &&
    Number.isSafeInteger(order.unitPriceYen * quantity)
      ? order.unitPriceYen * quantity
      : null;

  const can_print = ready && selected_items.length > 0;

  function print() {
    if (!can_print || printing_ref.current) {
      return;
    }

    printing_ref.current = true;
    set_printing(true);

    try {
      window.print();
    } catch {
      printing_ref.current = false;
      set_printing(false);
      set_error(
        "印刷画面を開けません。ブラウザの印刷設定を確認してください。",
      );
    }
  }

  return (
    <section
      className="flex flex-1 flex-col gap-4"
      aria-label="注文デザイン"
    >
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : !ready ? (
        <p role="status">印刷画像を準備しています…</p>
      ) : null}

      {ready ? (
        selected_items.length ? (
          <ul
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            aria-label="注文画像一覧"
          >
            {selected_items.flatMap(
              ({ item, preview_image, remaining_quantity }) =>
                Array.from({ length: remaining_quantity }, (_, copy) => (
                  <li
                    key={`${item.id}-${copy}`}
                    className="relative min-w-0"
                  >
                    <img
                      alt={`${item.itemCode} ${copy + 1}枚目`}
                      src={preview_image}
                      className="aspect-square w-full rounded-md bg-white object-contain"
                    />

                    <button
                      type="button"
                      aria-label={`${item.itemCode} の注文を取りやめ（1個、残り${remaining_quantity - 1}個）`}
                      disabled={printing}
                      onClick={() => {
                        if (printing_ref.current) {
                          return;
                        }

                        set_removed_item_ids((current) => [
                          ...current,
                          item.id,
                        ]);
                      }}
                      className="absolute right-0 top-0 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 disabled:opacity-50"
                    >
                      <X size={20} aria-hidden="true" />
                    </button>
                  </li>
                )),
            )}
          </ul>
        ) : (
          <p role="status" className="py-8 text-center text-slate-600">
            注文するデザインがありません
          </p>
        )
      ) : null}

      <footer className="sticky bottom-0 -mx-4 mt-auto grid gap-3 border-t border-slate-200 bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4">
        {removed_item_ids.length ? (
          <button
            type="button"
            disabled={printing}
            onClick={() => {
              if (!printing_ref.current) {
                set_removed_item_ids((current) => current.slice(0, -1));
              }
            }}
            className="min-h-11 rounded-md border border-slate-300 px-3 font-semibold disabled:opacity-50"
          >
            取りやめを戻す
          </button>
        ) : null}

        <dl
          className="flex flex-wrap items-end justify-between gap-3"
          aria-live="polite"
        >
          <div>
            <dt className="text-sm text-slate-600">合計個数</dt>
            <dd className="text-2xl font-bold">{quantity}個</dd>
          </div>

          <div className="text-right">
            <dt className="text-sm text-slate-600">合計金額（税込）</dt>
            <dd className="text-2xl font-bold">
              {price == null
                ? "価格未設定"
                : `${price.toLocaleString("ja-JP")}円`}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={print}
          disabled={!can_print || printing}
          className="min-h-12 rounded-md bg-action px-4 font-semibold text-white disabled:bg-slate-300"
        >
          {printing ? "印刷画面を開いています" : "印刷"}
        </button>
      </footer>

      {can_print
        ? createPortal(
            <div className="postcard_pages" aria-hidden="true">
              {selected_items.flatMap(
                ({ item, print_image, remaining_quantity }) =>
                  Array.from({ length: remaining_quantity }, (_, page) => (
                    <div
                      key={`${item.id}-${page}`}
                      className="postcard_page"
                      style={{
                        gridTemplateRows: `repeat(${copies}, minmax(0, 1fr))`,
                      }}
                    >
                      {Array.from({ length: copies }, (_, copy) => (
                        <div className="postcard_badge" key={copy}>
                          <img src={print_image} alt="" />

                          <span
                            className="postcard_alignment_mark"
                            data-angle-degrees={
                              staff_alignment_mark_angle_degrees
                            }
                            style={{
                              left: `${alignment_mark.left_percent}%`,
                              top: `${alignment_mark.top_percent}%`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )),
              )}
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}