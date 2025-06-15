import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { IoIosArrowRoundBack } from "react-icons/io";
import FontEditor, {
  FontWeightsState,
  TypographyScaleState,
  StoredTypographySettings,
} from "./FontEditor";

const BRAND_COLORS_STORAGE_KEY = "brandKitUserColors";
const TYPOGRAPHY_STORAGE_KEY = "brandKitTypography";

const BrandIdentityKit = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickerInitialColor, setPickerInitialColor] = useState("#FFFFFF");
  const [brandColors, setBrandColors] = useState<string[]>([]);

  const [primaryFont, setPrimaryFont] = useState<string | null>(null);
  const [secondaryFont, setSecondaryFont] = useState<string | null>(null);

  const [editingPrimaryFont, setEditingPrimaryFont] = useState<string | null>(
    null
  );
  const [editingSecondaryFont, setEditingSecondaryFont] = useState<
    string | null
  >(null);

  const [activeEditor, setActiveEditor] = useState<
    "primary" | "secondary" | null
  >(null);

  const [fontWeights, setFontWeights] = useState<FontWeightsState>({
    "400": true,
    "500": false,
    "700": false,
  });
  const [typographyScale, setTypographyScale] = useState<TypographyScaleState>({
    H1: { size: 48, lineHeight: 1.2 },
    H2: { size: 36, lineHeight: 1.25 },
    H3: { size: 24, lineHeight: 1.3 },
  });

  useEffect(() => {
    const storedColors = localStorage.getItem(BRAND_COLORS_STORAGE_KEY);
    if (storedColors) {
      try {
        setBrandColors(JSON.parse(storedColors));
      } catch (error) {
        console.error("Failed to parse stored brand colors:", error);
        localStorage.removeItem(BRAND_COLORS_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const storedTypography = localStorage.getItem(TYPOGRAPHY_STORAGE_KEY);
    if (storedTypography) {
      try {
        const parsedSettings: StoredTypographySettings =
          JSON.parse(storedTypography);
        setPrimaryFont(parsedSettings.primaryFont || null);
        setSecondaryFont(parsedSettings.secondaryFont || null);
        setEditingPrimaryFont(parsedSettings.primaryFont || null);
        setEditingSecondaryFont(parsedSettings.secondaryFont || null);

        if (parsedSettings.fontWeights)
          setFontWeights(parsedSettings.fontWeights);
        if (parsedSettings.typographyScale)
          setTypographyScale(parsedSettings.typographyScale);
      } catch (error) {
        console.error("Failed to parse stored typography:", error);
        localStorage.removeItem(TYPOGRAPHY_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(BRAND_COLORS_STORAGE_KEY, JSON.stringify(brandColors));
  }, [brandColors]);

  const handleOpenColorPicker = () => {
    setPickerInitialColor("#FFFFFF");
    setShowColorPicker(true);
  };

  const handleAddBrandColor = (newColor: string) => {
    const upperCaseColor = newColor.toUpperCase();
    if (upperCaseColor && !brandColors.includes(upperCaseColor)) {
      setBrandColors((prevColors) => [...prevColors, upperCaseColor]);
    }
    setShowColorPicker(false);
  };

  const handleRemoveBrandColor = (colorToRemove: string) => {
    setBrandColors((prevColors) =>
      prevColors.filter((color) => color !== colorToRemove)
    );
  };

  const handleClearFontFamily = (target: "primary" | "secondary") => {
    if (target === "primary") {
      setEditingPrimaryFont(null);
    } else {
      setEditingSecondaryFont(null);
    }
  };

  const handleSaveTypographyAndCloseEditor = () => {
    setPrimaryFont(editingPrimaryFont);
    setSecondaryFont(editingSecondaryFont);

    const settingsToSave: StoredTypographySettings = {
      primaryFont: editingPrimaryFont,
      secondaryFont: editingSecondaryFont,
      fontWeights: fontWeights,
      typographyScale: typographyScale,
    };

    localStorage.setItem(
      TYPOGRAPHY_STORAGE_KEY,
      JSON.stringify(settingsToSave)
    );
    alert("Typography saved!");
    setActiveEditor(null);
  };

  const handleCancelTypographyAndCloseEditor = () => {
    setEditingPrimaryFont(primaryFont);
    setEditingSecondaryFont(secondaryFont);

    setActiveEditor(null);
  };

  const handleToggleFontEditor = (type: "primary" | "secondary") => {
    if (activeEditor === type) {
      setActiveEditor(null);
    } else {
      setActiveEditor(type);
    }
  };

  return (
    <div className="px-6 py-3.5 rounded-2xl bg-white shadow-md w-full max-w-3xl space-y-6 mb-[1rem]">
      {/* Colours Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <button className="flex items-center gap-1 pr-2 py-2 cursor-pointer text-black hover:bg-gray-100 rounded-lg text-sm">
            <IoIosArrowRoundBack size={24} />
            Back
          </button>
          <div className="relative">
            <button
              onClick={handleOpenColorPicker}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-purple-500 hover:to-purple-600 cursor-pointer text-white text-sm font-medium rounded-lg"
            >
              <Plus size={16} />
              Add New
            </button>
            {showColorPicker && (
              <ColorPickerPopover
                initialColor={pickerInitialColor}
                onSave={handleAddBrandColor}
                onClose={() => setShowColorPicker(false)}
              />
            )}
          </div>
        </div>
        <h2 className="font-semibold text-lg text-black">Colours</h2>
        <p className="text-[0.9rem] mb-4 mt-1.5 max-w-lg text-[#667085]">
          Our color palette is a key element of our visual identity. Use the
          colors below for consistency across all materials.
        </p>
        <div className="flex items-start flex-wrap gap-x-8 gap-y-4 bg-[#F5F5FA] px-4 py-6 rounded-xl">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-white border shadow" />
            <span className="text-xs text-gray-500">Primary</span>
          </div>
          {brandColors.map((hexColor) => (
            <div
              key={hexColor}
              className="relative group flex flex-col items-center space-y-2"
            >
              <div
                className="w-14 h-14 rounded-full border shadow"
                style={{ backgroundColor: hexColor }}
              />
              <span className="text-xs text-gray-700">{hexColor}</span>
              <button
                onClick={() => handleRemoveBrandColor(hexColor)}
                className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-opacity duration-200 cursor-pointer"
                title={`Remove ${hexColor}`}
                aria-label={`Remove color ${hexColor}`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={handleOpenColorPicker}
            className="flex flex-col items-center space-y-2 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
            title="Add new color"
          >
            <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-500 hover:border-blue-600 flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-xs font-medium">Add New</span>
          </button>
        </div>
      </div>

      {/* Typography Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg text-black">Typography</h2>
          <button
            onClick={() => alert("Add New Typography Slot - To be implemented")}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-purple-500 hover:to-purple-600 cursor-pointer text-white text-sm font-medium rounded-lg"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>
        <p className="text-[0.9rem] mb-4 mt-1.5 max-w-lg text-[#667085]">
          The font used in all assets should be consistent for clarity and
          consistency.
        </p>
        <div className="space-y-2">
          {" "}
          {/* Primary Font Section */}
          <div className="rounded-lg border border-[#EAECF0] overflow-hidden">
            {" "}
            {/* Parent for rounded corners */}
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
              <span className="text-sm text-[#111827] font-[450]">
                Primary Font
                <span
                  className="font-medium text-black capitalize"
                  style={{ fontFamily: editingPrimaryFont || "sans-serif" }}
                >
                  {editingPrimaryFont || " "}
                </span>
              </span>
              <div className="flex items-center gap-3">
                <Pencil
                  size={16}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => handleToggleFontEditor("primary")}
                  aria-label="Edit primary font"
                />
                <Trash2
                  size={16}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={() => handleClearFontFamily("primary")}
                  aria-label="Clear primary font"
                />
              </div>
            </div>
            {activeEditor === "primary" && (
              <div>
                {" "}
                {/* This div will contain the FontEditor and action buttons */}
                <FontEditor
                  isOpen={true}
                  onClose={() => setActiveEditor(null)}
                  fontFamily={editingPrimaryFont}
                  setFontFamily={setEditingPrimaryFont}
                  fontWeights={fontWeights}
                  setFontWeights={setFontWeights}
                  typographyScale={typographyScale}
                  setTypographyScale={setTypographyScale}
                  fontTypeLabel="Primary Font"
                />
                {/* Action buttons for the editor - "Choose Fonts" button removed */}
                <div className="flex items-center justify-end p-4 ">
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelTypographyAndCloseEditor}
                      className="text-sm text-[#111827] px-4 py-2 rounded-lg hover:bg-gray-100 border border-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveTypographyAndCloseEditor}
                      className="text-sm text-white bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-purple-500 hover:to-purple-600 cursor-pointer px-5 py-2 rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Secondary Font Section */}
          <div className="rounded-lg border border-[#EAECF0] overflow-hidden">
            {/* Parent for rounded corners */}
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
              <span className="text-sm text-[#111827] font-[450]">
                Secondary Font
                <span
                  className="font-medium text-black capitalize"
                  style={{ fontFamily: editingSecondaryFont || "sans-serif" }}
                >
                  {editingSecondaryFont || " "}
                </span>
              </span>
              <div className="flex items-center gap-3">
                <Pencil
                  size={16}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => handleToggleFontEditor("secondary")}
                  aria-label="Edit secondary font"
                />
                <Trash2
                  size={16}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={() => handleClearFontFamily("secondary")}
                  aria-label="Clear secondary font"
                />
              </div>
            </div>
            {activeEditor === "secondary" && (
              <div>
                {/* This div will contain the FontEditor and action buttons */}
                <FontEditor
                  isOpen={true}
                  onClose={() => setActiveEditor(null)}
                  fontFamily={editingSecondaryFont}
                  setFontFamily={setEditingSecondaryFont}
                  fontWeights={fontWeights}
                  setFontWeights={setFontWeights}
                  typographyScale={typographyScale}
                  setTypographyScale={setTypographyScale}
                  fontTypeLabel="Secondary Font"
                />
                {/* Action buttons for the editor - "Choose Fonts" button removed */}
                <div className="flex items-center justify-end p-4 ">
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelTypographyAndCloseEditor}
                      className="text-sm text-[#111827] px-4 py-2 rounded-lg hover:bg-gray-100 border border-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveTypographyAndCloseEditor}
                      className="text-sm text-white bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-purple-500 hover:to-purple-600 cursor-pointer px-5 py-2 rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ColorPickerPopoverProps {
  initialColor: string;
  onSave: (color: string) => void;
  onClose: () => void;
}

const ColorPickerPopover = ({
  initialColor,
  onSave,
  onClose,
}: ColorPickerPopoverProps) => {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    setCurrentColor(initialColor);
  }, [initialColor]);

  const handleSave = () => {
    onSave(currentColor);
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-xl p-4 shadow-lg z-50 border border-gray-200">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
        aria-label="Close color picker"
      >
        <X size={18} />
      </button>
      <h3 className="text-sm font-medium mb-2 text-gray-700">Add Colour</h3>
      <div className="mb-3">
        <HexColorPicker
          color={currentColor}
          onChange={setCurrentColor}
          style={{ width: "100%", height: "140px" }}
        />
      </div>
      <input
        type="color"
        className="w-full h-8 mt-2 cursor-pointer"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          value={currentColor.toUpperCase()}
          onChange={(e) => setCurrentColor(e.target.value)}
          className="border border-gray-300 px-2 py-1.5 text-sm w-full rounded focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-black"
        />
        <div
          className="w-7 h-7 rounded border border-gray-300"
          style={{ backgroundColor: currentColor }}
        />
      </div>
      <button
        onClick={handleSave}
        className="mt-4 w-full bg-gradient-to-r from-[#6C68C0] to-[#8581E7] hover:from-purple-500 hover:to-purple-600 text-white text-sm font-medium py-2 rounded-lg"
      >
        Done
      </button>
    </div>
  );
};

export default BrandIdentityKit;
