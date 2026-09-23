import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import {
  placeholder_badge_image,
  project_thumbnail,
} from "../features/projects/project_assets";
import {
  default_design_name,
  project_with_design_name,
  validate_design_name,
} from "../features/projects/project_types";
import type {
  BadgeEditorState,
  LocalBadgeProject,
  OrderHistoryEntry,
  ProjectDraftInput,
  PurchaseListEntry,
  PurchaseListItem,
} from "../features/projects/project_types";

const database_name = "vris_badge_project_storage";
const database_version = 4;
const project_store = "projects";
const purchase_list_store = "purchase_list";
const purchase_history_store = "purchase_history";
const metadata_store = "metadata";
const next_project_number_key = "next_project_number";

type MetadataValue = {
  key: string;
  value: number;
};

interface BadgeProjectDatabase extends DBSchema {
  projects: {
    key: string;
    value: LocalBadgeProject;
    indexes: {
      "by-local-code": string;
      "by-updated-at": string;
    };
  };
  purchase_list: {
    key: string;
    value: PurchaseListItem;
    indexes: {
      "by-updated-at": string;
    };
  };
  purchase_history: {
    key: string;
    value: OrderHistoryEntry;
    indexes: {
      "by-ordered-at": string;
    };
  };
  metadata: {
    key: string;
    value: MetadataValue;
  };
}

export type ProjectStorage = {
  list_projects: () => Promise<LocalBadgeProject[]>;
  get_project: (project_id: string) => Promise<LocalBadgeProject | undefined>;
  create_project: (input?: ProjectDraftInput) => Promise<LocalBadgeProject>;
  save_project: (project: LocalBadgeProject) => Promise<LocalBadgeProject>;
  duplicate_project: (project_id: string) => Promise<LocalBadgeProject>;
  delete_project: (project_id: string) => Promise<void>;
  list_purchase_entries: () => Promise<PurchaseListEntry[]>;
  add_to_purchase_list: (
    project_id: string,
    max_items: number,
    max_quantity: number,
  ) => Promise<PurchaseListEntry | null>;
  update_purchase_quantity: (
    project_id: string,
    quantity: number,
    max_quantity: number,
  ) => Promise<PurchaseListEntry>;
  remove_from_purchase_list: (project_id: string) => Promise<void>;
  list_order_history: () => Promise<OrderHistoryEntry[]>;
  save_order_history: (order: OrderHistoryEntry) => Promise<void>;
};

let database_promise: Promise<IDBPDatabase<BadgeProjectDatabase>> | null = null;

const open_project_database = () => {
  database_promise ??= openDB<BadgeProjectDatabase>(
    database_name,
    database_version,
    {
      upgrade(database, old_version) {
        if (old_version < 1) {
          const projects = database.createObjectStore(project_store, {
            keyPath: "project_id",
          });
          projects.createIndex("by-local-code", "local_project_code", {
            unique: true,
          });
          projects.createIndex("by-updated-at", "updated_at");

          const purchase_list = database.createObjectStore(
            purchase_list_store,
            {
              keyPath: "project_id",
            },
          );
          purchase_list.createIndex("by-updated-at", "updated_at");

          database.createObjectStore(metadata_store, { keyPath: "key" });
        }

        if (
          old_version < 3 &&
          database.objectStoreNames.contains(purchase_history_store)
        ) {
          database.deleteObjectStore(purchase_history_store);
        }

        if (
          old_version < 4 &&
          !database.objectStoreNames.contains(purchase_history_store)
        ) {
          const purchase_history = database.createObjectStore(
            purchase_history_store,
            { keyPath: "order_id" },
          );
          purchase_history.createIndex("by-ordered-at", "ordered_at");
        }
      },
    },
  );

  return database_promise;
};

const now_iso = () => new Date().toISOString();

const create_project_id = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const format_local_project_code = (value: number) =>
  value.toString().padStart(3, "0");

const clone_editor_design = (project: LocalBadgeProject) =>
  project.editor_design
    ? JSON.parse(JSON.stringify(project.editor_design))
    : undefined;

const normalize_stored_project = (project: LocalBadgeProject) =>
  project_with_design_name(project);

