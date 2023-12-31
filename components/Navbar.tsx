import Link from "next/link";
import { SearchCommand } from "./SearchCommand";
import { ModeToggle } from "./ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { MobileNav } from "./MobileNav";

export const Navbar = () => {
  return (
    <nav className="px-4 lg:px-6 border-b z-20 sticky top-0 py-4">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-x-2">
          <Link
            className="lg:hidden ml-2 font-bold text-3xl tracking-tighter"
            href="/"
          >
            FD
          </Link>
          <SearchCommand />
        </div>
        <div className="flex items-center gap-4">
          <MobileNav />
          <ModeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </nav>
  );
};
