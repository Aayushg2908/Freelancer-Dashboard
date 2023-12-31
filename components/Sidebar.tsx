"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  HiOutlineArrowLeftOnRectangle,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import { SidebarLinks } from "@/constants/sidebar";
import { SidebarLink } from "./SidebarLink";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const router = useRouter();

  return (
    <aside
      className={cn(
        "z-30 hidden lg:flex flex-col h-screen px-[20px] border-r fixed top-0 py-5 p-4 shadow-lg",
        isOpen ? "w-[250px]" : "w-[90px]"
      )}
    >
      <Link
        className="block text-center font-bold text-3xl tracking-tighter"
        href="/"
      >
        FD
      </Link>
      <div
        onClick={() => toggleSidebar()}
        className="absolute h-[25px] w-[30px] cursor-pointer bg-slate-100 dark:bg-neutral-800 flex items-center justify-center rounded-md top-6 -right-4"
      >
        {isOpen ? (
          <HiOutlineArrowLeftOnRectangle size={17} />
        ) : (
          <HiMiniArrowRightOnRectangle size={15} />
        )}
      </div>
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
    </aside>
  );
};
