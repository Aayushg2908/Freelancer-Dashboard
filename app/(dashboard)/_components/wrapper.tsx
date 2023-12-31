"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export const DashboardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isOpen } = useSidebar();

  return (
    <div className={cn(isOpen ? "lg:ml-[250px]" : "lg:ml-[91px]")}>
      {children}
    </div>
  );
};
