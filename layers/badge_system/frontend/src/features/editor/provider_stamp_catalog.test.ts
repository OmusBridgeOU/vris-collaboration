import { create_provider_stamp_catalog } from "./provider_stamp_catalog";

describe("create_provider_stamp_catalog", () => {
  it("creates a stamp and its credit from a provider PNG", () => {
    const result = create_provider_stamp_catalog(
      { "../../assets/stamps/sample_stamp.png": "/assets/sample.png" },
      {
        "sample_stamp.png": {
          label: "サンプル",
          creator: "制作者",
          license: "許諾済み",
          source_url: "https://example.com/source",
        },
      },
    );

    expect(result).toEqual([
      {
        catalog_item: {
          id: "provider_sample_stamp",
          label: "サンプル",
          category: "provider",
          color: "transparent",
          image_url: "/assets/sample.png",
        },
        credit: {
          file_name: "sample_stamp.png",
          image_url: "/assets/sample.png",
          label: "サンプル",
          creator: "制作者",
          license: "許諾済み",
          source_url: "https://example.com/source",
        },
      },
    ]);
  });
});
