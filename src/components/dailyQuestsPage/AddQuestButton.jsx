import React from "react";

const AddQuestButton = ({ onAddQuest, size = "small", className = "" }) => {
  return (
    <button
      onClick={onAddQuest}
      className={`mt-2 w-full flex items-center gap-2 px-3 py-3 bg-[#D3D4DC] border border-gray-400 rounded-xl shadow-sm ${className}`}
    >
      <span
        className={`flex items-center justify-center bg-gray-200 text-[#757575] font-bold leading-none ${
          size === "large"
            ? "w-8 h-8 text-xl rounded-lg"
            : "w-5 h-5 text-sm rounded-md"
        }`}
      >
        +
      </span>
      <span
        className={`text-gray-800 ${size === "large" ? "text-sm" : "text-xs"}`}
      >
        Add a daily quest
      </span>
    </button>
  );
};

export default AddQuestButton;
