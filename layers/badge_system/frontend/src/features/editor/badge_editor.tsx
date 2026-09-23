import {
  ArrowDownToLine,
  ArrowUpToLine,
  BadgePlus,
  Bold,
  Eraser,
  FlipHorizontal2,
  Hand,
  ImagePlus,
  RotateCw,
  Save,
  Trash2,
  Type,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ProjectStorage } from "../../indexed_db/project_database";
import type { PublicConfig } from "../../types/api_types";
import type {
  BadgeEditorState,
  LocalBadgeProject,
} from "../projects/project_types";
import {
  accepted_image_types,
  auto_save_delay_ms,
  badge_finish_diameter_mm,
  default_canvas_size_px,
  default_finish_diameter_ratio,
  font_catalog,
  frame_catalog,
  normalize_font_family,
  resolve_font_family,
  stamp_catalog,
} from "./editor_constants";
import { process_image_file } from "./image_processing";
import {
  add_drawing_stroke,
  add_stamp,
  add_text,
  clone_design,
  create_empty_design,
  create_history,
  get_selected_stamp,
  get_selected_text,
  move_selected_layer,
  redo_design,
  remove_selected_layer,
  set_frame,
  set_photo,
  undo_design,
  update_selected_transform,
  update_stamp_layer,
  update_text_layer,
} from "./editor_state";
import {
  get_transform_box,
  get_transform_box_corners,
  get_transform_control_points,
  hit_test_transform,
  type TransformBox,
  type TransformHandleAction,
} from "./editor_transform_handles";
import { render_badge_design } from "./editor_renderer";
import type {
  BadgeDesign,
  DrawingStroke,
  EditorHistory,
  EditorSelection,
  EditorTool,
  FrameCatalogItem,
  StrokePoint,
  StampCatalogItem,
} from "./editor_types";

type BadgeEditorProps = {
  config: PublicConfig;
  project: LocalBadgeProject;
  storage: ProjectStorage;
  on_back: () => void;
  on_add_to_purchase_list: (project_id: string) => void | Promise<void>;
};

type PointerRecord = {
  pointer_id: number;
  x: number;
  y: number;
};

type ShareImageCache = {
  design_updated_at: string;
  data_url: string | null;
};

type DirectManipulation = {
  action: TransformHandleAction | "pinch";
  selection: EditorSelection;
  start_design: BadgeDesign;
  start_point: StrokePoint;
  start_transform: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
  start_box: TransformBox;
  start_distance?: number;
  start_angle?: number;
  cycle_overlapping_on_tap?: boolean;
};

type CanvasPanInteraction = {
  pointer_id: number;
  start_client_x: number;
  start_client_y: number;
  start_offset_x: number;
  start_offset_y: number;
};

const photo_transform_selection: EditorSelection = { kind: "photo" };

const tools: Array<{ id: EditorTool; label: string }> = [
  { id: "photo", label: "写真" },
  { id: "stamp", label: "スタンプ" },
  { id: "pen", label: "ペン" },
  { id: "text", label: "文字" },
  { id: "frame", label: "枠" },
];

const editor_surface_css_width = "min(95vw, 430px, 50dvh)";
const editor_canvas_css_size =
  "min(calc(min(95vw, 430px, 50dvh) - 0.5rem), calc(100dvh - 290px))";
const editor_footer_css_height = "max(12dvh, 88px)";
const tap_move_tolerance_px = 32;

