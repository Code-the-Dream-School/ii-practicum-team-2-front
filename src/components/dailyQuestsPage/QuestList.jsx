import PropTypes from "prop-types";
import React from "react";
import { format } from "date-fns";
import { getFilteredQuests } from "../../util/questFilters";

const QuestList = ({ quests, selectedDay, handleToggle, openEditModal }) => {
  const filteredQuests = getFilteredQuests(quests, selectedDay);

  if (filteredQuests.length === 0) {
    return (
      <p className="text-gray-400 italic mt-4">
        No quests for today yet. Add one!
      </p>
    );
  }

  return (
    <ul className="space-y-1.5">
      {filteredQuests.map((quest) => (
        <li
          key={quest.id}
          className="flex justify-between items-center p-2 rounded-xl border border-gray-200 shadow-sm bg-white"
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl">{quest.icon}</span>
            <div className="flex flex-col">
              <span
                className={`text-m font-medium ${
                  quest.completed?.[format(selectedDay, "yyyy-MM-dd")]
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {quest.title}
              </span>
              <span className="text-xs text-gray-500">{quest.frequency}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggle(quest.id)}
              className={`w-6 h-6 flex items-center justify-center translate-y-[0.5px] rounded-[6px] border-2 transition-colors ${
                quest.completed?.[format(selectedDay, "yyyy-MM-dd")]
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "border-indigo-600 text-transparent"
              }`}
            >
              {quest.completed?.[format(selectedDay, "yyyy-MM-dd")] ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => openEditModal(quest)}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              title="Edit"
            >
              ⋮
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default QuestList;

QuestList.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  handleToggle: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};
