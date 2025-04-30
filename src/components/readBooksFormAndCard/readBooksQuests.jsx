import React, { useState } from "react";
import QuestModal from "../dailyQuestsPage/QuestModal";
import AddQuestButton from "../dailyQuestsPage/AddQuestButton";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ReadBooksQuestList from "./readBooksQuestList";

const normalizeFrequency = (freq) => {
  if (!freq) return "";
  const array = Array.isArray(freq)
    ? freq
    : freq.split(",").map((d) => d.trim());
  return array.sort().join(", ");
};

const initialQuests = [
  { id: 111, title: "Read 1 page", icon: "📘", frequency: "Daily" },
  {
    id: 112,
    title: "Write a List of Books You Want to Read",
    icon: "📋",
    frequency: "Tuesdays",
  },
  {
    id: 113,
    title: "Share a Book Recommendation to a friend",
    icon: "🤝",
    frequency: "Wednesdays",
  },
  {
    id: 114,
    title: "Set a Reading Time of 5 min",
    icon: "⏱",
    frequency: "Fridays",
  },
  {
    id: 115,
    title: "Organize your bookshelf",
    icon: "📚",
    frequency: "Mondays, Thursdays",
  },
  {
    id: 116,
    title: "Listen to an audiobook",
    icon: "🎧",
    frequency: "Tuesdays",
  },
  {
    id: 117,
    title: "Visit a local library",
    icon: "🏛️",
    frequency: "Saturdays",
  },
  {
    id: 118,
    title: "Write a book review",
    icon: "📝",
    frequency: "Wednesdays, Sundays",
  },
  { id: 119, title: "Visit a book club", icon: "👥", frequency: "Saturdays" },
  { id: 120, title: "Read a biography", icon: "📖", frequency: "Thursdays" },
  {
    id: 121,
    title: "Find 1 new book recommendation",
    icon: "🔍",
    frequency: "Mondays",
  },
  {
    id: 122,
    title: "Organize your reading notes",
    icon: "📔",
    frequency: "Thursdays, Saturdays",
  },
];

function ReadBooksQuests() {
  const [quests, setQuests] = useState(() => {
    const shuffled = [...initialQuests].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  });
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [icon, setIcon] = useState("💰");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = (quest) => {
    setSelectedQuestId(quest.id);
    setTitle(quest.title);
    setFrequency(quest.frequency);
    setIcon(quest.icon);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmit = () => {
    const savedQuests =
      JSON.parse(localStorage.getItem("readBooksQuests")) || [];

    let updatedSavedQuests = [...savedQuests];

    quests.forEach((quest) => {
      const questFreq = normalizeFrequency(quest.frequency);

      const existingIndex = updatedSavedQuests.findIndex((saved) => {
        const savedFreq = normalizeFrequency(saved.frequency);
        return (
          (saved.title.toLowerCase() === quest.title.toLowerCase() ||
            saved.title.toLowerCase().includes(quest.title.toLowerCase()) ||
            quest.title.toLowerCase().includes(saved.title.toLowerCase())) &&
          saved.icon === quest.icon &&
          savedFreq === questFreq
        );
      });

      if (existingIndex !== -1) {
        updatedSavedQuests[existingIndex] = quest;
      } else {
        updatedSavedQuests.push(quest);
      }
    });

    localStorage.setItem("readBooksQuests", JSON.stringify(updatedSavedQuests));

    setQuests([]);
    setSuccessMessage("Quests saved! Check your Daily Quests 🎯");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="bg-[#EDEDF4] rounded-[25px] border border-gray-300 shadow-lg p-6 w-full max-w-md min-w-[350px] mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center leading-tight max-w-[220px] mx-auto break-words">
        Add daily quests to help get your resolutions!
      </h1>
      {successMessage && (
        <div className="text-center mb-4 text-indigo-600 font-semibold">
          {successMessage}
        </div>
      )}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-700">
            Read more books
          </h2>
          <button
            onClick={() => {
              const shuffled = [...initialQuests].sort(
                () => 0.5 - Math.random(),
              );
              setQuests(shuffled.slice(0, 4));
            }}
            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:opacity-70 transition"
            title="Refresh Quests"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2 mb-4">
          {quests.length === 0 && (
            <p className="text-sm text-gray-400 italic my-8">
              No quests yet — click the + button to get started!
            </p>
          )}
          <ReadBooksQuestList
            quests={quests}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <AddQuestButton
            onAddQuest={() => {
              setSelectedQuestId(null);
              setTitle("");
              setFrequency("Daily");
              setIcon("💰");
              setShowModal(true);
            }}
            size="large"
          />
        </div>

        <button
          className="mt- mx-auto px-12 py-2 bg-indigo-600 text-white rounded-full font-semibold p-2 hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 ease-in-out block"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <QuestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        showDeleteButton={false}
        onSave={(updatedQuest) => {
          if (selectedQuestId) {
            setQuests((prev) =>
              prev.map((q) =>
                q.id === selectedQuestId ? { ...q, ...updatedQuest } : q,
              ),
            );
          } else {
            setQuests((prev) => [
              ...prev,
              { ...updatedQuest, id: Date.now(), completed: {} },
            ]);
          }
          setShowModal(false);
          setSelectedQuestId(null);
          setTitle("");
          setFrequency("Daily");
          setIcon("💰");
        }}
        title={title}
        setTitle={setTitle}
        frequency={frequency}
        setFrequency={setFrequency}
        icon={icon}
        setIcon={setIcon}
        isEditing={!!selectedQuestId}
      />
    </div>
  );
}

export default ReadBooksQuests;
