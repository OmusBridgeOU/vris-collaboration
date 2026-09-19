import { create_memory_project_storage } from "./memory_project_storage";
import { strip_legacy_project_fields } from "../features/projects/project_types";

describe("project storage", () => {
  it("assigns unique numeric local project codes", async () => {
    const storage = create_memory_project_storage();

    const first_project = await storage.create_project();
    const second_project = await storage.create_project();

    expect(first_project.local_project_code).toBe("001");
    expect(second_project.local_project_code).toBe("002");
  });

  it("removes legacy names without losing artwork, identifiers or purchase quantities", async () => {
    const storage = create_memory_project_storage();
    const project = await storage.create_project();
    await storage.add_to_purchase_list(project.project_id, 20, 10);
    const legacy = { ...project, design_name: "legacy title" };
    const cleaned = strip_legacy_project_fields(legacy);
    expect(cleaned).not.toHaveProperty("design_name");
    expect(cleaned).toEqual(project);
    await storage.save_project(legacy);
    expect(await storage.get_project(project.project_id)).not.toHaveProperty(
      "design_name",
    );
    expect((await storage.list_purchase_entries())[0].quantity).toBe(1);
    expect(
      (await storage.duplicate_project(project.project_id)).editor_state,
    ).toEqual(project.editor_state);
  });

  it("duplicates a project with a new code and without purchase state", async () => {
    const storage = create_memory_project_storage();
    const source_project = await storage.create_project({
      editor_state: {
        edited_image_data_url: "data:image/png;base64,source-artwork",
        thumbnail_data_url: "data:image/jpeg;base64,source-thumbnail",
        stamps: [
          {
            id: "stamp-1",
            asset_id: "star",
            x: 25,
            y: 30,
            scale: 1.2,
            rotation: 15,
            flipped: false,
          },
        ],
      },
    });
    await storage.add_to_purchase_list(source_project.project_id, 20, 10);

    const duplicate_project = await storage.duplicate_project(
      source_project.project_id,
    );
    const purchase_entries = await storage.list_purchase_entries();

    expect(duplicate_project.project_id).not.toBe(source_project.project_id);
    expect(duplicate_project.local_project_code).toBe("002");
    expect(duplicate_project.editor_state.edited_image_data_url).toBe(
      source_project.editor_state.edited_image_data_url,
    );
    expect(duplicate_project.thumbnail_data_url).toBe(
      source_project.thumbnail_data_url,
    );
    expect(duplicate_project.editor_state.stamps).toEqual(
      source_project.editor_state.stamps,
    );
    expect(duplicate_project.ordered).toBe(false);
    expect(
      purchase_entries.some(
        (entry) => entry.project_id === duplicate_project.project_id,
      ),
    ).toBe(false);
  });

  it("keeps one purchase row per project and clamps quantity", async () => {
    const storage = create_memory_project_storage();
    const project = await storage.create_project();

    await storage.add_to_purchase_list(project.project_id, 20, 2);
    await storage.add_to_purchase_list(project.project_id, 20, 2);
    await storage.add_to_purchase_list(project.project_id, 20, 2);

    const entries = await storage.list_purchase_entries();

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      project_id: project.project_id,
      quantity: 2,
    });
  });

  it("keeps the existing rows when the design limit is reached", async () => {
    const storage = create_memory_project_storage();
    const first_project = await storage.create_project();
    const second_project = await storage.create_project();

    await storage.add_to_purchase_list(first_project.project_id, 1, 10);
    const rejected_entry = await storage.add_to_purchase_list(
      second_project.project_id,
      1,
      10,
    );

    expect(rejected_entry).toBeNull();
    expect(await storage.list_purchase_entries()).toHaveLength(1);
    expect((await storage.list_purchase_entries())[0].project_id).toBe(
      first_project.project_id,
    );
  });

  it("removes deleted projects from the purchase list", async () => {
    const storage = create_memory_project_storage();
    const project = await storage.create_project();
    await storage.add_to_purchase_list(project.project_id, 20, 10);

    await storage.delete_project(project.project_id);

    expect(await storage.list_projects()).toHaveLength(0);
    expect(await storage.list_purchase_entries()).toHaveLength(0);
  });
});
