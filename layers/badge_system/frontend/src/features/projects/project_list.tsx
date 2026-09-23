import {
  BadgeInfo,
  CircleHelp,
  Copy,
  Download,
  History,
  PenLine,
  Plus,
  Share2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { show_credits_button } from "../../config/feature_flags";
import type { LocalBadgeProject } from "./project_types";

type ProjectListProps = {
  projects: LocalBadgeProject[];
  purchase_project_ids: Set<string>;
  on_create_project: () => void;
  on_edit_project: (project_id: string) => void;
  on_duplicate_project: (project_id: string) => void;
  on_delete_project: (project_id: string) => void;
  on_add_to_purchase_list: (project_id: string) => void;
  on_save_image: (project_id: string) => void;
  on_open_x_share: (project_id: string) => void;
  on_open_purchase_list: () => void;
  on_open_credits: () => void;
  on_open_order_history: () => void;
  on_open_help: () => void;
};

const format_datetime = (value: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const numeric_project_code = (local_project_code: string) =>
  local_project_code.replace(/\D/g, "") || local_project_code;

const project_status = (
  project: LocalBadgeProject,
  purchase_project_ids: Set<string>,
) => {
  if (project.ordered) {
    return "注文済み";
  }

  if (purchase_project_ids.has(project.project_id)) {
    return "カート追加済み";
  }

  return "未注文";
};

export function ProjectList({
  projects,
  purchase_project_ids,
  on_create_project,
  on_edit_project,
  on_duplicate_project,
  on_delete_project,
  on_add_to_purchase_list,
  on_save_image,
  on_open_x_share,
  on_open_purchase_list,
  on_open_credits,
  on_open_order_history,
  on_open_help,
}: ProjectListProps) {
  return (
    <section className="grid gap-4">
      <div className="grid gap-3">
        <div>
          <h2 className="text-xl font-bold">作成したデザイン</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-2 text-sm font-semibold"
            onClick={on_open_order_history}
            type="button"
          >
            <History aria-hidden="true" size={18} />
            注文履歴
          </button>
          <button
            className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-2 text-sm font-semibold"
            onClick={on_open_purchase_list}
            type="button"
          >
            <ShoppingCart aria-hidden="true" size={18} />
            注文カート
          </button>
          {show_credits_button ? (
            <button
              className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-2 text-sm font-semibold"
              onClick={on_open_credits}
              type="button"
            >
              <BadgeInfo aria-hidden="true" size={18} />
              クレジット
            </button>
          ) : null}
          <button
            className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-2 text-sm font-semibold"
            onClick={on_open_help}
            type="button"
          >
            <CircleHelp aria-hidden="true" size={18} />
            使い方
          </button>
          <button
            aria-label="新しいデザインを作る"
            className="col-span-2 flex min-h-14 items-center justify-center gap-2 rounded-md bg-action px-4 py-3 text-base font-semibold text-white"
            onClick={on_create_project}
            type="button"
          >
            <Plus aria-hidden="true" size={18} />
            新規
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="rounded-md border border-dashed border-slate-300 bg-white p-4 text-sm leading-6 text-slate-700">
          まだ端末内に保存されたデザインがありません。新しいデザインを作ると 001
          のような番号で保存されます。
        </p>
      ) : (
        <div className="grid gap-3">
          {projects.map((project) => (
            <article
              className="rounded-md border border-slate-200 bg-white p-3"
              key={project.project_id}
            >
              <div className="flex gap-3">
                <img
                  alt={`${numeric_project_code(project.local_project_code)}のサムネイル`}
                  className="h-24 w-24 shrink-0 rounded-md border border-slate-200 object-cover"
                  src={project.thumbnail_data_url}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold">
                        {numeric_project_code(project.local_project_code)}
                      </h3>
                    </div>
                    <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800">
                      {project_status(project, purchase_project_ids)}
                    </span>
                  </div>
                  <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-xs text-slate-600">
                    <dt>作成</dt>
                    <dd>{format_datetime(project.created_at)}</dd>
                    <dt>更新</dt>
                    <dd>{format_datetime(project.updated_at)}</dd>
                  </dl>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-2 text-sm font-semibold"
                  onClick={() => on_edit_project(project.project_id)}
                  type="button"
                >
                  <PenLine aria-hidden="true" size={17} />
                  編集
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-2 text-sm font-semibold"
                  onClick={() => on_duplicate_project(project.project_id)}
                  type="button"
                >
                  <Copy aria-hidden="true" size={17} />
                  複製
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-2 text-sm font-semibold"
                  onClick={() => on_save_image(project.project_id)}
                  type="button"
                >
                  <Download aria-hidden="true" size={17} />
                  画像を保存
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-2 text-sm font-semibold"
                  onClick={() => on_open_x_share(project.project_id)}
                  type="button"
                >
                  <Share2 aria-hidden="true" size={17} />
                  Xに投稿
                </button>
                <button
                  className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-action px-3 text-sm font-semibold text-white"
                  onClick={() => on_add_to_purchase_list(project.project_id)}
                  type="button"
                >
                  <ShoppingCart aria-hidden="true" size={18} />
                  カートに追加
                </button>
                <button
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-red-200 px-3 text-sm font-semibold text-red-700"
                  onClick={() => on_delete_project(project.project_id)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={17} />
                  削除
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
