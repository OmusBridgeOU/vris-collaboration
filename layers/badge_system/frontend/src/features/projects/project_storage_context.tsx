import type { ReactNode } from "react";
import {
  project_storage,
  type ProjectStorage,
} from "../../indexed_db/project_database";
import { ProjectStorageContext } from "./project_storage_context_value";

export function ProjectStorageProvider({
  children,
  storage = project_storage,
}: {
  children: ReactNode;
  storage?: ProjectStorage;
}) {
  return (
    <ProjectStorageContext.Provider value={storage}>
      {children}
    </ProjectStorageContext.Provider>
  );
}
