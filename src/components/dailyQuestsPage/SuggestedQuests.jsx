import { useState, useEffect } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const initialSuggestions = [
  { title: "Do yoga", icon: "🧘", frequency: "Mondays, Wednesdays, Fridays" },
  { title: "Eat a healthy meal", icon: "🥗", frequency: "Daily" },
  { title: "Call a friend", icon: "📞", frequency: "Tuesdays, Saturdays" },
  { title: "Write gratitude journal", icon: "📒", frequency: "Sundays" },
  { title: "Meal prep for the week", icon: "🍳", frequency: "Sundays" },
  { title: "Go for a walk", icon: "🚶‍♂️", frequency: "Mondays, Thursdays" },
  { title: "Cancel one subscription", icon: "❌", frequency: "Wednesdays" },
  { title: "Limit screen time before bed", icon: "📵", frequency: "Daily" },
  { title: "Plan a weekend trip", icon: "🧳", frequency: "Fridays" },
  { title: "Attend 1 social event", icon: "🎉", frequency: "Thursdays" },
];

function SuggestedQuests({ quests, setQuests }) {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [userQuests, setUserQuests] = useState([]);

  const isLocal = true;

  function getRandomSuggestions(list) {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(3, shuffled.length));
  }

  useEffect(() => {
    if (isLocal) {
      setSuggestions(getRandomSuggestions(initialSuggestions));
    } else {
      async function fetchSuggestions() {
        try {
          const response = await fetch("/api/v1/daily-quests/suggestions", {
            headers: {
              Authorization: `Bearer ${yourTokenHere}`,
            },
          });
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }

      fetchSuggestions();
    }
  }, []);

  const filteredSuggestions = suggestions.filter((suggestion) => {
    return (
      !quests.some((quest) => quest.title === suggestion.title) &&
      !userQuests.some((quest) => quest.title === suggestion.title)
    );
  });

  function handleRefresh() {
    if (isLocal) {
      const availableSuggestions = initialSuggestions.filter((suggestion) => {
        return !quests.some((quest) => quest.title === suggestion.title);
      });

      const shuffled = [...availableSuggestions].sort(
        () => 0.5 - Math.random(),
      );
      setSuggestions(shuffled.slice(0, Math.min(3, shuffled.length)));
    } else {
      async function fetchSuggestions() {
        try {
          const response = await fetch("/api/v1/daily-quests/suggestions", {
            headers: {
              Authorization: `Bearer ${yourTokenHere}`,
            },
          });
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }

      fetchSuggestions();
    }
  }

  return (
    <div className="py-4 w-full mx-auto bg-transparent">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-500 flex-grow">
          Suggestions
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => setShowSuggestions((prev) => !prev)}
            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:opacity-70 transition"
            aria-label="Toggle Suggestions"
            type="button"
          >
            {showSuggestions ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeSlashIcon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleRefresh}
            className="w-5 h-5 flex items-center justify-center text-gray-500 hover:opacity-70 transition"
            aria-label="Refresh Suggestions"
            type="button"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      {showSuggestions && (
        <div>
          {filteredSuggestions.length > 0 ? (
            <ul className="space-y-1.5 w-full">
              {filteredSuggestions.map((s, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 rounded-xl border border-gray-200 shadow-sm bg-white w-full"
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
                  <div className="flex gap-2">
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
                      className="w-5 h-5 flex items-center justify-center rounded-[6px] border-2 border-indigo-600 bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 transition-colors leading-none pb-[2px]"
                    >
                      <span className="text-sm font-bold leading-none">+</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic text-center mt-4">
              No suggestions available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestedQuests;
