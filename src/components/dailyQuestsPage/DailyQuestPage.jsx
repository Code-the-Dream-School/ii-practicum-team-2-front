import React, { useState, useEffect } from "react";
import ReadBooksCard from "../readBooksFormAndCard/readBooksCard";
import WellnessTips from "../dailyQuestsPage/WellnessTips";
import { NavbarTop } from "../NavbarTop";
import confetti4 from "../../assets/confetti4.png";
import DailyQuests from "../../pages/DailyQuests";
import VisionBoard from "./../../components/dailyQuestsPage/VisionBoard";

const DailyQuestsPage = () => {
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    const savedResolutions =
      JSON.parse(localStorage.getItem("bookResolutions")) || [];
    setResolutions(savedResolutions);
  }, []);

  const resolutionsToDisplay = resolutions;

  return (
    <>
      <NavbarTop />
      <div className="min-h-[160vh] bg-gray-100 px-6 py-6 pt-12">
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          {/* Title */}
          <div className="flex justify-center mb-4">
            <h2 className="text-4xl font-bold text-gray-800 text-center pb-4">
              Take Small Daily Steps Toward Your Resolutions!
            </h2>
          </div>

          <div className="absolute inset-x-0 top-16 z-0">
            <img
              src={confetti4}
              alt="Confetti"
              className="w-full h-auto"
              style={{ opacity: 0.4 }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1 max-w-md mx-2 z-10">
              <DailyQuests />
            </div>

            <div className="flex-1 flex flex-col mx-2 z-0">
              <h3 className="pl-2 text-2xl font-bold text-gray-800 mb-4">
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
              <div className="flex flex-col mt-10 z-0">
                <VisionBoard maxImages={8} />
                <WellnessTips />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyQuestsPage;
