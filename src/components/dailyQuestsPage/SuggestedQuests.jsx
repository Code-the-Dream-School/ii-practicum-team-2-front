import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useSuggestions } from "../../hooks/useSuggestions";
function SuggestedQuests({ quests, setQuests, openEditModal }) {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { suggestions, isLoading, error, refetch } = useSuggestions();

  const filteredSuggestions =
    suggestions?.filter(
      (suggestion) => !quests.some((quest) => quest.title === suggestion.title)
    ) || [];
  return (
    <div className="py-4 w-full mx-auto bg-transparent">
      <div className="flex items-center mb-4">
        <h2 className="text-s font-semibold text-gray-500 flex-grow">
          Suggestions
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => setShowSuggestions((prev) => !prev)}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:opacity-70 transition"
            aria-label="Toggle Suggestions"
            type="button"
          >
            {showSuggestions ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeSlashIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={refetch}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:opacity-70 transition"
            aria-label="Refresh Suggestions"
          >
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      {showSuggestions && (
        <div>
          {isLoading ? (
            <p className="text-m text-gray-400 italic text-center mt-4">
              Loading suggestions...
            </p>
          ) : error ? (
            <p className="text-m text-red-400 italic text-center mt-4">
              Error loading suggestions
            </p>
          ) : filteredSuggestions.length > 0 ? (
            <ul className="space-y-1.5 w-full">
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="flex justify-between items-center p-2 rounded-xl border border-gray-200 shadow-sm bg-white w-full"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{suggestion.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-m font-medium text-gray-800">
                        {suggestion.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {suggestion.frequency || "Daily"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newQuest = {
                          id: suggestion.id,
                          title: suggestion.title,
                          icon: suggestion.icon,
                          frequency: suggestion.frequency || "Daily",
                          completed: {},
                        };
                        setQuests((prev) => [...prev, newQuest]);
                      }}
                      className="w-6 h-6 flex items-center justify-center translate-y-[0.5px] rounded-[6px] border-2 border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                      title="Add"
                    >
                      <span className="text-lg font-bold leading-none">+</span>
                    </button>
                    <button
                      onClick={() => openEditModal(suggestion)}
                      className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                      title="Edit"
                    >
                      ⋮
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-m text-gray-400 italic text-center mt-4">
              No suggestions available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
SuggestedQuests.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.object).isRequired,
  setQuests: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};
export default SuggestedQuests;
