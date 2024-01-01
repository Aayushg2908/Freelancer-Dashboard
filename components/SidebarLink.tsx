"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  title: string;
  icon: any;
  isOpen?: boolean;
  isMobile?: boolean;
}

export const SidebarLink = ({
  href,
  title,
  icon: Icon,
  isOpen,
  isMobile,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "flex items-center p-2 rounded-md",
        isOpen && "pl-3",
        !isOpen && !isMobile && "justify-center",
        isActive && "bg-slate-100 dark:bg-neutral-800"
      )}
      href={href}
    >
      <Icon className="text-[18px]" />
      {(isMobile || isOpen) && (
        <span className="capitalize text-[16px] pl-5">{title}</span>
      )}
    </Link>
  );
};
