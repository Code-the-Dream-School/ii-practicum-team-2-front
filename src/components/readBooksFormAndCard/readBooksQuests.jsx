import React, { useState } from "react";
import QuestModal from "../dailyQuestsPage/QuestModal";
import AddQuestButton from "../dailyQuestsPage/AddQuestButton";
import ReadBooksQuestList from "./readBooksQuestList";
import { useNavigate } from "react-router-dom";

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
    title: "Visit a Local Library",
    icon: "🏛️",
    frequency: "Saturdays",
  },
  {
    id: 116,
    title: "Write a Book Review",
    icon: "📝",
    frequency: "Sundays",
  },
  {
    id: 117,
    title: "Listen to an audiobook",
    icon: "🎧",
    frequency: "Thursdays",
  },
  {
    id: 118,
    title: "Visit a book club",
    icon: "📚",
    frequency: "Tuesdays",
  },
];

function ReadBooksQuests() {
  const [quests, setQuests] = useState(initialQuests);
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [icon, setIcon] = useState("💰");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const navigate = useNavigate();

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

    const questFreqKey = (quest) =>
      `${quest.title.toLowerCase()}|${quest.icon}|${normalizeFrequency(quest.frequency)}`;

    const existingKeys = new Set(savedQuests.map(questFreqKey));
    const newQuests = quests.filter((q) => !existingKeys.has(questFreqKey(q)));

    const updatedQuests = [...savedQuests, ...newQuests];
    localStorage.setItem("readBooksQuests", JSON.stringify(updatedQuests));

    setQuests([]);
    navigate("/daily-quests");
  };

  return (
    <div className="bg-[#EDEDF4] rounded-[25px] border border-gray-300 shadow-lg p-6 w-full max-w-md min-w-[350px] mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 leading-tight max-w-[300px] mx-auto break-words">
        Add daily quests to help get your resolutions!
      </h1>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-s font-semibold text-gray-500">
            Read more books
          </h2>
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
          className="block mx-auto mt-4 px-10 py-1.5 rounded-full font-bold text-indigo-600 border-2 border-indigo-600 bg-gradient-to-r from-[#e3e8ff] to-[#e8e1f7] hover:scale-105 transition duration-300 ease-in-out shadow-md text-center"
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
