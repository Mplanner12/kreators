import React from "react";
import {
  Grid,
  User,
  Clipboard,
  Shield,
  Users,
  Clock,
  Settings,
} from "lucide-react";

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
  return (
    <aside
      className={`w-64 h-full bg-white shadow-md flex flex-col p-4 border-r ${
        className || ""
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center w-12 h-12 bg-[#6C68C0] rounded-full text-white text-xl font-bold mb-6 mx-auto">
        K*
      </div>

      {/* Create a Post Button */}
      <button className="w-full bg-[#6C68C0] text-white rounded-lg py-2.5 px-4 mb-6 text-sm font-medium hover:bg-opacity-90 transition-colors">
        + Create a Post
      </button>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1">
        {masterNavItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all
              ${
                item.isActive
                  ? "bg-[#f0f2ff] text-[#6C68C0] font-medium"
                  : "text-gray-600 hover:text-[#6C68C0] hover:bg-gray-100"
              }`}
          >
            <span
              className={item.isActive ? "text-[#6C68C0]" : "text-gray-500"}
            >
              {item.icon}
            </span>
            <span className="text-[14px]">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex-grow"></div>
    </aside>
  );
};

export default MasterSidebar;
