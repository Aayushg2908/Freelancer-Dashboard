"use client";

import { deleteProject } from "@/actions/projects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteModal = () => {
  const [loading, setLoading] = useState(false);
  const { id, type, isOpen, onClose } = useDeleteModal();

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (type === "project") {
        await deleteProject(id);
        toast.success("Project deleted successfully");
      } else {
        toast.error("Invalid type");
      }
      onClose();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently delete your
            {type}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
