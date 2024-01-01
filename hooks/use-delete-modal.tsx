import { create } from "zustand";

interface DeleteModalState {
  id: string;
  type: string;
  isOpen: boolean;
  onOpen: (id: string, type: string) => void;
  onClose: () => void;
}

export const useDeleteModal = create<DeleteModalState>((set) => ({
  id: "",
  type: "",
  isOpen: false,
  onOpen: (id, type) => set(() => ({ isOpen: true, id, type })),
  onClose: () => set(() => ({ isOpen: false, type: "" })),
}));
