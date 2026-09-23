import type { BadgeDesign } from "../editor/editor_types";

export type ProjectStatus = "draft" | "in_purchase_list" | "ordered";

export type BadgeEditorState = {
  source_image_data_url: string | null;
  edited_image_data_url: string;
  thumbnail_data_url: string;
  stamps: Array<{
    id: string;
    asset_id: string;
    x: number;
    y: number;
    scale: number;
    rotation: number;
    flipped: boolean;
  }>;
  drawing_paths: Array<{
    id: string;
    color: string;
    width: number;
    opacity: number;
    points: number[];
    tool: "pen" | "eraser";
  }>;
  texts: Array<{
    id: string;
    value: string;
    font_family: string;
    font_size: number;
    color: string;
    outline_color: string;
    outline_width: number;
    bold: boolean;
    x: number;
    y: number;
    rotation: number;
  }>;
  frame_asset_id: string | null;
  layer_order: string[];
  zoom: number;
  rotation: number;
};

export type LocalBadgeProject = {
  project_id: string;
  local_project_code: string;
  design_name: string;
  editor_state: BadgeEditorState;
  editor_design?: BadgeDesign;
  thumbnail_data_url: string;
  share_image_data_url: string | null;
  created_at: string;
  updated_at: string;
  ordered: boolean;
};

export type PurchaseListItem = {
  project_id: string;
  quantity: number;
  added_at: string;
  updated_at: string;
};

export type PurchaseListEntry = PurchaseListItem & {
  project: LocalBadgeProject;
};

export type OrderHistoryItem = {
  local_project_code: string;
  thumbnail_data_url: string;
  quantity: number;
};

export type OrderHistoryEntry = {
  order_id: string;
  reception_number: string;
  ordered_at: string;
  total_quantity: number;
  unit_price_yen?: number | null;
  total_price_yen?: number | null;
  items: OrderHistoryItem[];
};

export type ProjectDraftInput = {
  design_name?: string;
  editor_state?: Partial<BadgeEditorState>;
  editor_design?: BadgeDesign;
  thumbnail_data_url?: string;
};

export const design_name_max_length = 50;

export const default_design_name = (local_project_code: string) =>
  `デザイン ${local_project_code}`;

export const validate_design_name = (value: string) => {
  const design_name = value.trim();

  if (design_name.length === 0) {
    throw new Error("デザイン名を入力してください。");
  }

  if (Array.from(design_name).length > design_name_max_length) {
    throw new Error(
      `デザイン名は${design_name_max_length}文字以内で入力してください。`,
    );
  }

  return design_name;
};

export const project_with_design_name = (
  project: Omit<LocalBadgeProject, "design_name"> & {
    design_name?: string;
  },
): LocalBadgeProject => {
  let design_name = default_design_name(project.local_project_code);

  if (typeof project.design_name === "string") {
    try {
      design_name = validate_design_name(project.design_name);
    } catch {
      // Records created before design names existed receive the safe default.
    }
  }

  return { ...project, design_name };
};
