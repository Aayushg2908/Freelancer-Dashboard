import { AiOutlineHome } from "react-icons/ai";
import { LuKanbanSquare } from "react-icons/lu";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BsFileEarmarkCode } from "react-icons/bs";

export const SidebarLinks = [
  {
    title: "Home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    title: "Kanban",
    href: "/kanban",
    icon: LuKanbanSquare,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: AiOutlineCalendar,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: BsPeople,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: BsFileEarmarkCode,
  },
];
