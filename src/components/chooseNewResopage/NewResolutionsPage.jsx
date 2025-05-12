import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
import { NavbarTop } from "../NavbarTop";
import fireworkImage from "../../assets/fireworks1.png";
import defaultIcon from "../../../src/assets/books.png"; // Default icon for other cards
import { fetchGoalTypes, useRefreshToken } from "../../api/api-calls";
import readMoreIcon from "../../assets/icons/readMoreIcon1.png"; 
import sleepMoreIcon from "../../assets/icons/sleepMoreIcon1.png"; 
import loseWeightIcon from "../../assets/icons/loseWeightIcon1.png"; 
import journalIcon from "../../assets/icons/journalIcon1.png"; 
import studyIcon from "../../assets/icons/studyIcon1.png"; 
import customResoIcon from "../../assets/icons/customResoIcon1.png"; 


function NewResolutions() {
  const navigate = useNavigate();
  const [goalTypes, setGoalTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const cachedGoalTypes = localStorage.getItem("goalTypes");
    if (cachedGoalTypes) {
      setGoalTypes(JSON.parse(cachedGoalTypes));
      setLoading(false);
    } else {
      loadGoalTypes();
    }
  }, []);

  const loadGoalTypes = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchGoalTypes();
      localStorage.setItem("goalTypes", JSON.stringify(data));
      setGoalTypes(data);
    } catch (err) {
      if (err.message.includes("401")) {
        try {
          await refreshToken();
          const data = await fetchGoalTypes();
          localStorage.setItem("goalTypes", JSON.stringify(data));
          setGoalTypes(data);
        } catch (refreshError) {
          setError("Session expired. Please log in again.");
        }
      } else {
        setError(err.message || "Failed to fetch goal types.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (title) => {
    if (title === "Read more books") {
      navigate("/read-books-resolution-goals");
    } else {
      navigate("/daily-quests");
    }
  };

  return (
    <div>
      <div className="relative z-10">
        <NavbarTop />
      </div>

      {/* Main container with grid layout */}
      <div className="min-h-screen bg-gray-100 px-6 py-6">
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          <div className="flex items-center mb-4">
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800">
              Choose a resolution
            </h2>

            {/* Firework Image */}
            <img
              src={fireworkImage}
              alt="Firework"
              className="absolute top-[50px] w-24 h-24 z-1 ml-80"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore popular resolutions designed to help you achieve your larger
            aspirations. Each pathway includes actionable steps to guide you on
            your journey to success.
          </p>
        </div>

        {/* Handle loading state */}
        {loading && (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        )}

        {/* Handle error state */}
        {error && (
          <div className="text-center text-red-500 text-lg">
            Failed to load resolutions: {error}
          </div>
        )}

        {/* Grid container */}
        {!loading && !error && (
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-6">
            {goalTypes.map((goal) => (
              <CardComponent
                key={goal.id}
                title={goal.name}
                content={goal.description || "No description available"}
                imageUrl={
                  goal.name === "Read more books" ? readMoreIcon : 
                  goal.name === "Sleep more" 
                  ? sleepMoreIcon : 
                  goal.name === "Lose Weight" 
                  ? loseWeightIcon :
                  goal.name === "Journal" 
                  ? journalIcon : 
                  goal.name === "Study" 
                  ? studyIcon :
                  goal.name === "Create Custom Goal" 
                  ? customResoIcon : defaultIcon
                }
                onClick={() => handleCardClick(goal.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewResolutions;
