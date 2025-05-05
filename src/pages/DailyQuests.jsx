import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import QuestModal from "../components/dailyQuestsPage/QuestModal";
import SuggestedQuests from "../components/dailyQuestsPage/SuggestedQuests";
import WeekDaysCarousel from "../components/dailyQuestsPage/WeekDaysCarousel";
import QuestList from "../components/dailyQuestsPage/QuestList";
import AddQuestButton from "../components/dailyQuestsPage/AddQuestButton";
import { filterDefaultQuests } from "../util/questUtils";
import { daysOfWeek } from "../util/dateConsts";
import { defaultQuests } from "../util/questConsts";
import { useQuestHandlers } from "../hooks/useQuestHandlers";

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
  const savedBookQuests =
    JSON.parse(localStorage.getItem("readBooksQuests")) || [];
  const filteredDefaultQuests = filterDefaultQuests(
    defaultQuests,
    savedBookQuests
  );

  useEffect(() => {
    const combinedQuests = [
      ...savedBookQuests.map((quest) => ({ ...quest, completed: {} })),
      ...filteredDefaultQuests,
    ];
    setQuests(combinedQuests);
    setLoading(false);
  }, []);

  const handleToggle = (questId) => {
    const dateKey = format(selectedDay, "yyyy-MM-dd");
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? {
              ...quest,
              completed: {
                ...(quest.completed || {}),
                [dateKey]: !quest.completed?.[dateKey],
              },
            }
          : quest
      )
    );
  };

  const resetModalState = (quest = null) => {
    setSelectedQuest(quest);
    setTitle(quest?.title || "");
    setFrequency(quest?.frequency || "Daily");
    setIcon(quest?.icon || "💰");
    setShowModal(true);
  };

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

  const { handleSave, handleDelete } = useQuestHandlers(
    quests,
    setQuests,
    selectedQuest,
    setShowModal
  );

  const goToToday = () => {
    const today = new Date();
    setSelectedDay(today);
    setCurrentDate(today);
  };

  return (
    <>
      <div className="px-6 py-4 w-full max-w-xs mx-auto bg-gray-200 rounded-2xl shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Daily Quests</h1>
          <p className="text-black font-semibold text-sm mb-4 mt-2">
            {format(selectedDay, "EEEE, MMMM d")}
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={goToToday}
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
        <AddQuestButton onAddQuest={resetModalState} />
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
    </>
  );
};

export default DailyQuests;
