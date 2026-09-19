import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetch_current_staff_user,
  find_staff_order,
} from "../../api/staff_client";
import type { SessionUser, StaffOrderBatch } from "../../types/api_types";
import { normalize_order_lookup } from "./order_lookup";
import { QrScanner } from "./qr_scanner";
import { PostcardPrint } from "./postcard_print";

function StaffOrderLookup() {
  const [value, set_value] = useState("");
  const [order, set_order] = useState<StaffOrderBatch | null>(null);
  const [busy, set_busy] = useState(false);
  const busy_ref = useRef(false);
  const mounted = useRef(true);
  const [camera, set_camera] = useState(false);
  const [error, set_error] = useState("");
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const close_camera = useCallback(() => set_camera(false), []);
  const search = useCallback(async (input: string) => {
    if (busy_ref.current) return;
    busy_ref.current = true;
    set_busy(true);
    set_camera(false);
    set_order(null);
    set_error("");
    try {
      const normalized = normalize_order_lookup(input);
      set_value(normalized);
      const found = await find_staff_order(normalized);
      if (mounted.current) set_order(found);
    } catch (caught) {
      if (mounted.current)
        set_error(
          caught instanceof Error
            ? caught.message
            : "注文を検索できません。再検索してください。",
        );
    } finally {
      busy_ref.current = false;
      if (mounted.current) set_busy(false);
    }
  }, []);
  const read_qr = useCallback(
    (input: string) => {
      void search(input);
    },
    [search],
  );
  return (
    <section className="flex flex-1 flex-col gap-4">
      <form
        className="grid gap-2"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void search(value);
        }}
      >
        <label className="text-sm font-semibold" htmlFor="staff_order_search">
          受付番号（5桁）
        </label>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input
            id="staff_order_search"
            value={value}
            onChange={(event) => {
              const input = event.target.value;
              if (/^\d{0,5}$/.test(input)) {
                set_value(input);
                return;
              }
              set_value("");
              set_order(null);
              set_error(
                "受付番号は10000から99999までの5桁数字で入力してください。",
              );
            }}
            autoComplete="off"
            inputMode="numeric"
            maxLength={5}
            pattern="[0-9]{5}"
            spellCheck={false}
            placeholder="48317"
            disabled={busy}
            className="min-h-12 min-w-0 rounded-md border border-slate-300 px-3 text-base"
          />
          <button
            disabled={busy}
            className="min-h-12 rounded-md bg-action px-4 font-semibold text-white disabled:bg-slate-300"
          >
            注文検索
          </button>
        </div>
      </form>
      {!camera ? (
        <button
          disabled={busy}
          type="button"
          className="min-h-12 rounded-md border border-slate-300 bg-white px-3 font-semibold"
          onClick={() => {
            set_order(null);
            set_error("");
            set_camera(true);
          }}
        >
          カメラでQRを読む
        </button>
      ) : (
        <QrScanner on_read={read_qr} on_close={close_camera} />
      )}
      {busy ? <p role="status">注文を検索しています…</p> : null}
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {order ? (
        <article className="flex flex-1 flex-col" key={order.id}>
          <PostcardPrint order={order} />
        </article>
      ) : null}
    </section>
  );
}

export function StaffApp() {
  const [user, set_user] = useState<SessionUser | null>(null);
  const [checking, set_checking] = useState(true);
  useEffect(() => {
    let active = true;
    void fetch_current_staff_user()
      .then((found) => {
        if (active) set_user(found);
      })
      .catch(() => {
        if (active) set_user(null);
      })
      .finally(() => {
        if (active) set_checking(false);
      });
    return () => {
      active = false;
    };
  }, []);
  if (checking)
    return (
      <main className="min-h-dvh p-4" role="status">
        認証を確認しています…
      </main>
    );
  if (!user)
    return (
      <main className="p-4" role="alert">
        スタッフ認証を確認できません。ブラウザで再読み込みしてください。
      </main>
    );
  return (
    <main className="min-h-dvh bg-slate-50 text-ink">
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-4 px-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div>
            <p className="text-sm font-semibold text-accent">VRIS STAFF</p>
            <h1 className="text-xl font-bold">注文確認・印刷</h1>
          </div>
        </header>
        <StaffOrderLookup />
      </div>
    </main>
  );
}
