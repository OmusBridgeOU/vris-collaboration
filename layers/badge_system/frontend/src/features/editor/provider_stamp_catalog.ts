import stamp_credits from "../../assets/stamps/credits.json";
import type { StampCatalogItem } from "./editor_types";

export type ProviderStampCredit = {
  file_name: string;
  image_url: string;
  label: string;
  creator: string;
  license: string;
  source_url?: string;
};

type StampCreditMetadata = {
  label?: string;
  creator?: string;
  license?: string;
  source_url?: string;
};

export function create_provider_stamp_catalog(
  stamp_files: Record<string, string>,
  credits: Record<string, StampCreditMetadata>,
) {
  return Object.entries(stamp_files)
    .map(([path, image_url]) => {
      const file_name = path.split("/").at(-1) ?? path;
      const metadata = credits[file_name] ?? {};
      const label = metadata.label ?? file_name.replace(/\.png$/i, "");
      const credit: ProviderStampCredit = {
        file_name,
        image_url,
        label,
        creator: metadata.creator ?? "未登録",
        license: metadata.license ?? "未登録",
        source_url: metadata.source_url,
      };
      const catalog_item: StampCatalogItem = {
        id: `provider_${file_name.replace(/\.png$/i, "")}`,
        label,
        category: "provider",
        color: "transparent",
        image_url,
      };
      return { catalog_item, credit };
    })
    .sort((left, right) =>
      left.credit.file_name.localeCompare(right.credit.file_name),
    );
}

const stamp_files = import.meta.glob("../../assets/stamps/*.png", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const provider_stamps = create_provider_stamp_catalog(
  stamp_files,
  stamp_credits,
);

export const provider_stamp_catalog = provider_stamps.map(
  ({ catalog_item }) => catalog_item,
);

export const provider_stamp_credits = provider_stamps.map(
  ({ credit }) => credit,
);
