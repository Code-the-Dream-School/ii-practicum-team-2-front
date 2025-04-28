import React from "react";
import { format } from "date-fns";

const QuestList = ({ quests, selectedDay, handleToggle, openEditModal }) => {
  const filteredQuests = quests
    .filter((q) => {
      if (!q.frequency) return false;

      const selectedDayName = format(selectedDay, "EEEE").toLowerCase();
      const freqString =
        typeof q.frequency === "string" ? q.frequency.toLowerCase() : "";
      const freqDays = freqString
        .split(/,\s*/)
        .map((day) => day.replace(/s$/, ""));

      return (
        freqString === "daily" ||
        freqDays.includes(selectedDayName.replace(/s$/, ""))
      );
    })
    .sort((a, b) => {
      const aIsDaily = a.frequency.toLowerCase() === "daily";
      const bIsDaily = b.frequency.toLowerCase() === "daily";
      return aIsDaily === bIsDaily ? 0 : aIsDaily ? -1 : 1;
    });

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
            <span className="text-lg">{quest.icon}</span>
            <div className="flex flex-col">
              <span
                className={`text-xs font-medium ${
                  quest.completed?.[format(selectedDay, "yyyy-MM-dd")]
                    ? "line-through text-gray-400"
                    : "text-black"
                }`}
              >
                {quest.title}
              </span>
              <span className="text-[10px] text-gray-400">
                {quest.frequency}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggle(quest.id)}
              className={`w-5 h-5 flex items-center justify-center rounded-[6px] border-2 transition-colors ${
                quest.completed?.[format(selectedDay, "yyyy-MM-dd")]
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "border-indigo-600 text-transparent"
              }`}
            >
              {quest.completed?.[format(selectedDay, "yyyy-MM-dd")] ? (
                <svg
                  className="w-3 h-3"
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
                <span className="w-3 h-3" />
              )}
            </button>

            <button
              onClick={() => openEditModal(quest)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
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
