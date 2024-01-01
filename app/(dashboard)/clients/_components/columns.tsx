"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export type Columns = {
  id: string;
  name: string;
  email: string;
  projects: string;
  country: string;
  referralSource: string;
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "projects",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Projects" />
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "referralSource",
    header: "Referral Source",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
