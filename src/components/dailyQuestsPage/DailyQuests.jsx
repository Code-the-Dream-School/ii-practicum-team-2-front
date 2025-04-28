import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import QuestModal from "./QuestModal";
import NavbarTopLoggedIn from "../chooseNewResopage/NavbarTopLoggedIn";
import SuggestedQuests from "../dailyQuestsPage/SuggestedQuests";
import WeekDaysCarousel from "./WeekDaysCarousel";
import QuestList from "./QuestList";
import AddQuestButton from "./AddQuestButton";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const normalizeFrequency = (freq) => {
  if (!freq) return "";
  const array = Array.isArray(freq)
    ? freq
    : freq.split(",").map((d) => d.trim());
  return array.sort().join(", ");
};

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
    const savedBookQuests =
      JSON.parse(localStorage.getItem("readBooksQuests")) || [];

    const defaultQuests = [
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
    ];

    const filteredDefaultQuests = defaultQuests.filter((def) => {
      return !savedBookQuests.some((saved) => {
        const savedFreq = normalizeFrequency(saved.frequency);
        const defFreq = normalizeFrequency(def.frequency);
        return (
          saved.title === def.title &&
          saved.icon === def.icon &&
          savedFreq === defFreq
        );
      });
    });

    const combinedQuests = [
      ...savedBookQuests.map((q) => ({ ...q, completed: {} })),
      ...filteredDefaultQuests,
    ];

    setQuests(combinedQuests);
    setLoading(false);
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
    setIcon(quest?.icon || "💰");
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

  const handleSave = (updatedQuest) => {
    let updatedQuests;
    if (selectedQuest) {
      updatedQuests = quests.map((q) =>
        q.id === selectedQuest.id ? updatedQuest : q,
      );
    } else {
      updatedQuests = [
        ...quests,
        { ...updatedQuest, id: Date.now(), completed: {} },
      ];
    }
    setQuests(updatedQuests);
    localStorage.setItem("readBooksQuests", JSON.stringify(updatedQuests));
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

      <div className="px-6 py-4 w-full max-w-xs mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Daily Quests</h1>
          <p className="text-black font-semibold text-sm mb-4 mt-2">
            {format(selectedDay, "EEEE, MMMM d")}
          </p>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              const today = new Date();
              setSelectedDay(today);
              setCurrentDate(today);
            }}
            className="px-5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-2xl hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 ease-in-out block"
          >
            Today
          </button>
        </div>
        <div>
          <WeekDaysCarousel
            weekDays={weekDays}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            changeWeek={changeWeek}
          />
        </div>
        {loading ? (
          <div className="text-center text-gray-500 italic">
            Loading daily quests...
          </div>
        ) : (
          <QuestList
            quests={quests}
            selectedDay={selectedDay}
            handleToggle={handleToggle}
            openEditModal={openEditModal}
          />
        )}

        <AddQuestButton onAddQuest={handleAddQuest} />

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
          <SuggestedQuests quests={quests} setQuests={setQuests} />
        </div>
      </div>
    </div>
  );
};

export default DailyQuests;
