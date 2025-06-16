import React from "react";
import {
  BookOpen,
  BadgePercent,
  LayoutList,
  Lightbulb,
  Files,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TbEdit } from "react-icons/tb";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { PiUserCirclePlus } from "react-icons/pi";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const navItems: NavItem[] = [
  {
    id: "aiGhostwriter",
    label: "AI Ghostwriter",
    icon: <TbEdit size={18} className="text-gray-500" />,
  },
  {
    id: "safeSpace",
    label: "Safe space",
    icon: <RiShieldKeyholeLine size={18} className="text-gray-500" />,
  },
  {
    id: "contentLibrary",
    label: "Content Library",
    icon: <BookOpen size={18} className="text-gray-500" />,
  },
  {
    id: "brandIdentityKit",
    label: "Brand Identity Kit",
    icon: <BadgePercent size={18} className="text-[#6C68C0]" />,
  },
  {
    id: "myPosts",
    label: "My Posts",
    icon: <LayoutList size={18} className="text-gray-500" />,
  },
  {
    id: "contentIdeas",
    label: "Content Ideas",
    icon: <Lightbulb size={18} className="text-gray-500" />,
  },
  {
    id: "templatesLibrary",
    label: "Templates Library",
    icon: <Files size={18} className="text-gray-500" />,
  },
  {
    id: "videoCreation",
    label: "Video Creation",
    icon: <Video size={18} className="text-gray-500" />,
  },
  {
    id: "buildAiPersonas",
    label: "Build AI Personas",
    icon: <PiUserCirclePlus size={18} className="text-gray-500" />,
  },
];

interface SidebarProps {
  activeItemId: string;
  onItemClick: (itemId: string) => void;
  className?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar = ({
  activeItemId,
  onItemClick,
  className,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) => {
  return (
    <aside
      className={`
        h-fit bg-white shadow-sm rounded-2xl border-r 
        transition-all duration-300 ease-in-out flex flex-col
        ${isCollapsed ? "w-20 px-2 py-2.5" : "w-64 px-4 py-2.5 pb-6"}
        md:w-64 md:px-4 md:py-2.5 md:pb-6 
        ${className || ""}
      `}
    >
      <nav className="flex-grow flex flex-col gap-4 my-2">
        {navItems.map((item) => {
          const isActive = item.id === activeItemId;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`
                w-full flex items-center py-2 text-sm rounded-md transition-all cursor-pointer
                ${isCollapsed ? "justify-center px-2" : "gap-3 px-3"}
                md:justify-start md:gap-3 md:px-3 
                ${
                  isActive
                    ? "bg-[#f0f2ff] text-[#6C68C0] font-medium"
                    : "text-[#667085] hover:text-[#6C68C0] hover:bg-gray-50"
                }`}
            >
              <span
                className={
                  isCollapsed && !isActive
                    ? "text-gray-500"
                    : isActive
                    ? "text-[#6C68C0]"
                    : ""
                }
              >
                {item.icon}
              </span>
              <span
                className={`text-[14px] whitespace-nowrap ${
                  isCollapsed ? "hidden md:inline-block" : "inline-block"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      {/* Collapse/Expand Button - Only visible on mobile */}
      <div
        className={`
          mt-auto flex pt-2 border-t border-gray-200 md:hidden
          ${isCollapsed ? "justify-center" : "justify-end"}
        `}
      >
        <button
          onClick={onToggleCollapse}
          className="p-2 text-gray-500 hover:text-[#6C68C0] hover:bg-gray-100 rounded-md transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