export function BadgeEditor({
  project,
  storage,
  on_back,
  on_add_to_purchase_list,
}: BadgeEditorProps) {
  const [history, set_history] = useState<EditorHistory>(() =>
    create_history(design_from_project(project)),
  );
  const [active_tool, set_active_tool] = useState<EditorTool>("photo");
  const [selection, set_selection] = useState<EditorSelection | undefined>();
  const [is_processing, set_is_processing] = useState(false);
  const [error_message, set_error_message] = useState("");
  const [pen_mode, set_pen_mode] = useState<"pen" | "eraser">("pen");
  const [pen_color, set_pen_color] = useState("#111827");
  const [pen_width, set_pen_width] = useState(8);
  const [pen_opacity, set_pen_opacity] = useState(1);
  const [current_stroke, set_current_stroke] = useState<DrawingStroke>();
  const [interaction_design, set_interaction_design] = useState<BadgeDesign>();
  const [preview_data_url, set_preview_data_url] = useState<string>();
  const [thumbnail_data_url, set_thumbnail_data_url] = useState<string>();
  const [rendered_design_updated_at, set_rendered_design_updated_at] =
    useState<string>();
  const [canvas_zoom, set_canvas_zoom] = useState(1);
  const [canvas_offset, set_canvas_offset] = useState({ x: 0, y: 0 });
  const [is_canvas_pan_mode, set_is_canvas_pan_mode] = useState(false);
  const canvas_ref = useRef<HTMLCanvasElement | null>(null);
  const canvas_pan_interaction = useRef<CanvasPanInteraction>();
  const pointer_records = useRef<Map<number, PointerRecord>>(new Map());
  const manipulation = useRef<DirectManipulation>();

  const design = history.present;
  const displayed_design = interaction_design ?? design;
  const transform_selection =
    active_tool === "photo" ? photo_transform_selection : selection;
  const selected_text = get_selected_text(displayed_design, selection);
  const selected_stamp = get_selected_stamp(displayed_design, selection);
  const can_undo = history.past.length > 0;
  const can_redo = history.future.length > 0;
  const share_image_cache = useRef<ShareImageCache>({
    design_updated_at: design.updated_at,
    data_url: project.share_image_data_url,
  });

  const persist_design = useCallback(
    async (
      next_design = design,
      options: { share_image_data_url?: string | null } = {},
    ) => {
      let edited_image_data_url =
        preview_data_url ?? project.editor_state.edited_image_data_url;
      let next_thumbnail_data_url =
        thumbnail_data_url ?? project.editor_state.thumbnail_data_url;

      if (
        typeof window.CanvasRenderingContext2D !== "undefined" &&
        rendered_design_updated_at !== next_design.updated_at
      ) {
        const rendered_canvas = await render_clean_design(next_design);
        edited_image_data_url = rendered_canvas.toDataURL("image/jpeg", 0.92);
        next_thumbnail_data_url = create_thumbnail_data_url(rendered_canvas);
      }

      if (options.share_image_data_url !== undefined) {
        share_image_cache.current = {
          design_updated_at: next_design.updated_at,
          data_url: options.share_image_data_url ?? null,
        };
      } else if (
        share_image_cache.current.design_updated_at !== next_design.updated_at
      ) {
        share_image_cache.current = {
          design_updated_at: next_design.updated_at,
          data_url: null,
        };
      }

      const editor_state = editor_state_from_design(
        next_design,
        edited_image_data_url,
        next_thumbnail_data_url,
      );
      await storage.save_project({
        ...project,
        editor_state,
        editor_design: next_design,
        thumbnail_data_url: editor_state.thumbnail_data_url,
        share_image_data_url: share_image_cache.current.data_url,
      });
    },
    [
      design,
      preview_data_url,
      project,
      rendered_design_updated_at,
      storage,
      thumbnail_data_url,
    ],
  );

  useEffect(() => {
    const timeout_id = window.setTimeout(() => {
      void persist_design().catch(() => {
        set_error_message("端末内保存に失敗しました。");
      });
    }, auto_save_delay_ms);

    return () => window.clearTimeout(timeout_id);
  }, [persist_design]);

  useEffect(() => {
    let cancelled = false;

    const render_preview = async () => {
      const canvas = canvas_ref.current;
      if (!canvas) {
        return;
      }

      if (typeof window.CanvasRenderingContext2D === "undefined") {
        set_preview_data_url(project.editor_state.edited_image_data_url);
        return;
      }

      try {
        const rendered_canvas = await render_clean_design(
          merge_current_stroke(displayed_design, current_stroke),
        );
        const context = canvas.getContext("2d");
        if (!context || cancelled) {
          return;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(rendered_canvas, 0, 0, canvas.width, canvas.height);
        draw_editor_guide(context);
        if (active_tool !== "pen") {
          draw_transform_overlay(
            context,
            displayed_design,
            transform_selection,
          );
        }
        if (!interaction_design && !current_stroke) {
          set_preview_data_url(rendered_canvas.toDataURL("image/jpeg", 0.92));
          set_thumbnail_data_url(create_thumbnail_data_url(rendered_canvas));
          set_rendered_design_updated_at(design.updated_at);
        }
      } catch {
        if (!cancelled) {
          set_preview_data_url(project.editor_state.edited_image_data_url);
        }
      }
    };

    void render_preview();

    return () => {
      cancelled = true;
    };
  }, [
    current_stroke,
    displayed_design,
    design.updated_at,
    interaction_design,
    active_tool,
    project.editor_state.edited_image_data_url,
    transform_selection,
  ]);

  useEffect(() => {
    const save_before_unload = () => {
      void persist_design();
    };
    window.addEventListener("pagehide", save_before_unload);

    return () => window.removeEventListener("pagehide", save_before_unload);
  }, [persist_design]);

  useEffect(() => {
    document.documentElement.classList.add("editor_scroll_lock");
    document.body.classList.add("editor_scroll_lock");

    return () => {
      document.documentElement.classList.remove("editor_scroll_lock");
      document.body.classList.remove("editor_scroll_lock");
    };
  }, []);

  async function handle_file(file: File | undefined) {
    if (!file) {
      return;
    }

    set_is_processing(true);
    set_error_message("");

    try {
      const result = await process_image_file(file);
      set_history((current) =>
        set_photo(current, result.photo, result.thumbnail_data_url),
      );
      set_selection(undefined);
      set_active_tool("photo");
      set_error_message("");
    } catch {
      set_error_message("画像処理に失敗しました。");
    } finally {
      set_is_processing(false);
    }
  }

  async function handle_save_and_back() {
    set_error_message("");
    try {
      await persist_design();
      on_back();
    } catch {
      set_error_message("デザインを保存できませんでした。");
    }
  }

  async function handle_add_to_purchase_list() {
    set_error_message("");
    try {
      await persist_design();
      await on_add_to_purchase_list(project.project_id);
    } catch {
      set_error_message("カートに追加できませんでした。");
    }
  }

  function change_canvas_zoom(delta: number) {
    const next_zoom = Math.min(
      4,
      Math.max(0.75, Number((canvas_zoom + delta).toFixed(2))),
    );
    set_canvas_zoom(next_zoom);
    if (next_zoom <= 1) {
      set_canvas_offset({ x: 0, y: 0 });
      set_is_canvas_pan_mode(false);
    }
  }

  function handle_pointer_down(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (is_canvas_pan_mode) {
      event.currentTarget.setPointerCapture(event.pointerId);
      canvas_pan_interaction.current = {
        pointer_id: event.pointerId,
        start_client_x: event.clientX,
        start_client_y: event.clientY,
        start_offset_x: canvas_offset.x,
        start_offset_y: canvas_offset.y,
      };
      return;
    }

    const point = event_point(event);
    event.currentTarget.setPointerCapture(event.pointerId);
    pointer_records.current.set(event.pointerId, {
      pointer_id: event.pointerId,
      ...point,
    });

    if (active_tool !== "pen" && pointer_records.current.size === 2) {
      begin_pinch_manipulation();
      return;
    }

    if (active_tool === "pen") {
      const stroke: DrawingStroke = {
        id: `stroke-${Date.now()}`,
        mode: pen_mode,
        color: pen_color,
        width: pen_mode === "eraser" ? pen_width * 2 : pen_width,
        opacity: pen_opacity,
        points: [point],
      };
      set_current_stroke(stroke);
      return;
    }

    const pointer_selection =
      active_tool === "photo" ? photo_transform_selection : selection;
    const hit = hit_test_transform(displayed_design, point, pointer_selection, {
      include_photo_target: active_tool === "photo",
    });
    if (!hit) {
      manipulation.current = undefined;
      set_interaction_design(undefined);
      set_selection(undefined);
      return;
    }

    if (hit.selection.kind === "photo") {
      set_selection(undefined);
    } else {
      set_selection(hit.selection);
      set_active_tool(hit.selection.kind);
    }
    const start_transform = find_transform_at_start(design, hit.selection);
    const start_box = get_transform_box(design, hit.selection);
    if (!start_transform || !start_box) {
      return;
    }

    manipulation.current = {
      action: hit.action,
      cycle_overlapping_on_tap:
        hit.action === "move" &&
        hit.selection.kind !== "photo" &&
        selections_equal(selection, hit.selection),
      selection: hit.selection,
      start_design: design,
      start_point: point,
      start_transform: {
        x: start_transform.x,
        y: start_transform.y,
        scale: start_transform.scale,
        rotation: start_transform.rotation,
      },
      start_box,
    };
  }

  function handle_pointer_move(event: ReactPointerEvent<HTMLCanvasElement>) {
    const pan_interaction = canvas_pan_interaction.current;
    if (pan_interaction?.pointer_id === event.pointerId) {
      const canvas = canvas_ref.current;
      if (!canvas) {
        return;
      }
      const transformed_width = canvas.getBoundingClientRect().width;
      const base_width = transformed_width / canvas_zoom;
      const maximum_offset = (base_width * (canvas_zoom - 1)) / 2;
      set_canvas_offset({
        x: Math.min(
          maximum_offset,
          Math.max(
            -maximum_offset,
            pan_interaction.start_offset_x +
              event.clientX -
              pan_interaction.start_client_x,
          ),
        ),
        y: Math.min(
          maximum_offset,
          Math.max(
            -maximum_offset,
            pan_interaction.start_offset_y +
              event.clientY -
              pan_interaction.start_client_y,
          ),
        ),
      });
      return;
    }

    const point = event_point(event);
    const existing = pointer_records.current.get(event.pointerId);
    if (existing) {
      pointer_records.current.set(event.pointerId, {
        pointer_id: event.pointerId,
        ...point,
      });
    }

    if (active_tool === "pen") {
      set_current_stroke((stroke) =>
        stroke ? { ...stroke, points: [...stroke.points, point] } : undefined,
      );
      return;
    }

    const current_manipulation = manipulation.current;
    if (current_manipulation) {
      const next_design = apply_direct_manipulation(
        current_manipulation,
        point,
        Array.from(pointer_records.current.values()),
      );
      set_interaction_design(next_design);
    }
  }

  function handle_pointer_up(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (canvas_pan_interaction.current?.pointer_id === event.pointerId) {
      canvas_pan_interaction.current = undefined;
      return;
    }

    const point = event_point(event);
    pointer_records.current.delete(event.pointerId);

    if (active_tool === "pen") {
      if (current_stroke && current_stroke.points.length > 1) {
        set_history((current) => add_drawing_stroke(current, current_stroke));
        set_error_message("");
      }
      set_current_stroke(undefined);
      return;
    }

    const current_manipulation = manipulation.current;
    if (!current_manipulation) {
      return;
    }

    const is_tap =
      distance_between_points(current_manipulation.start_point, point) <=
      tap_move_tolerance_px;
    if (
      is_tap &&
      current_manipulation.action === "move" &&
      current_manipulation.cycle_overlapping_on_tap
    ) {
      const tapped_hit = hit_test_transform(
        current_manipulation.start_design,
        current_manipulation.start_point,
        current_manipulation.selection,
        { cycle_overlapping_selection: true },
      );
      if (tapped_hit) {
        set_selection(tapped_hit.selection);
        set_active_tool(tapped_hit.selection.kind);
      }
      manipulation.current = undefined;
      set_interaction_design(undefined);
      return;
    }

    const next_design =
      interaction_design ??
      apply_direct_manipulation(
        current_manipulation,
        point,
        Array.from(pointer_records.current.values()),
      );
    const next_target = find_transform_at_start(
      next_design,
      current_manipulation.selection,
    );

    if (next_target) {
      set_history((current) =>
        update_selected_transform(current, current_manipulation.selection, {
          x: next_target.x,
          y: next_target.y,
          scale: next_target.scale,
          rotation: next_target.rotation,
        }),
      );
    }
    manipulation.current = undefined;
    set_interaction_design(undefined);
  }

  function handle_pointer_cancel(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (canvas_pan_interaction.current?.pointer_id === event.pointerId) {
      canvas_pan_interaction.current = undefined;
      return;
    }

    pointer_records.current.delete(event.pointerId);
    manipulation.current = undefined;
    set_current_stroke(undefined);
    set_interaction_design(undefined);
  }

  function begin_pinch_manipulation() {
    const pinch_selection =
      active_tool === "photo" ? photo_transform_selection : selection;
    if (!pinch_selection) {
      return;
    }

    const target = find_transform_at_start(design, pinch_selection);
    const start_box = get_transform_box(design, pinch_selection);
    const points = Array.from(pointer_records.current.values());

    if (!target || !start_box || points.length < 2) {
      return;
    }

    manipulation.current = {
      action: "pinch",
      selection: pinch_selection,
      start_design: design,
      start_point: midpoint(points[0], points[1]),
      start_transform: {
        x: target.x,
        y: target.y,
        scale: target.scale,
        rotation: target.rotation,
      },
      start_box,
      start_distance: distance_between_points(points[0], points[1]),
      start_angle: angle_between_points(points[0], points[1]),
    };
  }

  return (
    <main className="h-dvh overflow-hidden bg-paper text-ink">
      <section
        className="mx-auto flex h-dvh max-w-full flex-col overflow-hidden px-1 pb-[env(safe-area-inset-bottom)] pt-[calc(env(safe-area-inset-top)+0.125rem)]"
        style={{ width: editor_surface_css_width }}
      >
        <div
          className="grid min-h-0 flex-1 content-start gap-1 py-1"
          style={{
            gridTemplateRows: `minmax(0, ${editor_canvas_css_size}) minmax(0, auto) minmax(34px, 5.5dvh) minmax(0, 1fr)`,
          }}
        >
          <div
            className="row-start-1 mx-auto aspect-square min-h-0 shrink-0"
            style={{ width: editor_canvas_css_size }}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-md border border-slate-300 bg-white p-1 shadow-sm">
              <canvas
                ref={canvas_ref}
                aria-describedby="badge-finish-guide-description"
                aria-label="缶バッジ編集プレビュー"
                className="h-full w-full bg-white"
                height={default_canvas_size_px}
                onPointerCancel={handle_pointer_cancel}
                onPointerDown={handle_pointer_down}
                onPointerMove={handle_pointer_move}
                onPointerUp={handle_pointer_up}
                style={{
                  cursor: is_canvas_pan_mode ? "grab" : undefined,
                  touchAction: "none",
                  transform: `translate(${canvas_offset.x}px, ${canvas_offset.y}px) scale(${canvas_zoom})`,
                  transformOrigin: "center",
                }}
                width={default_canvas_size_px}
              />
              <div className="absolute left-2 top-2 z-10 flex gap-1">
                <IconButton
                  disabled={canvas_zoom <= 0.75}
                  label="キャンバスを縮小"
                  on_click={() => change_canvas_zoom(-0.25)}
                >
                  <ZoomOut aria-hidden="true" size={18} />
                </IconButton>
                <IconButton
                  disabled={canvas_zoom >= 4}
                  label="キャンバスを拡大"
                  on_click={() => change_canvas_zoom(0.25)}
                >
                  <ZoomIn aria-hidden="true" size={18} />
                </IconButton>
                <IconButton
                  active={is_canvas_pan_mode}
                  disabled={canvas_zoom <= 1}
                  label="キャンバス全体を移動"
                  on_click={() => set_is_canvas_pan_mode((current) => !current)}
                >
                  <Hand aria-hidden="true" size={18} />
                </IconButton>
              </div>
              <div className="absolute right-2 top-2 z-10 flex gap-1">
                <IconButton
                  disabled={!can_undo}
                  label="戻す"
                  on_click={() =>
                    set_history((current) => undo_design(current))
                  }
                >
                  <Undo2 aria-hidden="true" size={18} />
                </IconButton>
                <IconButton
                  disabled={!can_redo}
                  label="進む"
                  on_click={() =>
                    set_history((current) => redo_design(current))
                  }
                >
                  <RotateCw aria-hidden="true" size={18} />
                </IconButton>
              </div>
              <p
                className="pointer-events-none absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-[11px] font-bold text-slate-800 shadow-sm"
                id="badge-finish-guide-description"
              >
                点線までが缶バッジになります（直径
                {badge_finish_diameter_mm}mm）
              </p>
            </div>
            {design.photo?.quality_warning ? (
              <p className="mt-2 rounded-md bg-amber-50 px-2 py-2 text-sm text-amber-900">
                {design.photo.quality_warning}
              </p>
            ) : null}
          </div>

          {error_message ? (
            <div className="row-start-2 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-sm font-semibold text-red-700">
              {error_message}
            </div>
          ) : null}

          <nav className="row-start-3 grid h-full min-h-0 grid-cols-5 gap-1 rounded-md bg-slate-100 p-0.5">
            {tools.map((tool) => (
              <button
                className={`min-h-0 rounded px-1 text-xs font-semibold ${
                  active_tool === tool.id
                    ? "bg-white text-accent shadow-sm"
                    : "text-slate-700"
                }`}
                key={tool.id}
                onClick={() => set_active_tool(tool.id)}
                type="button"
              >
                {tool.label}
              </button>
            ))}
          </nav>

          <section className="row-start-4 h-full min-h-0 overflow-y-auto overscroll-contain rounded-md border border-slate-200 bg-white p-1">
            {active_tool === "photo" ? (
              <PhotoPanel disabled={is_processing} on_file={handle_file} />
            ) : null}

            {active_tool === "stamp" ? (
              <StampPanel
                selected_stamp={selected_stamp}
                on_add={(id) => {
                  const result = add_stamp(history, id);
                  set_history(result.history);
                  set_selection(result.selection);
                }}
                on_flip={() => {
                  if (selected_stamp) {
                    set_history((current) =>
                      update_stamp_layer(current, selected_stamp.id, {
                        flipped: !selected_stamp.flipped,
                      }),
                    );
                  }
                }}
                on_layer={(direction) =>
                  set_history((current) =>
                    move_selected_layer(current, selection, direction),
                  )
                }
                on_remove={() =>
                  set_history((current) =>
                    remove_selected_layer(current, selection),
                  )
                }
              />
            ) : null}

            {active_tool === "pen" ? (
              <PenPanel
                color={pen_color}
                mode={pen_mode}
                opacity={pen_opacity}
                width={pen_width}
                on_color={set_pen_color}
                on_mode={set_pen_mode}
                on_opacity={set_pen_opacity}
                on_width={set_pen_width}
              />
            ) : null}

            {active_tool === "text" ? (
              <TextPanel
                selected_text={selected_text}
                on_add={() => {
                  const result = add_text(history);
                  set_history(result.history);
                  set_selection(result.selection);
                }}
                on_layer={(direction) =>
                  set_history((current) =>
                    move_selected_layer(current, selection, direction),
                  )
                }
                on_remove={() =>
                  set_history((current) =>
                    remove_selected_layer(current, selection),
                  )
                }
                on_update={(id, update) =>
                  set_history((current) =>
                    update_text_layer(current, id, update),
                  )
                }
              />
            ) : null}

            {active_tool === "frame" ? (
              <FramePanel
                selected_id={design.frame?.catalog_id ?? "none"}
                on_select={(id) =>
                  set_history((current) => set_frame(current, id))
                }
              />
            ) : null}
          </section>
        </div>

        <footer
          className="grid min-h-0 shrink-0 gap-0.5 bg-paper pb-1 pt-1"
          style={{ height: editor_footer_css_height }}
        >
          <ActionButton on_click={handle_save_and_back}>
            <Save aria-hidden="true" size={18} />
            保存して戻る
          </ActionButton>
          <button
            className="flex min-h-10 items-center justify-center gap-2 rounded-md bg-action px-2 py-1 text-sm font-bold text-white shadow-sm"
            onClick={handle_add_to_purchase_list}
            type="button"
          >
            <BadgePlus aria-hidden="true" />
            カートに追加
          </button>
        </footer>
      </section>
    </main>
  );
}

function PhotoPanel({
  disabled,
  on_file,
}: {
  disabled: boolean;
  on_file: (file: File | undefined) => void;
}) {
  return (
    <div className="grid h-full min-h-[8rem] place-items-center">
      <div className="grid w-full place-items-center gap-2">
        <label className="grid min-h-20 w-[min(78%,16rem)] cursor-pointer content-center rounded-md border-2 border-dashed border-slate-400 bg-slate-50 px-3 py-3 text-center text-sm font-bold shadow-sm">
          <input
            accept={accepted_image_types}
            className="sr-only"
            disabled={disabled}
            onChange={(event) => void on_file(event.target.files?.[0])}
            type="file"
          />
          <span className="flex items-center justify-center gap-2">
            <ImagePlus aria-hidden="true" size={16} />
            写真を選択する
          </span>
        </label>
        <ul className="w-[min(92%,20rem)] list-disc space-y-1 pl-5 text-xs leading-5 text-slate-600">
          <li>自分で撮影した写真、または利用権のある写真を選んでください。</li>
          <li>対応形式はJPEG / PNG / WebP / HEIC / HEIF、20MB以下です。</li>
        </ul>
      </div>
    </div>
  );
}

function StampPanel({
  selected_stamp,
  on_add,
  on_flip,
  on_layer,
  on_remove,
}: {
  selected_stamp: { id: string; flipped: boolean } | undefined;
  on_add: (id: string) => void;
  on_flip: () => void;
  on_layer: (direction: "front" | "back") => void;
  on_remove: () => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="sticky top-0 z-10 bg-white pb-2">
        <LayerButtons
          disabled={!selected_stamp}
          on_flip={on_flip}
          on_layer={on_layer}
          on_remove={on_remove}
        />
      </div>
      <div className="grid grid-cols-3 gap-1">
        {stamp_catalog.map((stamp, index) => (
          <button
            aria-label={`スタンプ${index + 1}を追加`}
            className="grid min-h-24 place-items-center rounded-md border border-slate-300 bg-white p-1"
            key={stamp.id}
            onClick={() => on_add(stamp.id)}
            type="button"
          >
            <img
              alt=""
              className="h-20 w-full object-contain"
              src={stamp_preview_data_url(stamp)}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function PenPanel({
  color,
  mode,
  opacity,
  width,
  on_color,
  on_mode,
  on_opacity,
  on_width,
}: {
  color: string;
  mode: "pen" | "eraser";
  opacity: number;
  width: number;
  on_color: (value: string) => void;
  on_mode: (value: "pen" | "eraser") => void;
  on_opacity: (value: number) => void;
  on_width: (value: number) => void;
}) {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 gap-1">
        <button
          className={`min-h-11 rounded-md border px-2 font-semibold ${
            mode === "pen" ? "border-action bg-action text-white" : "bg-white"
          }`}
          onClick={() => on_mode("pen")}
          type="button"
        >
          ペン
        </button>
        <button
          className={`flex min-h-11 items-center justify-center gap-1 rounded-md border px-2 font-semibold ${
            mode === "eraser"
              ? "border-action bg-action text-white"
              : "bg-white"
          }`}
          onClick={() => on_mode("eraser")}
          type="button"
        >
          <Eraser aria-hidden="true" size={18} />
          消しゴム
        </button>
      </div>
      <div className="grid grid-cols-[3.25rem_1fr_1fr] gap-1">
        <label className="grid gap-1 text-xs font-medium">
          色
          <input
            className="h-11 w-11 rounded border border-slate-300 p-1"
            disabled={mode === "eraser"}
            onChange={(event) => on_color(event.target.value)}
            type="color"
            value={color}
          />
        </label>
        <label className="text-xs font-medium">
          幅 {width}px
          <input
            className="mt-2 w-full accent-action"
            max="48"
            min="2"
            onChange={(event) => on_width(Number(event.target.value))}
            type="range"
            value={width}
          />
        </label>
        <label className="text-xs font-medium">
          透明度 {Math.round(opacity * 100)}%
          <input
            className="mt-2 w-full accent-action"
            disabled={mode === "eraser"}
            max="1"
            min="0.05"
            onChange={(event) => on_opacity(Number(event.target.value))}
            step="0.05"
            type="range"
            value={opacity}
          />
        </label>
      </div>
    </div>
  );
}

function TextPanel({
  selected_text,
  on_add,
  on_layer,
  on_remove,
  on_update,
}: {
  selected_text:
    | {
        id: string;
        text: string;
        font_size: number;
        font_family: string;
        color: string;
        outline_color: string;
        outline_width: number;
        bold: boolean;
      }
    | undefined;
  on_add: () => void;
  on_layer: (direction: "front" | "back") => void;
  on_remove: () => void;
  on_update: (
    id: string,
    update: Partial<{
      text: string;
      font_size: number;
      font_family: string;
      color: string;
      outline_color: string;
      outline_width: number;
      bold: boolean;
    }>,
  ) => void;
}) {
  return (
    <div className="grid gap-2">
      <button
        className="flex min-h-12 items-center justify-center gap-1 rounded-md border border-slate-300 bg-white px-2 font-semibold"
        onClick={on_add}
        type="button"
      >
        <Type aria-hidden="true" size={18} />
        テキストを追加
      </button>
      {selected_text ? (
        <>
          <label className="grid gap-1 text-sm font-medium">
            テキスト
            <input
              className="min-h-11 rounded-md border border-slate-300 px-2"
              onChange={(event) =>
                on_update(selected_text.id, { text: event.target.value })
              }
              value={selected_text.text}
            />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            フォント
            <select
              className="h-11 min-h-11 w-full rounded-md border border-slate-300 bg-white px-2"
              onChange={(event) =>
                on_update(selected_text.id, {
                  font_family: event.target.value,
                })
              }
              style={{
                fontFamily: resolve_font_family(selected_text.font_family),
              }}
              value={normalize_font_family(selected_text.font_family)}
            >
              {font_catalog.map((font) => (
                <option
                  key={font.id}
                  style={{ fontFamily: font.fallback_stack }}
                  value={font.font_family}
                >
                  {font.label}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-1">
            <label className="grid gap-1 text-sm font-medium">
              文字色
              <input
                className="h-11 w-full"
                onChange={(event) =>
                  on_update(selected_text.id, { color: event.target.value })
                }
                type="color"
                value={selected_text.color}
              />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              縁取り
              <input
                className="h-11 w-full"
                onChange={(event) =>
                  on_update(selected_text.id, {
                    outline_color: event.target.value,
                  })
                }
                type="color"
                value={selected_text.outline_color}
              />
            </label>
          </div>
          <label className="text-sm font-medium">
            文字サイズ {selected_text.font_size}px
            <input
              className="mt-1 w-full accent-action"
              max="180"
              min="32"
              onChange={(event) =>
                on_update(selected_text.id, {
                  font_size: Number(event.target.value),
                })
              }
              type="range"
              value={selected_text.font_size}
            />
          </label>
          <div className="grid grid-cols-2 gap-1">
            <ActionButton
              on_click={() =>
                on_update(selected_text.id, { bold: !selected_text.bold })
              }
            >
              <Bold aria-hidden="true" size={18} />
              太字
            </ActionButton>
            <ActionButton
              on_click={() =>
                on_update(selected_text.id, {
                  outline_width: selected_text.outline_width === 0 ? 8 : 0,
                })
              }
            >
              縁取り
            </ActionButton>
          </div>
        </>
      ) : null}
      <LayerButtons
        disabled={!selected_text}
        on_layer={on_layer}
        on_remove={on_remove}
      />
    </div>
  );
}

function FramePanel({
  selected_id,
  on_select,
}: {
  selected_id: string;
  on_select: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {frame_catalog.map((frame, index) => (
        <button
          aria-label={frame.id === "none" ? "枠を外す" : `枠${index}を選択`}
          aria-pressed={selected_id === frame.id}
          className={`grid min-h-20 place-items-center gap-1 rounded-md border px-1 py-2 text-xs font-semibold ${
            selected_id === frame.id
              ? "border-action bg-action text-white"
              : "border-slate-300 bg-white"
          }`}
          key={frame.id}
          onClick={() => on_select(frame.id)}
          type="button"
        >
          <img
            alt=""
            className="h-12 w-12"
            src={frame_preview_data_url(frame)}
          />
        </button>
      ))}
    </div>
  );
}

function stamp_preview_data_url(stamp: StampCatalogItem) {
  return stamp.image_url ?? "";
}

function frame_preview_data_url(frame: FrameCatalogItem) {
  if (frame.image_url) {
    return frame.image_url;
  }

  const frame_shape =
    frame.id === "none"
      ? `<circle cx="50" cy="50" r="34" fill="#ffffff" stroke="#cbd5e1" stroke-width="6" stroke-dasharray="8 7" />`
      : `<circle cx="50" cy="50" r="34" fill="#ffffff" stroke="${frame.color}" stroke-width="16" /><circle cx="50" cy="50" r="34" fill="none" stroke="#111827" stroke-width="3" />`;

  return svg_data_url(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${frame_shape}</svg>`,
  );
}

function svg_data_url(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function LayerButtons({
  disabled,
  on_flip,
  on_layer,
  on_remove,
}: {
  disabled: boolean;
  on_flip?: () => void;
  on_layer: (direction: "front" | "back") => void;
  on_remove: () => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-0.5">
      <IconTextButton disabled={disabled} on_click={() => on_layer("front")}>
        <ArrowUpToLine aria-hidden="true" size={18} />
        前面
      </IconTextButton>
      <IconTextButton disabled={disabled} on_click={() => on_layer("back")}>
        <ArrowDownToLine aria-hidden="true" size={18} />
        背面
      </IconTextButton>
      <IconTextButton
        disabled={disabled || !on_flip}
        on_click={() => on_flip?.()}
      >
        <FlipHorizontal2 aria-hidden="true" size={18} />
        反転
      </IconTextButton>
      <IconTextButton disabled={disabled} on_click={on_remove}>
        <Trash2 aria-hidden="true" size={18} />
        削除
      </IconTextButton>
    </div>
  );
}

function ActionButton({
  children,
  on_click,
}: {
  children: React.ReactNode;
  on_click: () => void;
}) {
  return (
    <button
      className="flex min-h-9 items-center justify-center gap-1 rounded-md border border-slate-300 bg-white px-2 text-xs font-semibold"
      onClick={on_click}
      type="button"
    >
      {children}
    </button>
  );
}

function IconTextButton({
  children,
  disabled,
  on_click,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  on_click: () => void;
}) {
  return (
    <button
      className="grid min-h-9 place-items-center rounded-md border border-slate-300 bg-white px-1 text-[0px] disabled:opacity-40"
      disabled={disabled}
      onClick={on_click}
      type="button"
    >
      {children}
    </button>
  );
}

function IconButton({
  active,
  children,
  disabled,
  label,
  on_click,
}: {
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  label: string;
  on_click: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={`grid min-h-9 min-w-9 place-items-center rounded-md border border-slate-300 disabled:opacity-40 ${
        active ? "bg-slate-800 text-white" : "bg-white"
      }`}
      disabled={disabled}
      onClick={on_click}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

function draw_transform_overlay(
  context: CanvasRenderingContext2D,
  design: BadgeDesign,
  selection: EditorSelection | undefined,
) {
  const box = get_transform_box(design, selection);
  if (!box) {
    return;
  }

  const corners = get_transform_box_corners(box);
  const controls = get_transform_control_points(box);

  context.save();
  context.strokeStyle = "#2563eb";
  context.fillStyle = "#ffffff";
  context.lineWidth = 5;
  context.setLineDash([18, 10]);
  context.beginPath();
  context.moveTo(corners[0].x, corners[0].y);
  for (const corner of corners.slice(1)) {
    context.lineTo(corner.x, corner.y);
  }
  context.closePath();
  context.stroke();

  context.setLineDash([]);
  context.beginPath();
  context.moveTo(controls.top_center.x, controls.top_center.y);
  context.lineTo(controls.rotate_handle.x, controls.rotate_handle.y);
  context.stroke();

  for (const corner of controls.corners) {
    draw_handle(context, corner, "#2563eb");
  }
  draw_handle(context, controls.rotate_handle, "#b91c1c");
  context.restore();
}

function draw_editor_guide(context: CanvasRenderingContext2D) {
  context.save();
  context.setLineDash([12, 10]);
  context.strokeStyle = "#0f766e";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(
    default_canvas_size_px / 2,
    default_canvas_size_px / 2,
    (default_canvas_size_px * default_finish_diameter_ratio) / 2,
    0,
    Math.PI * 2,
  );
  context.stroke();
  context.restore();
}

function create_thumbnail_data_url(source: HTMLCanvasElement) {
  const thumbnail = document.createElement("canvas");
  thumbnail.width = 360;
  thumbnail.height = 360;
  const context = thumbnail.getContext("2d");
  if (!context) {
    return source.toDataURL("image/jpeg", 0.82);
  }

  context.drawImage(source, 0, 0, thumbnail.width, thumbnail.height);
  return thumbnail.toDataURL("image/jpeg", 0.82);
}

function render_clean_design(design: BadgeDesign) {
  return render_badge_design(design, {
    canvas_size_px: default_canvas_size_px,
    finish_diameter_ratio: default_finish_diameter_ratio,
    include_guides: false,
  });
}

function draw_handle(
  context: CanvasRenderingContext2D,
  point: StrokePoint,
  color: string,
) {
  context.beginPath();
  context.arc(point.x, point.y, 34, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = color;
  context.lineWidth = 8;
  context.stroke();
}

function apply_direct_manipulation(
  interaction: DirectManipulation,
  point: StrokePoint,
  active_points: PointerRecord[],
) {
  const next_design = clone_design(interaction.start_design);
  const target = find_transform_at_start(next_design, interaction.selection);
  if (!target) {
    return next_design;
  }

  if (interaction.action === "move") {
    target.x =
      interaction.start_transform.x + point.x - interaction.start_point.x;
    target.y =
      interaction.start_transform.y + point.y - interaction.start_point.y;
    return next_design;
  }

  if (interaction.action === "scale") {
    const start_distance = Math.max(
      1,
      distance_between_points(interaction.start_point, interaction.start_box),
    );
    const next_distance = Math.max(
      1,
      distance_between_points(point, interaction.start_box),
    );
    target.scale = clamp_scale(
      interaction.start_transform.scale * (next_distance / start_distance),
    );
    return next_design;
  }

  if (interaction.action === "rotate") {
    target.rotation =
      interaction.start_transform.rotation +
      angle_between_points(interaction.start_box, point) -
      angle_between_points(interaction.start_box, interaction.start_point);
    return next_design;
  }

  if (active_points.length >= 2 && interaction.start_distance) {
    const center = midpoint(active_points[0], active_points[1]);
    const next_distance = Math.max(
      1,
      distance_between_points(active_points[0], active_points[1]),
    );
    const next_angle = angle_between_points(active_points[0], active_points[1]);

    target.x =
      interaction.start_transform.x + center.x - interaction.start_point.x;
    target.y =
      interaction.start_transform.y + center.y - interaction.start_point.y;
    target.scale = clamp_scale(
      interaction.start_transform.scale *
        (next_distance / interaction.start_distance),
    );
    target.rotation =
      interaction.start_transform.rotation +
      next_angle -
      (interaction.start_angle ?? next_angle);
  }

  return next_design;
}

function clamp_scale(value: number) {
  return Math.min(4, Math.max(0.12, value));
}

function midpoint(a: StrokePoint, b: StrokePoint) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function distance_between_points(a: StrokePoint, b: StrokePoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angle_between_points(a: StrokePoint, b: StrokePoint) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

function selections_equal(
  first: EditorSelection | undefined,
  second: EditorSelection | undefined,
) {
  if (!first || !second || first.kind !== second.kind) {
    return false;
  }

  if (first.kind === "photo" && second.kind === "photo") {
    return true;
  }

  return "id" in first && "id" in second && first.id === second.id;
}

function design_from_project(project: LocalBadgeProject): BadgeDesign {
  if (project.editor_design) {
    const stored_design = JSON.parse(
      JSON.stringify(project.editor_design),
    ) as BadgeDesign;
    return {
      ...stored_design,
      text_layers: stored_design.text_layers.map((text_layer) => ({
        ...text_layer,
        font_family: normalize_font_family(text_layer.font_family),
      })),
      project_id: project.project_id,
      local_project_code: project.local_project_code,
      created_at: project.created_at,
      ordered: project.ordered,
    } as BadgeDesign;
  }

  return {
    ...create_empty_design(project.local_project_code),
    project_id: project.project_id,
    created_at: project.created_at,
    updated_at: project.updated_at,
    ordered: project.ordered,
  };
}

function editor_state_from_design(
  design: BadgeDesign,
  edited_image_data_url: string,
  rendered_thumbnail_data_url: string,
): BadgeEditorState {
  return {
    source_image_data_url: design.photo?.data_url ?? null,
    edited_image_data_url,
    thumbnail_data_url:
      rendered_thumbnail_data_url ||
      design.thumbnail_data_url ||
      edited_image_data_url,
    stamps: design.stamps.map((stamp) => ({
      id: stamp.id,
      asset_id: stamp.catalog_id,
      x: stamp.x,
      y: stamp.y,
      scale: stamp.scale,
      rotation: stamp.rotation,
      flipped: stamp.flipped,
    })),
    drawing_paths: design.drawing_strokes.map((stroke) => ({
      id: stroke.id,
      color: stroke.color,
      width: stroke.width,
      opacity: stroke.opacity,
      points: stroke.points.flatMap((point) => [point.x, point.y]),
      tool: stroke.mode,
    })),
    texts: design.text_layers.map((text_layer) => ({
      id: text_layer.id,
      value: text_layer.text,
      font_family: text_layer.font_family,
      font_size: text_layer.font_size,
      color: text_layer.color,
      outline_color: text_layer.outline_color,
      outline_width: text_layer.outline_width,
      bold: text_layer.bold,
      x: text_layer.x,
      y: text_layer.y,
      rotation: text_layer.rotation,
    })),
    frame_asset_id: design.frame?.catalog_id ?? null,
    layer_order: design.layer_order,
    zoom: design.photo?.scale ?? 1,
    rotation: design.photo?.rotation ?? 0,
  };
}

function event_point(event: ReactPointerEvent<HTMLCanvasElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const ratio = default_canvas_size_px / rect.width;

  return {
    x: (event.clientX - rect.left) * ratio,
    y: (event.clientY - rect.top) * ratio,
  };
}

function find_transform_at_start(
  design: BadgeDesign,
  selection: EditorSelection,
) {
  if (selection.kind === "photo") {
    return design.photo;
  }

  if (selection.kind === "stamp") {
    return design.stamps.find((stamp) => stamp.id === selection.id);
  }

  return design.text_layers.find(
    (text_layer) => text_layer.id === selection.id,
  );
}

function merge_current_stroke(
  design: BadgeDesign,
  current_stroke: DrawingStroke | undefined,
) {
  if (!current_stroke) {
    return design;
  }

  return {
    ...design,
    drawing_strokes: [...design.drawing_strokes, current_stroke],
  };
}
