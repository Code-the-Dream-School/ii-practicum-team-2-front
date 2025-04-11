import React, { useState } from "react";
import QuestModal from "../components/QuestModal";

const initialQuests = [
  {
    id: 1,
    title: "Read 1 page a day",
    icon: "📘",
    frequency: "Daily",
  },
  {
    id: 2,
    title: "Write a List of Books You Want to Read",
    icon: "📋",
    frequency: "Tuesdays",
  },
  {
    id: 3,
    title: "Share a Book Recommendation to a friend",
    icon: "🤝",
    frequency: "Wednesdays",
  },
  {
    id: 4,
    title: "Set a Reading Time of 5 min",
    icon: "⏱",
    frequency: "Fridays",
  },
];

function AddResolutionQuests() {
  const [quests, setQuests] = useState(initialQuests);
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [icon, setIcon] = useState("💰");
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState(null);

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
    console.log("Submitting quests:", quests);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex items-start justify-end">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md min-w-[350px] mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center leading-tight">
          Add daily quests to
          <br />
          help get your
          <br />
          resolutions!
        </h1>
        <div className="w-full max-w-md">
          <h2 className="text-xs font-semibold text-gray-500 mb-2">
            Read more books
          </h2>
          <div className="space-y-2 mb-4">
          {quests.length === 0 && (
              <p className="text-sm text-gray-400 italic my-8">
                No quests yet — click the + button to get started!
              </p>
            )}
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
                        {quest.frequency}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(quest)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-[#3c50e0] hover:text-white border border-gray-200 transition-colors duration-200"
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
                      onClick={() => handleDelete(quest.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 hover:bg-[#3c50e0] hover:text-white border border-gray-200 transition-colors duration-200"
                      title="Delete"
                    >
                      <span className="text-xs font-extrabold">✕</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                setSelectedQuestId(null);
                setTitle("");
                setFrequency("Daily");
                setIcon("💰");
                setShowModal(true);
              }}
              className="w-full flex items-center bg-[#E5E5EB] rounded-xl p-3 gap-2 border border-gray-300"
              title="Add Quest"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-gray-500 text-sm font-bold">
                +
              </span>
              <span className="text-xs text-gray-600">Add a daily quest</span>
            </button>
          </div>

          <button
            className="mt-6 mx-auto px-12 py-2 bg-[#3c50e0] text-white rounded-full font-semibold text-sm block"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <QuestModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={() => {
            if (!title.trim()) {
              alert("Quest name is required.");
              return;
            }

            if (selectedQuestId) {
              setQuests((prev) =>
                prev.map((q) => {
                  if (q.id === selectedQuestId) {
                    return {
                      ...q,
                      title: title,
                      frequency: frequency,
                      icon: icon,
                    };
                  } else {
                    return q;
                  }
                }),
              );
            } else {
              setQuests((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  title: title,
                  frequency: frequency,
                  icon: icon,
                },
              ]);
            }
            setShowModal(false);
            setSelectedQuestId(null);
            setTitle("");
            setFrequency("Daily");
            setIcon("💰");
          }}
          isEditing={!!selectedQuestId}
          title={title}
          setTitle={setTitle}
          frequency={frequency}
          setFrequency={setFrequency}
          icon={icon}
          setIcon={setIcon}
        />
      </div>
    </div>
  );
}

export default AddResolutionQuests;