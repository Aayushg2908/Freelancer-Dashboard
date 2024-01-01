import { Client as PrismaClient } from "@prisma/client";
import { create } from "zustand";

type ClientType = Pick<
  PrismaClient,
  "id" | "name" | "email" | "projects" | "country" | "referralSource"
>;

interface ClientModalState {
  client?: ClientType;
  type: string;
  isOpen: boolean;
  onOpen: (type: string, client?: ClientType) => void;
  onClose: () => void;
}

export const useClientModal = create<ClientModalState>((set) => ({
  client: undefined,
  type: "",
  isOpen: false,
  onOpen: (type, client) => set(() => ({ isOpen: true, client, type })),
  onClose: () => set(() => ({ isOpen: false, client: undefined, type: "" })),
}));
