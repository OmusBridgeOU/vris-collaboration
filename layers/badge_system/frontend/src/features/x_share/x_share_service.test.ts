import { create_memory_project_storage } from "../../indexed_db/memory_project_storage";
import {
  build_x_intent_url,
  build_x_share_text,
  create_share_file_name,
  create_project_share_image,
} from "./x_share_service";
import { render_share_image } from "../editor/editor_renderer";
import { create_empty_design } from "../editor/editor_state";

vi.mock("../editor/editor_renderer", () => ({
  render_share_image: vi.fn(),
}));

describe("x share service", () => {
  it("builds configured post text with hashtags", () => {
    expect(
      build_x_share_text({
        xShareText: "VRISでオリジナル缶バッジを作りました！",
        xHashtags: ["VRIS", "#VRISオリジナル缶バッジ"],
      }),
    ).toBe(
      "VRISでオリジナル缶バッジを作りました！\n#VRIS #VRISオリジナル缶バッジ",
    );
  });

  it("encodes the X intent URL", () => {
    const url = build_x_intent_url({
      xShareText: "テスト投稿",
      xHashtags: ["VRIS"],
    });

    expect(url).toContain("https://twitter.com/intent/tweet?text=");
    expect(decodeURIComponent(url)).toContain("テスト投稿");
    expect(decodeURIComponent(url)).toContain("#VRIS");
  });

  it("creates the specified share image filename", async () => {
    const storage = create_memory_project_storage();
    const project = await storage.create_project();

    expect(
      create_share_file_name(project, new Date("2026-06-22T12:34:56.000Z")),
    ).toBe("vris-badge-001-20260622T123456Z.jpg");
  });

  it("renders the 58mm visitor image from editable design data", async () => {
    const storage = create_memory_project_storage();
    const project = await storage.create_project({
      editor_design: create_empty_design("001"),
    });
    vi.mocked(render_share_image).mockResolvedValueOnce(
      "data:image/jpeg;base64,finish-58mm",
    );

    await expect(create_project_share_image(project)).resolves.toBe(
      "data:image/jpeg;base64,finish-58mm",
    );
    expect(render_share_image).toHaveBeenCalledWith(project.editor_design);
  });
});
