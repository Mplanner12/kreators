"use client";
import React, { useState } from "react";
import Sidebar, {
  navItems as templateNavItems,
} from "../components/TemplateLibrary/Sidebar";

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
  const [activeViewId, setActiveViewId] = useState<string>(
    VIEW_IDS.TEMPLATES_LIBRARY
  );

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
    // pageTitle = "Template Library";
    showAddNewButtonForHeader = true;
  } else if (activeViewId === VIEW_IDS.BRAND_IDENTITY_KIT) {
    // pageTitle = "Brand Identity Kit";
    showAddNewButtonForHeader = false;
  } else if (currentViewItem) {
    // pageTitle = currentViewItem.label;
    showAddNewButtonForHeader = false;
  }

  return (
    <div className="flex h-full font-sans">
      <Sidebar activeItemId={activeViewId} onItemClick={handleNavItemClick} />

      {/* Adjust horizontal padding for different screen sizes */}
      <main className="flex-1 px-4 md:px-8 overflow-y-auto">
        {/* Conditionally render Header only if an "Add New" action is available for the current view */}
        {/* The `pageTitle` is intended for the TopBar, not this specific Header component */}
        <div className="bg-[#F7F7F7]">
          <div className="flex justify-between items-center py-4 mb-4">
            <h1 className="text-xl font-semibold text-[#101828]">
              Template Library
            </h1>
            {showAddNewButtonForHeader && (
              <button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-[#5753a0] hover:to-[#6a66c4] text-white font-medium rounded-lg px-4 py-2 text-sm flex items-center gap-1.5"
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
                  <div className="flex space-x-4 overflow-x-auto">
                    <div className="w-60 h-60 rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={sec.imageSrc}
                        alt={`${sec.altPrefix} 1`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-60 h-60 rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={sec.imageSrc}
                        alt={`${sec.altPrefix} 2`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-60 h-60 rounded-lg shadow-lg overflow-hidden">
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

        {/* Placeholder for other views not yet implemented */}
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
