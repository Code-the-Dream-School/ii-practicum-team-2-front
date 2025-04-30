import React, { useState, useRef, useEffect } from "react";

const iconOptions = [
  "💧",
  "🧘",
  "🚶‍♂️",
  "🥗",
  "😴",
  "🏃‍♂️",
  "📘",
  "✨",
  "🤸",
  "📖",
  "🎉",
  "📋",
  "💪",
  "🎧",
  "🏛️",
  "🤝",
  "⏰",
  "🍎",
  "📒",
  "📞",
  "🍳",
  "📚",
  "🛏",
  "✍️",
  "💰",
  "👥",
  "🗺️",
  "🧳",
  "📝",
  "⏱",
  "📵",
  "📔",
  "🏞️",
  "🥦",
  "🔍",
  "❌",
  "🧹",
  "🧠",
  "🎯",
];
const weekDays = [
  "Mondays",
  "Tuesdays",
  "Wednesdays",
  "Thursdays",
  "Fridays",
  "Saturdays",
  "Sundays",
];

const QuestModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  title,
  setTitle,
  frequency,
  setFrequency,
  icon,
  setIcon,
  isEditing = false,
  showDeleteButton = true,
}) => {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const iconPickerRef = useRef(null);
  const [repeatDays, setRepeatDays] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (iconPickerRef.current && !iconPickerRef.current.contains(e.target)) {
        setShowIconPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setFrequency(
      repeatDays.includes("Daily") ? "Daily" : repeatDays.join(", "),
    );
  }, [repeatDays]);

  useEffect(() => {
    if (!isOpen) {
      setShowIconPicker(false);
      setErrorMessage("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (frequency === "Daily") {
      setRepeatDays(["Daily"]);
    } else if (Array.isArray(frequency)) {
      setRepeatDays(frequency);
    } else if (typeof frequency === "string") {
      setRepeatDays(frequency.split(", ").filter(Boolean));
    } else {
      setRepeatDays([]);
    }
  }, [isOpen]);

  const handleToggleDay = (day) => {
    if (day === "Daily") {
      if (repeatDays.includes("Daily")) {
        setRepeatDays([]);
      } else {
        setRepeatDays(["Daily"]);
      }
    } else {
      setRepeatDays((prev) => {
        let updated = prev.filter((d) => d !== "Daily");
        if (updated.includes(day)) {
          updated = updated.filter((d) => d !== day);
        } else {
          updated = [...updated, day];
        }

        const allDays = [
          "Mondays",
          "Tuesdays",
          "Wednesdays",
          "Thursdays",
          "Fridays",
          "Saturdays",
          "Sundays",
        ];
        if (allDays.every((d) => updated.includes(d))) {
          return ["Daily"];
        }

        return updated;
      });
    }
  };

  const handleSaveClick = () => {
    if (!title.trim() || !frequency.trim()) {
      setErrorMessage("Quest name and frequency are required!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setErrorMessage("");
    onSave({ title, frequency, icon });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveClick();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div
        className="bg-white rounded-lg p-3 w-full max-w-sm shadow-xl relative"
        ref={iconPickerRef}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-base font-semibold mb-4 text-center">
          {isEditing ? "Edit Quest" : "Add Quest"}
        </h2>

        <div className="mb-2">
          <label className="block text-xs font-medium mb-1.5">Quest</label>
          <div
            className="flex items-center gap-2 w-full border border-gray-300 rounded px-1 py-0 cursor-text hover:bg-gray-50"
            onClick={() => setShowIconPicker(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowIconPicker((prev) => !prev);
              }}
              className="text-lg hover:scale-110 transition"
              title="Choose icon"
            >
              {icon || "💰"}
            </button>
            <input
              type="text"
              className="flex-1 focus:outline-none bg-transparent text-gray-800 text-xs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quest name"
              onKeyDown={handleKeyDown}
            />
          </div>
          {errorMessage && (
            <div className="text-center text-red-500 text-xs font-semibold mt-2">
              {errorMessage}
            </div>
          )}

          <div
            className={`mt-2 flex flex-wrap gap-2 p-2 bg-gray-50 rounded transition-all duration-300 ease-in-out ${
              showIconPicker
                ? "opacity-100 max-h-[200px]"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            {iconOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setIcon(option);
                  setShowIconPicker(false);
                }}
                className={`text-lg hover:scale-110 transition ${
                  icon === option ? "ring-2 ring-blue-400 rounded" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-xs font-medium mb-1.5">
            Repeat Frequency
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-indigo-600 w-3 h-3"
                checked={repeatDays.includes("Daily")}
                onChange={() => handleToggleDay("Daily")}
              />
              <span className="text-xs">Daily</span>
            </label>
            {weekDays.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-indigo-600 w-3 h-3"
                  checked={repeatDays.includes(day)}
                  onChange={() => handleToggleDay(day)}
                />
                <span className="text-xs">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {isEditing && showDeleteButton && (
            <button
              onClick={onDelete}
              className="px-2.5 py-1 rounded-full border border-red-300 text-red-600 hover:bg-red-50 text-xs"
            >
              Delete
            </button>
          )}
          <button
            onClick={handleSaveClick}
            className="px-5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-2xl hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 ease-in-out block"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
