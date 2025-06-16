"use client";

import React from "react";
import MasterSidebar from "@/components/MasterSidebar";
import TopBar from "@/components/TopBar";
import { NavigationProvider } from "@/contexts/NavigationContext";

const AppClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationProvider>
      <div className="flex h-screen overflow-hidden">
        <MasterSidebar className="hidden md:block" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-[#F7F7F7] p-4 md:p-7">
            {children}
          </main>
        </div>
      </div>
    </NavigationProvider>
  );
};

export default AppClientLayout;
