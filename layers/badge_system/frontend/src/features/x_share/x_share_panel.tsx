import { Download, ExternalLink } from "lucide-react";
import type { LocalBadgeProject } from "../projects/project_types";
import {
  build_x_intent_url,
  build_x_share_text,
  type XShareConfig,
} from "./x_share_service";

type XSharePanelProps = {
  project: LocalBadgeProject;
  config: XShareConfig;
  image_saved: boolean;
  error_message: string | null;
  on_save_image: () => void;
  on_back: () => void;
};

const numeric_project_code = (local_project_code: string) =>
  local_project_code.replace(/\D/g, "") || local_project_code;

export function XSharePanel({
  project,
  config,
  image_saved,
  error_message,
  on_save_image,
  on_back,
}: XSharePanelProps) {
  const project_code = numeric_project_code(project.local_project_code);
  const share_text = build_x_share_text(config);
  const x_intent_url = build_x_intent_url(config);

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="text-xl font-bold">{project_code}</h2>
      </div>

      <img
        alt={`${project_code}の共有画像`}
        className="aspect-square w-full rounded-md border border-slate-200 bg-white object-cover"
        src={project.editor_state.edited_image_data_url}
      />

      <div className="rounded-md border border-slate-200 bg-white p-4">
        <h3 className="font-semibold">投稿文プレビュー</h3>
        <textarea
          className="mt-2 min-h-28 w-full rounded-md border border-slate-300 p-3 text-sm"
          readOnly
          value={share_text}
        />
      </div>

      {!image_saved ? (
        <p className="rounded-md bg-amber-50 p-3 text-sm leading-6 text-amber-900">
          Xの投稿画面を開く前に画像を保存してください。保存した画像は投稿画面で手動添付してください。
        </p>
      ) : (
        <p className="rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">
          Xへ投稿する際は、保存した画像を投稿画面で添付してください。
        </p>
      )}

      {error_message ? (
        <p className="rounded-md bg-red-50 p-3 text-sm leading-6 text-red-800">
          {error_message}
        </p>
      ) : null}

      <div className="grid gap-2">
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 font-semibold"
          onClick={on_save_image}
          type="button"
        >
          <Download aria-hidden="true" size={18} />
          画像を保存
        </button>
        <a
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-3 font-semibold ${
            image_saved
              ? "bg-action text-white"
              : "pointer-events-none bg-slate-300 text-slate-600"
          }`}
          href={image_saved ? x_intent_url : undefined}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink aria-hidden="true" size={18} />
          Xの投稿画面を開く
        </a>
        <button
          className="min-h-12 rounded-md border border-slate-300 bg-white px-3 font-semibold"
          onClick={on_back}
          type="button"
        >
          戻る
        </button>
      </div>
    </section>
  );
}