const persist_normalized_projects = async (
  database: IDBPDatabase<BadgeProjectDatabase>,
  projects: LocalBadgeProject[],
) => {
  const normalized_projects = projects.map(normalize_stored_project);
  const changed_projects = normalized_projects.filter(
    (project, index) => project.design_name !== projects[index].design_name,
  );

  if (changed_projects.length > 0) {
    const transaction = database.transaction(project_store, "readwrite");
    await Promise.all(
      changed_projects.map((project) =>
        transaction.objectStore(project_store).put(project),
      ),
    );
    await transaction.done;
  }

  return normalized_projects;
};

export const create_empty_editor_state = (
  local_project_code: string,
  input: ProjectDraftInput = {},
): BadgeEditorState => {
  const edited_image_data_url =
    input.editor_state?.edited_image_data_url ??
    placeholder_badge_image(local_project_code);

  return {
    source_image_data_url: input.editor_state?.source_image_data_url ?? null,
    edited_image_data_url,
    thumbnail_data_url:
      input.editor_state?.thumbnail_data_url ??
      input.thumbnail_data_url ??
      project_thumbnail(local_project_code),
    stamps: input.editor_state?.stamps ?? [],
    drawing_paths: input.editor_state?.drawing_paths ?? [],
    texts: input.editor_state?.texts ?? [],
    frame_asset_id: input.editor_state?.frame_asset_id ?? null,
    layer_order: input.editor_state?.layer_order ?? [],
    zoom: input.editor_state?.zoom ?? 1,
    rotation: input.editor_state?.rotation ?? 0,
  };
};

const get_next_code = async (
  database: IDBPDatabase<BadgeProjectDatabase>,
  store_names: Array<typeof project_store | typeof metadata_store>,
) => {
  const transaction = database.transaction(store_names, "readwrite");
  const metadata = transaction.objectStore(metadata_store);
  const projects = transaction.objectStore(project_store);
  const current = await metadata.get(next_project_number_key);
  let next_project_number = current?.value ?? 1;
  let local_project_code = format_local_project_code(next_project_number);

  while (await projects.index("by-local-code").getKey(local_project_code)) {
    next_project_number += 1;
    local_project_code = format_local_project_code(next_project_number);
  }

  await metadata.put({
    key: next_project_number_key,
    value: next_project_number + 1,
  });
  await transaction.done;

  return local_project_code;
};

const mark_purchase_status = (
  project: LocalBadgeProject,
  purchase_item?: PurchaseListItem,
) => ({
  ...project,
  ordered: project.ordered,
  status: project.ordered
    ? "ordered"
    : purchase_item
      ? "in_purchase_list"
      : "draft",
});

