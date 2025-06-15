import React from "react";
import { Plus } from "lucide-react";

type HeaderProps = {
  onAddNewClick?: () => void;
};

const Header = ({ onAddNewClick }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {onAddNewClick && (
        <button
          onClick={onAddNewClick}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded"
        >
          <Plus size={18} />
          Add New
        </button>
      )}
    </div>
  );
};

export default Header;
