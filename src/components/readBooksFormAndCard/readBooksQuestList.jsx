import PropTypes from "prop-types";
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
            <span className="text-3xl">{quest.icon}</span>
            <div className="flex flex-col">
              <span className="text-m font-medium text-gray-800 break-words max-w-[200px]">
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

ReadBooksQuestList.propTypes = {
  quests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      frequency: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]).isRequired,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReadBooksQuestList;
