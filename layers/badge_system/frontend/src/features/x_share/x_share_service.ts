import type { LocalBadgeProject } from "../projects/project_types";
import { render_share_image } from "../editor/editor_renderer";

export type XShareConfig = {
  xShareText: string;
  xHashtags: string[];
};

export const build_x_share_text = (config: XShareConfig) => {
  const hashtags = config.xHashtags
    .map((hashtag) => hashtag.replace(/^#/, "").trim())
    .filter(Boolean)
    .map((hashtag) => `#${hashtag}`)
    .join(" ");

  return [config.xShareText.trim(), hashtags].filter(Boolean).join("\n");
};

export const build_x_intent_url = (config: XShareConfig) =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    build_x_share_text(config),
  )}`;

export const create_share_file_name = (
  project: LocalBadgeProject,
  timestamp = new Date(),
) => {
  const formatted_timestamp = timestamp
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  return `vris-badge-${project.local_project_code}-${formatted_timestamp}.jpg`;
};

export const download_data_url = (
  data_url: string,
  file_name: string,
  document_ref: Document = document,
) => {
  const anchor = document_ref.createElement("a");
  anchor.href = data_url;
  anchor.download = file_name;
  document_ref.body.append(anchor);
  anchor.click();
  anchor.remove();
};

export const create_project_share_image = async (
  project: LocalBadgeProject,
): Promise<string> => {
  if (project.share_image_data_url) {
    return project.share_image_data_url;
  }

  if (project.editor_design) {
    return render_share_image(project.editor_design);
  }

  return project.editor_state.edited_image_data_url;
};
