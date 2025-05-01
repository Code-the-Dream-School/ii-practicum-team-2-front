import React, { useState, useEffect } from "react";
import NavbarTopDailyQuestsLoggedIn from "../dailyQuestsPage/NavbarTopDailyQuestsLoggedIn";
import ReadBooksCard from "../readBooksFormAndCard/ReadBooksCard";

import confetti4 from "../../assets/confetti4.png";
import DailyQuests from "../../pages/DailyQuests";

const DailyQuestsPage = () => {
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    const savedResolutions =
      JSON.parse(localStorage.getItem("bookResolutions")) || [];
    setResolutions(savedResolutions);
  }, []);

  const resolutionsToDisplay = resolutions;

  return (
    <div>
      <NavbarTopDailyQuestsLoggedIn />
      <div className="min-h-[160vh] bg-gray-100 px-6 py-6 pt-12">
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          {/* Title for My Resolutions */}
          <div className="flex justify-center mb-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center pb-4">
             Take Small Daily Steps Toward Your Resolutions!
            </h2>
          </div>

          <div className="absolute inset-x-0 top-16 z-1">
            {/* Adjust top value as needed */}
            <img
              src={confetti4}
              alt="Confetti"
              className="w-full h-auto"
              style={{ opacity: 0.4 }}
            />
          </div>

          {/* Flex container for components */}
          <div className="flex flex-col md:flex-row justify-center items-start space-x-0 md:space-x-4">
            {/* <div className="flex-1 max-w-md mx-2 z-0 "> */}
            <div className="flex-1 max-w-md mx-2 z-0 ">
              <DailyQuests />
            </div>

            <div className="flex-1 flex flex-col mx-2 z-0">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Your Progress
              </h3>
              <div className="flex flex-row gap-4 mx-2 z-0">
                {resolutionsToDisplay.length > 0 ? (
                  resolutionsToDisplay.map((resolution, index) => (
                    <ReadBooksCard key={index} resolution={resolution} />
                  ))
                ) : (
                  <p>No resolutions added yet!</p>
                )}
                {/* filler card */}
                <ReadBooksCard
                  resolution={{
                    booksGoal: 0,
                    booksRead: 0,
                    title: "Filler Card",
                  }}
                  className="w-[250px]"
                  variant="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuestsPage;
