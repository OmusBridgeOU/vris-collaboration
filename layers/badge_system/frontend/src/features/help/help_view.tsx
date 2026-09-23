type HelpViewProps = {
  on_back: () => void;
};

const steps = [
  {
    title: "デザインを作る",
    description:
      "「新規」を押し、画像・スタンプ・文字・手描き・フレームを使って缶バッジを編集します。",
  },
  {
    title: "保存する",
    description:
      "編集が終わったら「保存して戻る」を押します。デザインはこの端末に保存されます。",
  },
  {
    title: "カートに追加する",
    description:
      "デザイン一覧から「カートに追加」を押します。カートでは注文する数量を変更できます。",
  },
  {
    title: "注文用QRを作る",
    description:
      "カートで内容と注意事項を確認し、注文を確定します。表示されたQRまたは受付番号をスタッフへ提示してください。",
  },
];

export function HelpView({ on_back }: HelpViewProps) {
  return (
    <section className="grid gap-4">
      <h2 className="text-xl font-bold">このシステムの使い方</h2>

      <ol className="grid gap-3">
        {steps.map((step, index) => (
          <li
            className="flex gap-3 rounded-md border border-slate-200 bg-white p-4"
            key={step.title}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-action font-bold text-white">
              {index + 1}
            </span>
            <div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="rounded-md bg-amber-50 p-3 text-sm leading-6 text-amber-900">
        デザインと注文履歴は、作成に使用した端末とブラウザに保存されます。
      </p>

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
