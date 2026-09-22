import type { FrameCatalogItem } from "./editor_types";

export function create_provider_frame_catalog(
  frame_files: Record<string, string>,
): FrameCatalogItem[] {
  return Object.entries(frame_files)
    .map(([path, image_url]) => {
      const file_name = path.split("/").at(-1) ?? path;
      const name = file_name.replace(/\.png$/i, "");

      return {
        id: `provider_frame_${name}`,
        label: name,
        color: "transparent",
        image_url,
      };
    })
    .sort((left, right) => left.id.localeCompare(right.id));
}

const frame_files = import.meta.glob("../../assets/frames/*.png", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

export const provider_frame_catalog =
  create_provider_frame_catalog(frame_files);
