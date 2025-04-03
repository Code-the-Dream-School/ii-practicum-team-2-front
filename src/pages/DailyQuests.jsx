import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import QuestModal from "../components/QuestModal";
import NavbarTopLoggedIn from "../components/newResopage/NavbarTopLoggedIn";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const DailyQuests = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [icon, setIcon] = useState("+");

  useEffect(() => {
    setTimeout(() => {
      setQuests([
        {
          id: 1,
          title: "Drink water",
          icon: "💧",
          frequency: "Daily",
          completed: {},
        },
        {
          id: 2,
          title: "Stretch",
          icon: "🤸",
          frequency: "Mondays, Wednesdays",
          completed: {},
        },
        {
          id: 3,
          title: "Read 1 page",
          icon: "📘",
          frequency: "Daily",
          completed: {},
        },
        {
          id: 4,
          title: "Meditate for 10 minutes",
          icon: "✨",
          frequency: "Daily",
          completed: {},
        },
        {
          id: 5,
          title: "Go for a walk",
          icon: "🚶‍♂️",
          frequency: "Fridays",
          completed: {},
        },
        {
          id: 6,
          title: "Sleep early",
          icon: "🛏",
          frequency: "Mondays, Wednesdays, Fridays",
          completed: {},
        },
        {
          id: 7,
          title: "Write journal entry",
          icon: "✍️",
          frequency: "Fridays",
          completed: {},
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleToggle = (questId) => {
    const dateKey = format(selectedDay, "yyyy-MM-dd");
    setQuests((prev) =>
      prev.map((q) =>
        q.id === questId
          ? {
              ...q,
              completed: {
                ...(q.completed || {}),
                [dateKey]: !q.completed?.[dateKey],
              },
            }
          : q,
      ),
    );
  };

  const resetModalState = (quest = null) => {
    setSelectedQuest(quest);
    setTitle(quest?.title || "");
    setFrequency(quest?.frequency || "Daily");
    setIcon(quest?.icon || "?");
    setShowModal(true);
  };

  const handleAddQuest = () => resetModalState();

  const openEditModal = (quest) => resetModalState(quest);

  const changeWeek = (direction) => {
    setCurrentDate((prev) => addDays(prev, direction === "next" ? 7 : -7));
  };

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(currentDate, index - currentDate.getDay());
    return {
      fullDate: day,
      date: day.getDate(),
      day: daysOfWeek[day.getDay()],
    };
  });

  const [suggestions, setSuggestions] = useState([
    { title: "Do yoga", icon: "🧘", frequency: "Mondays, Wednesdays, Fridays" },
    { title: "Eat a healthy meal", icon: "🥗", frequency: "Daily" },
    { title: "Call a friend", icon: "📞", frequency: "Saturdays" },
    { title: "Write gratitude journal", icon: "📒", frequency: "Sundays" },
  ]);

  const handleSave = (updatedQuest) => {
    if (selectedQuest) {
      setQuests((prev) =>
        prev.map((q) => (q.id === selectedQuest.id ? updatedQuest : q)),
      );
    } else {
      setQuests((prev) => [
        ...prev,
        { ...updatedQuest, id: Date.now(), completed: {} },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedQuest) {
      setQuests((prev) => prev.filter((q) => q.id !== selectedQuest.id));
      setShowModal(false);
    }
  };

  return (
    <div className="bg-[#EDEDF4] min-h-screen">
      <NavbarTopLoggedIn />

      <div className="p-6 max-w-xs mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Daily Quests</h1>
          <p className="text-black font-semibold text-sm mb-4 mt-2">
            {format(selectedDay, "EEEE, MMMM d")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => changeWeek("prev")}
            className="text-gray-500 text-3xl -ml-4"
          >
            ‹
          </button>
          <div className="flex overflow-x-auto scroll-snap-type-x">
            {weekDays.map(({ date, day, fullDate }) => (
              <button
                key={day}
                onClick={() => setSelectedDay(fullDate)}
                className={`flex flex-col items-center w-10 px-1.5 py-1.5 rounded-xl text-xs mx-0.5 ${
                  selectedDay.getDate() === date
                    ? "bg-[#3c51e0] text-white"
                    : "bg-white text-[gray-800] hover:bg-[#3c51e0]/10"
                } scroll-snap-start shadow-sm border border-gray-200`}
              >
                <span>{date}</span>
                <span className="text-[8px] text-gray-400">{day}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => changeWeek("next")}
            className="text-gray-500 text-3xl -mr-4"
          >
            ›
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 italic">
            Loading daily quests...
          </div>
        ) : (
          <>
            {quests.length === 0 ? (
              <p className="text-gray-400 italic mt-4">
                No quests for today yet. Add one!
              </p>
            ) : (
              <ul className="space-y-1.5">
                {[...quests]
                  .filter((q) => {
                    if (!q.frequency) return false;

                    const selectedDayName = format(
                      selectedDay,
                      "EEEE",
                    ).toLowerCase();

                    const freqDays = q.frequency
                      .toLowerCase()
                      .split(/,\s*/)
                      .map((day) => day.replace(/s$/, ""));

                    return (
                      q.frequency.toLowerCase() === "daily" ||
                      freqDays.includes(selectedDayName.replace(/s$/, ""))
                    );
                  })
                  .sort((a, b) => {
                    const aIsDaily = a.frequency === "Daily";
                    const bIsDaily = b.frequency === "Daily";
                    return aIsDaily === bIsDaily ? 0 : aIsDaily ? -1 : 1;
                  })
                  .map((quest) => (
                    <li
                      key={quest.id}
                      className="flex justify-between items-center p-2 rounded-xl border border-gray-200 shadow-sm bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{quest.icon}</span>
                        <div className="flex flex-col">
                          <span
                            className={`text-xs font-medium ${
                              quest.completed?.[
                                format(selectedDay, "yyyy-MM-dd")
                              ]
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
                              ? "bg-[#3c50e0] border-[#3c50e0] text-white"
                              : "border-[#3c50e0] text-transparent"
                          }`}
                        >
                          {quest.completed?.[
                            format(selectedDay, "yyyy-MM-dd")
                          ] ? (
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
            )}
          </>
        )}

        <button
          onClick={handleAddQuest}
          className="mt-2 w-full flex items-center gap-2 px-3 py-3 bg-[#D3D4DC] rounded-xl shadow-sm"
        >
          <span className="w-5 h-5 flex items-center justify-center rounded-[6px] bg-[#EFEFEF] text-[#757575] text-sm font-bold leading-none">
            +
          </span>
          <span className="text-xs text-gray-800">Add a daily quest</span>
        </button>

        <QuestModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          onDelete={handleDelete}
          title={title}
          setTitle={setTitle}
          frequency={frequency}
          setFrequency={setFrequency}
          icon={icon}
          setIcon={setIcon}
          isEditing={!!selectedQuest}
        />

        <div className="mt-8">
          <h2 className="text-md font-semibold text-gray-700 mb-2">
            Suggestions
          </h2>
          <ul className="space-y-1.5">
            {suggestions.map((s, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 rounded-xl border border-gray-200 shadow-sm bg-white"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-800">
                      {s.title}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {s.frequency}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newQuest = {
                      id: Date.now(),
                      title: s.title,
                      icon: s.icon,
                      frequency: s.frequency,
                      completed: {},
                    };
                    setQuests((prev) => [...prev, newQuest]);
                    setSuggestions((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded-[6px] border-2 border-[#3c50e0] bg-[#3c50e0] text-white hover:bg-white hover:text-[#3c50e0] transition-colors leading-none pb-[2px]"
                >
                  <span className="text-sm font-bold leading-none">+</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DailyQuests;
