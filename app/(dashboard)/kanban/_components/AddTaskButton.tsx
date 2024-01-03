"use client";

import { Button } from "@/components/ui/button";
import { useTaskModal } from "@/hooks/use-task-modal";
import { Plus } from "lucide-react";

export const AddTaskButton = () => {
  const { onOpen } = useTaskModal();

  return (
    <Button onClick={() => onOpen()} variant="outline" className="w-full mt-5">
      <Plus size={16} className="mr-2" />
      Add Task
    </Button>
  );
};
