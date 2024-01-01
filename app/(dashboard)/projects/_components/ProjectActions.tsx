"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useProjectModal } from "@/hooks/use-project-modal";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface ProjectActionsProps {
  project: Project;
}

export const ProjectActions = ({ project }: ProjectActionsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useDeleteModal();
  const { onOpen: updateModalOpen } = useProjectModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="rounded-full" variant="outline" size="icon">
          <HiOutlineDotsVertical size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => updateModalOpen("Update", project)}
        >
          Edit Project
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => onOpen(project.id, "project")}
        >
          Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
