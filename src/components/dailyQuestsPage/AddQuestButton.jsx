import React from "react";
import PropTypes from "prop-types";

const AddQuestButton = ({ onAddQuest, size = "small", className = "" }) => {
  return (
    <button
      onClick={onAddQuest}
      className={`mt-2 w-full flex items-center gap-2.5 px-3 py-4 bg-gray-300 border-2 border-gray-500 rounded-xl shadow-sm ${className}`}
    >
      <span
        className={`flex items-center justify-center bg-gray-200 text-gray-500 border-2 border-gray-500 font-bold ${
          size === "large"
            ? "w-7 h-7 text-[20px] rounded-[6px]"
            : "w-6 h-6 text-[18px] rounded-[6px]"
        }`}
      >
        <span className="translate-y-[-1px] inline-block">+</span>
      </span>
      <span
        className={`text-gray-800 ${size === "large" ? "text-md" : "text-sm"}`}
      >
        Add a daily quest
      </span>
    </button>
  );
};

AddQuestButton.propTypes = {
  onAddQuest: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string,
};

export default AddQuestButton;
