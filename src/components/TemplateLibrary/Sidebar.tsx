import React from "react";
import {
  BookOpen,
  BadgePercent,
  LayoutList,
  Lightbulb,
  Files,
  Video,
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
}

const Sidebar = ({ activeItemId, onItemClick }: SidebarProps) => {
  return (
    <aside className="w-64 h-fit bg-white shadow-sm px-4 py-2.5 pb-10 rounded-2xl border-r">
      <nav className="flex flex-col gap-5 my-2">
        {navItems.map((item) => {
          const isActive = item.id === activeItemId;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all cursor-pointer
              ${
                isActive
                  ? "bg-[#f0f2ff] text-[#6C68C0] font-medium"
                  : "text-[#667085] hover:text-[#6C68C0] hover:bg-gray-50"
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-[14px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