export const create_indexed_db_project_storage = (): ProjectStorage => ({
  async list_projects() {
    const database = await open_project_database();
    const projects = await database.getAllFromIndex(
      project_store,
      "by-updated-at",
    );

    const normalized_projects = await persist_normalized_projects(
      database,
      projects,
    );

    return normalized_projects.sort((left, right) =>
      right.updated_at.localeCompare(left.updated_at),
    );
  },

  async get_project(project_id) {
    const database = await open_project_database();
    const project = await database.get(project_store, project_id);
    if (!project) {
      return undefined;
    }

    return (await persist_normalized_projects(database, [project]))[0];
  },

  async create_project(input = {}) {
    const database = await open_project_database();
    const local_project_code = await get_next_code(database, [
      project_store,
      metadata_store,
    ]);
    const timestamp = now_iso();
    const editor_state = create_empty_editor_state(local_project_code, input);
    const project: LocalBadgeProject = {
      project_id: create_project_id(),
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

    await database.put(project_store, project);

    return project;
  },

  async save_project(project) {
    const database = await open_project_database();
    const updated_project = {
      ...project,
      design_name: validate_design_name(project.design_name),
      thumbnail_data_url: project.editor_state.thumbnail_data_url,
      updated_at: now_iso(),
    };

    await database.put(project_store, updated_project);

    return updated_project;
  },

  async duplicate_project(project_id) {
    const database = await open_project_database();
    const source_project = await database.get(project_store, project_id);

    if (!source_project) {
      throw new Error("Project not found");
    }

    const local_project_code = await get_next_code(database, [
      project_store,
      metadata_store,
    ]);
    const timestamp = now_iso();
    const duplicate_project_id = create_project_id();
    const editor_state = { ...source_project.editor_state };
    const editor_design = clone_editor_design(source_project);
    if (editor_design) {
      editor_design.project_id = duplicate_project_id;
      editor_design.local_project_code = local_project_code;
      editor_design.created_at = timestamp;
      editor_design.updated_at = timestamp;
      editor_design.ordered = false;
    }
    const duplicate: LocalBadgeProject = {
      ...source_project,
      project_id: duplicate_project_id,
      local_project_code,
      design_name:
        normalize_stored_project(source_project).design_name ===
        default_design_name(source_project.local_project_code)
          ? default_design_name(local_project_code)
          : normalize_stored_project(source_project).design_name,
      editor_state,
      editor_design,
      thumbnail_data_url: editor_state.thumbnail_data_url,
      share_image_data_url: null,
      created_at: timestamp,
      updated_at: timestamp,
      ordered: false,
    };

    await database.put(project_store, duplicate);

    return duplicate;
  },

  async delete_project(project_id) {
    const database = await open_project_database();
    const transaction = database.transaction(
      [project_store, purchase_list_store],
      "readwrite",
    );

    await Promise.all([
      transaction.objectStore(project_store).delete(project_id),
      transaction.objectStore(purchase_list_store).delete(project_id),
    ]);
    await transaction.done;
  },

  async list_purchase_entries() {
    const database = await open_project_database();
    const [stored_projects, items] = await Promise.all([
      database.getAll(project_store),
      database.getAllFromIndex(purchase_list_store, "by-updated-at"),
    ]);
    const projects = await persist_normalized_projects(
      database,
      stored_projects,
    );
    const projects_by_id = new Map(
      projects.map((project) => [project.project_id, project]),
    );

    return items
      .sort((left, right) => left.added_at.localeCompare(right.added_at))
      .flatMap((item) => {
        const project = projects_by_id.get(item.project_id);
        return project ? [{ project, ...item }] : [];
      });
  },

  async add_to_purchase_list(project_id, max_items, max_quantity) {
    const database = await open_project_database();
    const transaction = database.transaction(
      [project_store, purchase_list_store],
      "readwrite",
    );
    const projects = transaction.objectStore(project_store);
    const purchase_list = transaction.objectStore(purchase_list_store);
    const project = await projects.get(project_id);

    if (!project) {
      await transaction.done;
      throw new Error("Project not found");
    }

    const existing = await purchase_list.get(project_id);
    if (!existing && (await purchase_list.count()) >= max_items) {
      await transaction.done;
      return null;
    }

    const timestamp = now_iso();
    const item: PurchaseListItem = {
      project_id,
      quantity: existing ? Math.min(existing.quantity + 1, max_quantity) : 1,
      added_at: existing?.added_at ?? timestamp,
      updated_at: timestamp,
    };

    await purchase_list.put(item);
    await transaction.done;

    return {
      project: mark_purchase_status(project, item),
      ...item,
    };
  },

  async update_purchase_quantity(project_id, quantity, max_quantity) {
    const database = await open_project_database();
    const [project, existing] = await Promise.all([
      database.get(project_store, project_id),
      database.get(purchase_list_store, project_id),
    ]);

    if (!project || !existing) {
      throw new Error("Purchase list item not found");
    }

    const item: PurchaseListItem = {
      ...existing,
      quantity: Math.min(Math.max(quantity, 1), max_quantity),
      updated_at: now_iso(),
    };

    await database.put(purchase_list_store, item);

    return {
      project: mark_purchase_status(project, item),
      ...item,
    };
  },

  async remove_from_purchase_list(project_id) {
    const database = await open_project_database();
    await database.delete(purchase_list_store, project_id);
  },

  async list_order_history() {
    const database = await open_project_database();
    const orders = await database.getAllFromIndex(
      purchase_history_store,
      "by-ordered-at",
    );
    return orders.sort((left, right) =>
      right.ordered_at.localeCompare(left.ordered_at),
    );
  },

  async save_order_history(order) {
    const database = await open_project_database();
    await database.put(purchase_history_store, order);
  },
});

export const project_storage = create_indexed_db_project_storage();
