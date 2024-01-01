"use client";

import { Button } from "@/components/ui/button";
import { useProjectModal } from "@/hooks/use-project-modal";
import { Plus } from "lucide-react";

export const ProjectModalButton = () => {
  const { onOpen } = useProjectModal();

  return (
    <Button
      onClick={() => onOpen("Add")}
      variant="outline"
      className="w-full text-center md:w-fit md:text-start mt-6"
    >
      <Plus size={16} className="mr-2" />
      Add project
    </Button>
  );
};
