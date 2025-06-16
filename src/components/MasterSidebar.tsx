"use client";
import React, { useState } from "react";
import {
  Grid,
  User,
  Clipboard,
  Shield,
  Users,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface MasterNavItem {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const masterNavItems: MasterNavItem[] = [
  {
    label: "Main Workspace",
    icon: <Grid size={18} />,
  },
  {
    label: "Personal Growth Hub",
    icon: <User size={18} />,
  },
  {
    label: "Content Studio",
    icon: <Clipboard size={18} />,
    isActive: true,
  },
  {
    label: "Advocacy Hub",
    icon: <Shield size={18} />,
  },
  {
    label: "Community Hub",
    icon: <Users size={18} />,
  },
  {
    label: "Analytics Hub",
    icon: <Clock size={18} />,
  },
  {
    label: "Settings",
    icon: <Settings size={18} />,
  },
];

interface MasterSidebarProps {
  className?: string;
}

const MasterSidebar: React.FC<MasterSidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`h-full bg-white shadow-md flex flex-col border-r transition-all duration-300 ease-in-out
      ${isCollapsed ? "w-20 p-3" : "w-64 p-4"} 
      ${className || ""}`}
    >
      <div className="w-full flex justify-start items-center pl-1.5">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center justify-start w-full rounded-full mb-6 mx-auto"
        >
          <img src="/kreatoors-logo.png" alt="" className="w-12 h-12" />
        </Link>
      </div>

      <div
        className={`flex items-center mb-6 ${
          isCollapsed ? "justify-center" : "justify-end"
        }`}
      >
        {/* Collapse/Expand Button */}
        <button
          onClick={toggleCollapse}
          className="p-1. text-gray-500 hover:text-[#6C68C0] hover:bg-gray-100 rounded-md border-2 border-gray-500 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}{" "}
        </button>
      </div>
      {/* Create a Post Button */}
      <button
        className={`w-full bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-[#5753a0] hover:to-[#6a66c4] cursor-pointer text-white rounded-xl py-2.5 mb-6 text-sm font-medium transition-all duration-300 ease-in-out flex items-center
        ${isCollapsed ? "justify-center px-2" : "justify-center px-4"}`}
        title={isCollapsed ? "Create a Post" : undefined}
      >
        <span
          className={isCollapsed ? "transform scale-125" : "mr-2.5 text-2xl"}
        >
          +
        </span>
        {!isCollapsed && "Create a Post"}
      </button>

      {/* Navigation Items */}
      <nav className="flex-grow flex flex-col gap-1 overflow-y-auto">
        {masterNavItems.map((item) => (
          <button
            key={item.label}
            title={isCollapsed ? item.label : undefined}
            className={`w-full flex items-center py-2.5 text-sm rounded-md transition-all
              ${isCollapsed ? "justify-center px-2" : "gap-3 px-3"}
              ${
                item.isActive
                  ? "bg-[#f0f2ff] text-[#6C68C0] font-medium"
                  : "text-gray-600 hover:text-[#6C68C0] hover:bg-gray-100"
              }`}
          >
            <span
              className={`${
                item.isActive ? "text-[#6C68C0]" : "text-gray-500"
              } ${isCollapsed && "mx-auto"}`}
            >
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="text-[14px] whitespace-nowrap">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default MasterSidebar;
