"use client";
import React from "react"; // Removed useState
import Sidebar, {
  navItems as templateNavItems,
} from "../components/TemplateLibrary/Sidebar";

import { useNavigation } from "@/contexts/NavigationContext";
import BrandIdentityKit from "../components/TemplateLibrary/BrandIdentityKit";
import { Construction, Plus } from "lucide-react";

const VIEW_IDS = {
  TEMPLATES_LIBRARY: "templatesLibrary",
  BRAND_IDENTITY_KIT: "brandIdentityKit",
  AI_GHOSTWRITER: "aiGhostwriter",
  SAFE_SPACE: "safeSpace",
  CONTENT_LIBRARY: "contentLibrary",
  MY_POSTS: "myPosts",
  CONTENT_IDEAS: "contentIdeas",
  VIDEO_CREATION: "videoCreation",
  BUILD_AI_PERSONAS: "buildAiPersonas",
};

const TemplateLibraryPage = () => {
  const { activeViewId, setActiveViewId } = useNavigation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleAddNew = () => {
    console.log("Add New button clicked");
  };

  const sections = [
    {
      title: "Linkedin Post",
      viewAll: true,
      imageSrc: "/linkedin.png",
      altPrefix: "LinkedIn Post Template",
    },
    {
      title: "Instagram Post",
      viewAll: true,
      imageSrc: "instagram.png",
      altPrefix: "Instagram Post Template",
    },
    {
      title: "Newsletter",
      viewAll: false,

      imageSrc: "news-letter.png",
      altPrefix: "Newsletter Template",
    },
  ];

  const handleNavItemClick = (itemId: string) => {
    setActiveViewId(itemId);
  };

  let showAddNewButtonForHeader = false;

  const currentViewItem = templateNavItems.find(
    (item) => item.id === activeViewId
  );

  if (activeViewId === VIEW_IDS.TEMPLATES_LIBRARY) {
    showAddNewButtonForHeader = true;
  } else if (activeViewId === VIEW_IDS.BRAND_IDENTITY_KIT) {
    showAddNewButtonForHeader = false;
  } else if (currentViewItem) {
    showAddNewButtonForHeader = false;
  }

  if (!activeViewId) return null; // Or a loading indicator

  return (
    <div className="flex h-full font-sans">
      <Sidebar
        activeItemId={activeViewId}
        onItemClick={handleNavItemClick}
        className="flex"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />
      <main className="flex-1 px-4 md:px-8 overflow-y-auto">
        <div className="bg-[#F7F7F7]">
          {/* Header for the page content */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center py-3 sm:py-4 mb-3 sm:mb-4 gap-2 sm:gap-0">
            <h1 className="text-lg sm:text-xl font-semibold text-[#101828]">
              Template Library
            </h1>
            {showAddNewButtonForHeader && (
              <button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-[#5753a0] hover:to-[#6a66c4] text-white font-medium rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 self-start sm:self-center"
              >
                <Plus size={16} /> Add New
              </button>
            )}
          </div>
          {activeViewId === VIEW_IDS.TEMPLATES_LIBRARY && (
            <>
              {sections.map((sec) => (
                <div key={sec.title} className="mb-8">
                  <div className="flex justify-between items-center mb-3.5">
                    <h2 className="text-lg font-semibold text-[#101828]">
                      {sec.title}
                    </h2>
                    {sec.viewAll && (
                      <a
                        href="#"
                        className="text-[#6C68C0] hover:underline font-medium text-sm"
                      >
                        View all
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-lg shadow-lg overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all">
                      <img
                        src={sec.imageSrc}
                        alt={`${sec.altPrefix} 1`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-lg shadow-lg overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all">
                      <img
                        src={sec.imageSrc}
                        alt={`${sec.altPrefix} 2`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-lg shadow-lg overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all">
                      <img
                        src={sec.imageSrc}
                        alt={`${sec.altPrefix} 3`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {activeViewId === VIEW_IDS.BRAND_IDENTITY_KIT && <BrandIdentityKit />}

        {![VIEW_IDS.TEMPLATES_LIBRARY, VIEW_IDS.BRAND_IDENTITY_KIT].includes(
          activeViewId
        ) &&
          currentViewItem && (
            <div>
              <div className="mt-4 flex flex-col items-center justify-center text-center p-10 rounded-lg border border-gray-200">
                <Construction size={48} className="text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  Coming Soon!
                </h3>
                <p className="text-sm text-gray-500">
                  We&apos;re working hard to bring you this feature. Stay tuned!
                </p>
              </div>
            </div>
          )}
      </main>
    </div>
  );
};

export default TemplateLibraryPage;
