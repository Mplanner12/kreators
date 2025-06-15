import React from "react";
import { Search, Bell, BarChart2 } from "lucide-react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

const TopBar = () => {
  return (
    <header className="h-fit py-[1.75rem] bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      {/* Left side - Breadcrumb Navigation */}
      <div className="flex items-center space-x-2.5 w-full max-w-sm">
        <span className="font-[600] font-inter text-black txet-2xl xl:text-[1.35rem] 2xl:text-[1.65rem]">
          Content Studio
        </span>
        <IoIosArrowForward className="text-gray-400" size={22} />
        <span className="text-[#667085] font-[500]">Brand Identity Kit</span>
      </div>

      {/* Right side - Search,  Actions/User */}
      <div className="flex items-center justify-end w-full">
        <div className="flex-grow mx-4 max-w-sm">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={17}
            />
            <input
              type="search"
              placeholder="Search"
              className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 text-sm placeholder:text-[#667085]"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5 text-[#667085] hover:bg-gray-200 text-[0.9rem]">
            <BarChart2 className="mr-1.5" size={18} />
            Analytics
          </button>
          <button className="bg-gray-100 rounded-md p-2 text-[#667085] hover:bg-gray-200">
            <Bell size={20} />
          </button>
          <div className="flex items-center">
            <div className="rounded-full p-0.5 w-9 h-9 cursor-pointer hover:scale-105">
              <Image height={100} width={100} src="/Avatar.png" alt="" />
            </div>
            <IoIosArrowDown className="text-gray-400 ml-1" size={19} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
