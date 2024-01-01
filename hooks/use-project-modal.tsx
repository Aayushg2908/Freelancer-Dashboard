import { Project } from "@prisma/client";
import { create } from "zustand";

interface ProjectModalState {
  project?: Project;
  type: string;
  isOpen: boolean;
  onOpen: (type: string, project?: Project) => void;
  onClose: () => void;
}

export const useProjectModal = create<ProjectModalState>((set) => ({
  project: undefined,
  type: "",
  isOpen: false,
  onOpen: (type, project) => set(() => ({ isOpen: true, project, type })),
  onClose: () => set(() => ({ isOpen: false, project: undefined, type: "" })),
}));
