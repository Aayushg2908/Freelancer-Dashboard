import { create } from "zustand";

interface TaskModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTaskModal = create<TaskModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
