"use client";
import React from "react";
import { Search, Bell, BarChart2 } from "lucide-react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useNavigation } from "@/contexts/NavigationContext";
import { navItems as templateNavItems } from "./TemplateLibrary/Sidebar";

const TopBar = () => {
  const { activeViewId } = useNavigation();

  const activeNavItem = templateNavItems.find(
    (item) => item.id === activeViewId
  );
  const breadcrumbLabel = activeNavItem ? activeNavItem.label : "";

  return (
    <header className="h-fit py-4 md:py-[1.75rem] bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-6">
      {/* Left side - Breadcrumb Navigation */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <span className="font-[600] font-inter text-black text-base sm:text-lg md:text-xl xl:text-[1.35rem] 2xl:text-[1.65rem] whitespace-nowrap">
          Content Studio
        </span>
        {breadcrumbLabel && (
          <>
            <IoIosArrowForward
              className="text-gray-400 hidden sm:block"
              size={20}
            />
            <span className="text-[#667085] font-[500] text-xs sm:text-sm whitespace-nowrap hidden sm:block">
              {breadcrumbLabel}
            </span>
          </>
        )}
      </div>

      {/* Right side - Search,  Actions/User */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        {/* Search Container - flex-1 allows it to take space, min-w-0 allows shrinking */}
        <div className="relative flex-1 min-w-0 max-w-[120px] sm:max-w-[180px] md:max-w-xs">
          <Search
            className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-[#667085]"
            size={15}
          />
          <input
            type="search"
            placeholder="Search"
            className="pl-7 sm:pl-9 pr-2 sm:pr-4 py-1.5 sm:py-2 w-full rounded-md border border-gray-300 bg-gray-100 focus:ring-[#667085] focus:border-[#667085] text-xs sm:text-sm text-[#667085] placeholder:text-[#667085] outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <button className="hidden lg:flex items-center bg-gray-100 border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-[#667085] hover:bg-gray-200 text-xs sm:text-[0.9rem] cursor-pointer">
            <BarChart2 className="mr-1.5" size={18} />
            Analytics
          </button>
          <button className="bg-gray-100 rounded-md p-1.5 sm:p-2 text-[#667085] hover:bg-gray-200 cursor-pointer">
            <Bell size={18} />
          </button>
          <div className="flex items-center">
            <div className="rounded-full p-0.5 w-7 h-7 sm:w-8 md:w-9 sm:h-8 md:h-9 cursor-pointer hover:scale-105">
              <Image height={100} width={100} src="/Avatar.png" alt="" />
            </div>
            <IoIosArrowDown
              className="text-gray-400 ml-0.5 sm:ml-1 cursor-pointer"
              size={16}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
