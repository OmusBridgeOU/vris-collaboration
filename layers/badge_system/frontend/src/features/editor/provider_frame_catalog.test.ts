import { create_provider_frame_catalog } from "./provider_frame_catalog";

describe("create_provider_frame_catalog", () => {
  it("creates a frame from a provider PNG", () => {
    expect(
      create_provider_frame_catalog({
        "../../assets/frames/sample_frame.png": "/assets/sample.png",
      }),
    ).toEqual([
      {
        id: "provider_frame_sample_frame",
        label: "sample_frame",
        color: "transparent",
        image_url: "/assets/sample.png",
      },
    ]);
  });
});
