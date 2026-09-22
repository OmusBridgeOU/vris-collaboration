import { ArrowLeft } from "lucide-react";
import { provider_stamp_credits } from "../editor/provider_stamp_catalog";

export function CreditsView({ on_back }: { on_back: () => void }) {
  return (
    <section className="grid gap-5">
      <header className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          aria-label="戻る"
          className="grid min-h-11 min-w-11 place-items-center rounded-md border border-slate-300 bg-white"
          onClick={on_back}
          type="button"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <h1 className="text-2xl font-bold">クレジット</h1>
      </header>

      <section className="grid gap-2">
        <h2 className="text-lg font-bold">提供PNGスタンプ</h2>
        {provider_stamp_credits.length === 0 ? (
          <p className="text-sm leading-6 text-slate-700">
            現在、追加のPNGスタンプはありません。
          </p>
        ) : (
          <ul className="grid gap-3">
            {provider_stamp_credits.map((credit, index) => (
              <li
                className="grid grid-cols-2 gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm leading-6"
                key={credit.file_name}
              >
                <div className="grid min-h-28 place-items-center rounded-md bg-slate-50 p-2">
                  <img
                    alt={`提供スタンプ${index + 1}`}
                    className="max-h-28 w-full object-contain"
                    src={credit.image_url}
                  />
                </div>
                <div className="min-w-0 self-center">
                  <dl className="mt-2 grid gap-2 text-slate-700">
                    <div>
                      <dt className="font-semibold">制作者</dt>
                      <dd>{credit.creator}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">SNS・Web</dt>
                      <dd>
                        {credit.source_url ? (
                          <a
                            className="break-all text-accent underline"
                            href={credit.source_url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            リンクを開く
                          </a>
                        ) : (
                          "未登録"
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
