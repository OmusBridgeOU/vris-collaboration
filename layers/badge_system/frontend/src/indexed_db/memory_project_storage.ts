import {
  create_empty_editor_state,
  type ProjectStorage,
} from "./project_database";
import {
  default_design_name,
  project_with_design_name,
  validate_design_name,
} from "../features/projects/project_types";
import type {
  LocalBadgeProject,
  ProjectDraftInput,
  PurchaseListEntry,
  PurchaseListItem,
} from "../features/projects/project_types";

const now_iso = () => new Date().toISOString();

const code_for = (value: number) => value.toString().padStart(3, "0");

export const create_memory_project_storage = (): ProjectStorage => {
  const projects = new Map<string, LocalBadgeProject>();
  const purchase_list = new Map<string, PurchaseListItem>();
  let next_project_number = 1;

  const create_code = () => {
    let code = code_for(next_project_number);
    const existing_codes = new Set(
      Array.from(projects.values()).map(
        (project) => project.local_project_code,
      ),
    );

    while (existing_codes.has(code)) {
      next_project_number += 1;
      code = code_for(next_project_number);
    }

    next_project_number += 1;
    return code;
  };

  const get_project_or_throw = (project_id: string) => {
    const project = projects.get(project_id);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  };

  const purchase_entry = (item: PurchaseListItem): PurchaseListEntry => ({
    project: project_with_design_name(get_project_or_throw(item.project_id)),
    ...item,
  });

  return {
    async list_projects() {
      return Array.from(projects.values())
        .map(project_with_design_name)
        .sort((left, right) => right.updated_at.localeCompare(left.updated_at));
    },

    async get_project(project_id) {
      const project = projects.get(project_id);
      return project ? project_with_design_name(project) : undefined;
    },

    async create_project(input: ProjectDraftInput = {}) {
      const local_project_code = create_code();
      const timestamp = now_iso();
      const editor_state = create_empty_editor_state(local_project_code, input);
      const project: LocalBadgeProject = {
        project_id: `project-${local_project_code}`,
        local_project_code,
        design_name:
          input.design_name === undefined
            ? default_design_name(local_project_code)
            : validate_design_name(input.design_name),
        editor_state,
        editor_design: input.editor_design,
        thumbnail_data_url: editor_state.thumbnail_data_url,
        share_image_data_url: null,
        created_at: timestamp,
        updated_at: timestamp,
        ordered: false,
      };

      projects.set(project.project_id, project);

      return project;
    },

    async save_project(project) {
      const updated_project = {
        ...project,
        design_name: validate_design_name(project.design_name),
        thumbnail_data_url: project.editor_state.thumbnail_data_url,
        updated_at: now_iso(),
      };

      projects.set(project.project_id, updated_project);

      return updated_project;
    },

    async duplicate_project(project_id) {
      const source_project = get_project_or_throw(project_id);
      const local_project_code = create_code();
      const timestamp = now_iso();
      const editor_state = create_empty_editor_state(local_project_code, {
        editor_state: source_project.editor_state,
      });
      const editor_design = source_project.editor_design
        ? JSON.parse(JSON.stringify(source_project.editor_design))
        : undefined;
      if (editor_design) {
        editor_design.project_id = `project-${local_project_code}`;
        editor_design.local_project_code = local_project_code;
        editor_design.created_at = timestamp;
        editor_design.updated_at = timestamp;
        editor_design.ordered = false;
      }
      const duplicate: LocalBadgeProject = {
        ...source_project,
        project_id: `project-${local_project_code}`,
        local_project_code,
        design_name:
          project_with_design_name(source_project).design_name ===
          default_design_name(source_project.local_project_code)
            ? default_design_name(local_project_code)
            : project_with_design_name(source_project).design_name,
        editor_state,
        editor_design,
        thumbnail_data_url: editor_state.thumbnail_data_url,
        share_image_data_url: null,
        created_at: timestamp,
        updated_at: timestamp,
        ordered: false,
      };

      projects.set(duplicate.project_id, duplicate);

      return duplicate;
    },

    async delete_project(project_id) {
      projects.delete(project_id);
      purchase_list.delete(project_id);
    },

    async list_purchase_entries() {
      return Array.from(purchase_list.values())
        .sort((left, right) => left.added_at.localeCompare(right.added_at))
        .map(purchase_entry);
    },

    async add_to_purchase_list(project_id, max_items, max_quantity) {
      get_project_or_throw(project_id);
      const existing = purchase_list.get(project_id);
      if (!existing && purchase_list.size >= max_items) {
        return null;
      }

      const timestamp = now_iso();
      const item: PurchaseListItem = {
        project_id,
        quantity: existing ? Math.min(existing.quantity + 1, max_quantity) : 1,
        added_at: existing?.added_at ?? timestamp,
        updated_at: timestamp,
      };

      purchase_list.set(project_id, item);

      return purchase_entry(item);
    },

    async update_purchase_quantity(project_id, quantity, max_quantity) {
      get_project_or_throw(project_id);
      const existing = purchase_list.get(project_id);

      if (!existing) {
        throw new Error("Purchase list item not found");
      }

      const item = {
        ...existing,
        quantity: Math.min(Math.max(quantity, 1), max_quantity),
        updated_at: now_iso(),
      };

      purchase_list.set(project_id, item);

      return purchase_entry(item);
    },

    async remove_from_purchase_list(project_id) {
      purchase_list.delete(project_id);
    },
  };
};
