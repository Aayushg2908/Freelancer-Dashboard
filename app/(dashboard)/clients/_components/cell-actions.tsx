"use client";

import { Button } from "@/components/ui/button";
import { Columns } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import { useClientModal } from "@/hooks/use-client-modal";

interface Props {
  data: Columns;
}

export const CellActions = ({ data }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { onOpen } = useDeleteModal();
  const { onOpen: updateClientOpen } = useClientModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.email);
    toast.success("Client's email copied to clipboard");
  };

  if (!mounted) return null;

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
        <DropdownMenuItem className="cursor-pointer" onClick={handleCopy}>
          Copy client&apos;s email
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => updateClientOpen("Update", data)}
        >
          Edit Client
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => onOpen(data.id, "client")}
        >
          Delete Client
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
