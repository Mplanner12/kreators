import { Check, Pencil } from "lucide-react";
import React from "react";

export type FontWeightsState = {
  "400": boolean;
  "500": boolean;
  "700": boolean;
};

export type TypographyScaleEntry = { size: number; lineHeight: number };
export type TypographyScaleState = {
  H1: TypographyScaleEntry;
  H2: TypographyScaleEntry;
  H3: TypographyScaleEntry;
};

export interface StoredTypographySettings {
  primaryFont: string | null;
  secondaryFont: string | null;
  fontWeights?: FontWeightsState;
  typographyScale?: TypographyScaleState;
}

interface FontEditorProps {
  isOpen: boolean;
  onClose: () => void;
  fontFamily: string | null;
  setFontFamily: (font: string | null) => void;
  fontWeights: FontWeightsState;
  setFontWeights: React.Dispatch<React.SetStateAction<FontWeightsState>>;
  typographyScale: TypographyScaleState;
  setTypographyScale: React.Dispatch<
    React.SetStateAction<TypographyScaleState>
  >;
  fontTypeLabel: string;
}

const FontEditor: React.FC<FontEditorProps> = ({
  isOpen,
  fontFamily,
  setFontFamily,
  fontWeights,
  setFontWeights,
  typographyScale,
  setTypographyScale,
  fontTypeLabel,
}) => {
  const [editingScaleKey, setEditingScaleKey] = React.useState<
    keyof TypographyScaleState | null
  >(null);

  const handleFontWeightChange = (weight: keyof FontWeightsState) => {
    setFontWeights((prev) => ({ ...prev, [weight]: !prev[weight] }));
  };

  const handleTypographyChange = (
    key: keyof TypographyScaleState,
    field: "size" | "lineHeight",
    value: number
  ) => {
    setTypographyScale((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const toggleEditScaleItem = (key: keyof TypographyScaleState) => {
    setEditingScaleKey((prevKey) => (prevKey === key ? null : key));
  };

  if (!isOpen) return null;

  return (
    <div className="w-full bg-white py-3 px-6 rounded-b-lg border-x border-b border-gray-200 overflow-y-auto max-h-[calc(100vh-250px)] relative">
      {/* Font Family Section */}
      <div className="mb-6">
        <label
          htmlFor={`${fontTypeLabel.replace(/\s+/g, "-")}-fontFamilySelect`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Font Family
        </label>
        <select
          id={`${fontTypeLabel.replace(/\s+/g, "-")}-fontFamilySelect`}
          value={fontFamily || ""}
          onChange={(e) => setFontFamily(e.target.value || null)}
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-indigo-500 focus:border-indigo-500 text-sm text-[#111827] placeholder:text-[#111827]"
        >
          <option value="">Select Font (or clear)</option>
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          {/* Add more font options as needed */}
        </select>
      </div>

      {/* Font Preview Section */}
      <div className="mb-6 py-[0.5rem] px-[1rem]">
        <p
          className="font-[400] text-lg text-[#111827]"
          style={{ fontFamily: fontFamily || "sans-serif" }}
        >
          Aa Bb Cc Dd Ee Ff Gg
        </p>
        <p
          className="text-gray-600 text-sm"
          style={{ fontFamily: fontFamily || "sans-serif" }}
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>

      {/* Available Weights Section */}
      <div className="mb-6">
        <h3 className="font-normal text-[#111827] mb-2 text-sm">
          Available Weights
        </h3>
        <div className="flex flex-col md:flex-row justify-start md:space-x-4 md:space-y-1 space-y-2">
          {(Object.keys(fontWeights) as Array<keyof FontWeightsState>).map(
            (weight) => (
              <label
                key={weight}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={fontWeights[weight]}
                  onChange={() => handleFontWeightChange(weight)}
                  className="sr-only peer"
                />
                <span
                  className="w-4 h-4 border-2 border-gray-300 rounded-sm flex items-center justify-center
                             peer-checked:bg-gradient-to-r peer-checked:from-[#6C68C0] peer-checked:to-[#8581E7] 
                             peer-checked:border-transparent transition-all duration-150 ease-in-out
                             group-hover:border-gray-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-[#6C68C0]"
                >
                  {fontWeights[weight] && (
                    <Check size={12} className="text-white" />
                  )}
                </span>
                <span className="text-sm text-gray-700">
                  {weight === "400" && "Regular (400)"}
                  {weight === "500" && "Medium (500)"}
                  {weight === "700" && "Bold (700)"}
                  {!["400", "500", "700"].includes(weight) &&
                    `Weight ${weight}`}
                </span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Typography Scale Section */}
      <div className="space-y-2 bg-white p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Typography Scale
        </h3>
        <div className="space-y-1">
          {(
            Object.keys(typographyScale) as Array<keyof TypographyScaleState>
          ).map((key) =>
            editingScaleKey === key ? (
              <div
                key={`${key}-edit`}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
              >
                <div className="flex items-center gap-2 flex-grow">
                  <span className="text-xl font-medium text-gray-800 w-12">
                    {key}
                  </span>
                  <input
                    type="number"
                    aria-label={`${key} font size (px)`}
                    value={typographyScale[key].size}
                    onChange={(e) =>
                      handleTypographyChange(
                        key,
                        "size",
                        Number(e.target.value)
                      )
                    }
                    className="border border-gray-300 rounded-md p-1 w-20 text-sm text-center focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <span className="text-gray-500 text-sm">px /</span>
                  <input
                    type="number"
                    step="0.01"
                    aria-label={`${key} line height`}
                    value={typographyScale[key].lineHeight}
                    onChange={(e) =>
                      handleTypographyChange(
                        key,
                        "lineHeight",
                        Number(e.target.value)
                      )
                    }
                    className="border border-gray-300 rounded-md p-1 w-20 text-sm text-center focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  onClick={() => toggleEditScaleItem(key)}
                  aria-label={`Save ${key} changes`}
                >
                  <Check
                    size={18}
                    className="text-green-500 hover:text-green-600 transition-colors"
                  />
                </button>
              </div>
            ) : (
              <div
                key={key}
                className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md cursor-default group"
              >
                <div className="flex items-center">
                  <span className="text-xl font-medium text-gray-800">
                    {key}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {typographyScale[key].size}px /{" "}
                    {typographyScale[key].lineHeight}
                  </span>
                </div>
                <button
                  onClick={() => toggleEditScaleItem(key)}
                  aria-label={`Edit ${key}`}
                >
                  <Pencil
                    size={16}
                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                  />
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* The "Done" button for the entire FontEditor can be uncommented if needed */}
      {/* <div className="mt-8 flex justify-end">
        <button
          onClick={onClose} 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
        >
          Done
        </button>
      </div> */}
    </div>
  );
};

export default FontEditor;
