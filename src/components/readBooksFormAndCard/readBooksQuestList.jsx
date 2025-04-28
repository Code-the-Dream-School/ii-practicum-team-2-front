import React from "react";

function QuestActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-500 hover:bg-indigo-600 hover:text-white border border-gray-200 transition-colors duration-200"
        title="Edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
        </svg>
      </button>
      <button
        onClick={onDelete}
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-500 hover:bg-indigo-600 hover:text-white border border-gray-200 transition-colors duration-200"
        title="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

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
