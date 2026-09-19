import type { BadgeDesign } from "../editor/editor_types";

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

export type ProjectDraftInput = {
  editor_state?: Partial<BadgeEditorState>;
  editor_design?: BadgeDesign;
  thumbnail_data_url?: string;
};

// Strip only retired metadata; retain all existing design and purchase data.
export function strip_legacy_project_fields(
  project: LocalBadgeProject,
): LocalBadgeProject {
  const cleaned: LocalBadgeProject & { design_name?: unknown } = { ...project };
  delete cleaned.design_name;
  return cleaned;
}
