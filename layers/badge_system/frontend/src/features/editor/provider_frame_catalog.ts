import frame_credits from "../../assets/frames/credits.json";
import type { FrameCatalogItem } from "./editor_types";

export type ProviderFrameCredit = {
  file_name: string;
  image_url: string;
  creator: string;
  source_url?: string;
};

type FrameCreditMetadata = {
  creator?: string;
  source_url?: string;
};

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

export const provider_frame_credits = Object.entries(frame_files)
  .map(([path, image_url]) => {
    const file_name = path.split("/").at(-1) ?? path;
    const metadata = (frame_credits as Record<string, FrameCreditMetadata>)[
      file_name
    ];

    return {
      file_name,
      image_url,
      creator: metadata?.creator ?? "未登録",
      source_url: metadata?.source_url,
    } satisfies ProviderFrameCredit;
  })
  .sort((left, right) => left.file_name.localeCompare(right.file_name));
