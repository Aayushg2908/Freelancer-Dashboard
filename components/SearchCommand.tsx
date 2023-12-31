"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BsFileEarmarkCode } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { LuKanbanSquare } from "react-icons/lu";
import { useRouter } from "next/navigation";

export const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        className="ml-4 hidden gap-x-5 md:flex rounded-sm text-neutral-600 dark:text-neutral-400"
        onClick={() => setOpen(true)}
        variant="outline"
      >
        <span className="text-xs">Search In Dashboard...</span>
        <span className="leading-none flex items-center bg-slate-50 dark:bg-neutral-800 p-1 rounded-sm border dark:border-neutral-700/60">
          <span className="text-[10px] mr-[1px]">⌘</span>k
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem className="mt-2" onSelect={() => navigate("/")}>
              <div className="cursor-pointer w-full flex items-center gap-x-3">
                <AiOutlineHome className="text-[16px]" /> Home
              </div>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/kanban")}>
              <div className="cursor-pointer w-full flex items-center gap-x-3">
                <LuKanbanSquare className="text-[16px]" /> Kanban
              </div>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/calendar")}>
              <div className="cursor-pointer w-full flex items-center gap-x-3">
                <AiOutlineCalendar className="text-[16px]" /> Calendar
              </div>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/clients")}>
              <div className="cursor-pointer w-full flex items-center gap-x-3">
                <BsPeople className="text-[16px]" /> Clients
              </div>
            </CommandItem>
            <CommandItem
              className="mb-1"
              onSelect={() => navigate("/projects")}
            >
              <div className="cursor-pointer w-full flex items-center gap-x-3">
                <BsFileEarmarkCode className="text-[16px]" /> Projects
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
