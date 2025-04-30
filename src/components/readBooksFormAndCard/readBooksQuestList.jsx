import React from "react";
import QuestActions from "./readBooksQuestActions";

function ReadBooksQuestList({ quests, onEdit, onDelete }) {
  return (
    <ul className="space-y-2">
      {quests.map((quest) => (
        <li
          key={quest.id}
          className="flex justify-between items-center p-3 rounded-xl border border-gray-200 shadow-sm bg-white max-w-[400px]"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{quest.icon}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black break-words max-w-[200px]">
                {quest.title}
              </span>
              <span className="text-xs text-gray-500">
                {Array.isArray(quest.frequency)
                  ? quest.frequency.join(", ")
                  : quest.frequency}
              </span>
            </div>
          </div>
          <QuestActions
            onEdit={() => onEdit(quest)}
            onDelete={() => onDelete(quest.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ReadBooksQuestList;
