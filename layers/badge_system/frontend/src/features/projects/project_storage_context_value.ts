import { createContext } from "react";
import {
  project_storage,
  type ProjectStorage,
} from "../../indexed_db/project_database";

export const ProjectStorageContext =
  createContext<ProjectStorage>(project_storage);
