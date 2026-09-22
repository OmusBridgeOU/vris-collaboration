import { useEffect, useRef, useState } from "react";
import type { ProjectStorage } from "../../indexed_db/project_database";
import type { LocalBadgeProject } from "./project_types";

export const useAutoSaveProject = (
  project: LocalBadgeProject | null,
  storage: ProjectStorage,
  delay_ms = 500,
) => {
  const [save_state, set_save_state] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const last_saved_project = useRef<LocalBadgeProject | null>(null);

  useEffect(() => {
    if (!project || last_saved_project.current === project) {
      return;
    }

    const timeout_id = window.setTimeout(() => {
      set_save_state("saving");
      void storage.save_project(project).then((saved_project) => {
        last_saved_project.current = saved_project;
        set_save_state("saved");
      });
    }, delay_ms);

    return () => {
      window.clearTimeout(timeout_id);
    };
  }, [delay_ms, project, storage]);

  useEffect(() => {
    if (!project) {
      return;
    }

    const save_before_page_hide = () => {
      void storage.save_project(project);
    };

    window.addEventListener("pagehide", save_before_page_hide);

    return () => window.removeEventListener("pagehide", save_before_page_hide);
  }, [project, storage]);

  return save_state;
};
