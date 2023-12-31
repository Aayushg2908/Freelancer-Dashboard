"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TbMenu2 } from "react-icons/tb";
import { LuKanbanSquare } from "react-icons/lu";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BsFileEarmarkCode } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarLink } from "./SidebarLink";
import { SidebarLinks } from "@/constants/sidebar";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const { isOpen } = useSidebar();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <TbMenu2 className="text-[21px]" />
      </SheetTrigger>
      <SheetContent className="w-full flex flex-col !max-w-[300px]" side="left">
        <SheetHeader className="!text-center">
          <SheetTitle className="mt-6 text-2xl tracking-tight">
            NAVIGATION
          </SheetTitle>
        </SheetHeader>
        <div className="mt-10 flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-y-8">
            {SidebarLinks.map((link) => (
              <SidebarLink
                key={link.title}
                href={link.href}
                title={link.title}
                icon={link.icon}
                isOpen={isOpen}
              />
            ))}
          </div>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <Button
              className="flex items-center justify-center"
              variant="secondary"
            >
              <LogOut size={18} className={cn(isOpen && "mr-2")} />
              {isOpen && <span>Sign Out</span>}
            </Button>
          </SignOutButton>
        </div>
      </SheetContent>
    </Sheet>
  );
};
