import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { isLocal } from "../../util/suggestionHelpers";
import { fetchSuggestions } from "../../api/suggestions";

const initialSuggestions = [
  { title: "Do yoga", icon: "🧘", frequency: "Daily" },
  { title: "Eat a healthy meal", icon: "🥗", frequency: "Daily" },
  { title: "Call a friend", icon: "📞", frequency: "Daily" },
  { title: "Write gratitude journal", icon: "📒", frequency: "Daily" },
  { title: "Meal prep for the week", icon: "🍳", frequency: "Daily" },
  { title: "Go for a walk", icon: "🚶‍♂️", frequency: "Daily" },
  { title: "Cancel one subscription", icon: "❌", frequency: "Daily" },
  { title: "Limit screen time before bed", icon: "📵", frequency: "Daily" },
  { title: "Plan a weekend trip", icon: "🧳", frequency: "Daily" },
  { title: "Attend 1 social event", icon: "🎉", frequency: "Daily" },
];

function SuggestedQuests({ quests, setQuests, openEditModal }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (isLocal) {
      setSuggestions(initialSuggestions);
    } else {
      fetchSuggestions("token").then(setSuggestions);
    }
  }, []);

  const filteredSuggestions = suggestions.filter((suggestion) => {
    return !quests.some((quest) => quest.title === suggestion.title);
  });

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
        </div>
      </div>
      {showSuggestions && (
        <div>
          {filteredSuggestions.length > 0 ? (
            <ul className="space-y-1.5 w-full">
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion.title}
                  className="flex justify-between items-center p-2 rounded-xl border border-gray-200 shadow-sm bg-white w-full"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{suggestion.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-m font-medium text-gray-800">
                        {suggestion.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {suggestion.frequency}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newQuest = {
                          id: Date.now(),
                          title: suggestion.title,
                          icon: suggestion.icon,
                          frequency: suggestion.frequency,
                          completed: {},
                        };
                        setQuests((prev) => [...prev, newQuest]);
                        setSuggestions((prev) =>
                          prev.filter((_, i) => i !== prev.indexOf(suggestion)),
                        );
                      }}
                      className="w-6 h-6 flex items-center justify-center translate-y-[0.5px] rounded-[6px] border-2 border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                      title="Add"
                    >
                      <span className="text-lg font-bold leading-none">+</span>
                    </button>
                    <button
                      onClick={() => {
                        const selected = {
                          id: Date.now(),
                          title: suggestion.title,
                          icon: suggestion.icon,
                          frequency: suggestion.frequency,
                        };
                        openEditModal(selected);
                      }}
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
