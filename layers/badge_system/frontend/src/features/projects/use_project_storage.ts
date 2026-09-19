import { useContext } from "react";
import { ProjectStorageContext } from "./project_storage_context_value";

export const useProjectStorage = () => useContext(ProjectStorageContext);
