"use client";

import { Button } from "@/components/ui/button";
import { useClientModal } from "@/hooks/use-client-modal";
import { Plus } from "lucide-react";

export const ClientModalButton = () => {
  const { onOpen } = useClientModal();

  return (
    <Button
      onClick={() => onOpen("Add")}
      variant="outline"
      className="w-full text-center md:w-fit md:text-start mt-6"
    >
      <Plus size={16} className="mr-2" />
      Add Client
    </Button>
  );
};
