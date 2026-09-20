import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { create_memory_project_storage } from "../../indexed_db/memory_project_storage";
import { ProjectList } from "./project_list";

describe("ProjectList", () => {
  it("shows only the numeric identifier without rename controls", async () => {
    const storage = create_memory_project_storage();
    const project = await storage.create_project({ design_name: "夏祭り" });

    render(
      <ProjectList
        on_add_to_purchase_list={vi.fn()}
        on_create_project={vi.fn()}
        on_delete_project={vi.fn()}
        on_duplicate_project={vi.fn()}
        on_edit_project={vi.fn()}
        on_open_credits={vi.fn()}
        on_open_purchase_list={vi.fn()}
        on_open_x_share={vi.fn()}
        on_save_image={vi.fn()}
        projects={[project]}
        purchase_project_ids={new Set()}
      />,
    );

    expect(screen.getByRole("heading", { name: "001" })).toBeVisible();
    expect(screen.queryByText("夏祭り")).not.toBeInTheDocument();
    expect(screen.queryByText(/管理コード/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "名前を変更" }),
    ).not.toBeInTheDocument();
  });
});
