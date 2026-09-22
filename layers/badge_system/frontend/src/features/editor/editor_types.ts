export type EditorTool = "photo" | "stamp" | "pen" | "text" | "frame";

export type PhotoLayer = {
  data_url: string;
  width: number;
  height: number;
  scale: number;
  rotation: number;
  x: number;
  y: number;
  low_resolution: boolean;
  quality_warning?: string;
};

export type StrokePoint = {
  x: number;
  y: number;
};

export type DrawingStroke = {
  id: string;
  mode: "pen" | "eraser";
  color: string;
  width: number;
  opacity: number;
  points: StrokePoint[];
};

export type StampLayer = {
  id: string;
  catalog_id: string;
  label: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  flipped: boolean;
  color: string;
};

export type TextLayer = {
  id: string;
  text: string;
  font_family: string;
  font_size: number;
  color: string;
  outline_color: string;
  outline_width: number;
  bold: boolean;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type FrameLayer = {
  catalog_id: string;
  label: string;
  color: string;
};

export type EditorElementKind = "photo" | "stamp" | "text";

export type EditorSelection =
  | { kind: "photo" }
  | { kind: "stamp"; id: string }
  | { kind: "text"; id: string };

export type BadgeDesign = {
  project_id: string;
  local_project_code: string;
  photo?: PhotoLayer;
  stamps: StampLayer[];
  drawing_strokes: DrawingStroke[];
  text_layers: TextLayer[];
  frame?: FrameLayer;
  layer_order: string[];
  created_at: string;
  updated_at: string;
  ordered: boolean;
  thumbnail_data_url?: string;
};

export type EditorSnapshot = BadgeDesign;

export type EditorHistory = {
  past: EditorSnapshot[];
  present: EditorSnapshot;
  future: EditorSnapshot[];
};

export type StampCatalogItem = {
  id: string;
  label: string;
  category: string;
  color: string;
  image_url?: string;
};

export type FrameCatalogItem = {
  id: string;
  label: string;
  color: string;
  image_url?: string;
};

export type FontCatalogItem = {
  id: string;
  label: string;
  font_family: string;
  fallback_stack: string;
};

export type ImageProcessingResult = {
  photo: PhotoLayer;
  thumbnail_data_url: string;
};
