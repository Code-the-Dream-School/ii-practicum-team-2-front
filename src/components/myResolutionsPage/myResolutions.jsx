import React, { useEffect, useState } from "react";
import ReadBooksCard from "../readBooksFormAndCard/readBooksCard";
import NavbarTopMyResoLoggedIn from "./NavbarTopMyResoLoggedIn";

const MyResolutions = ({ resolutions }) => {
  const [localResolutions, setLocalResolutions] = useState([]);

  useEffect(() => {
    const savedResolutions =
      JSON.parse(localStorage.getItem("bookResolutions")) || [];
    setLocalResolutions(savedResolutions);
  }, []);

  const resolutionsToDisplay =
    resolutions.length > 0 ? resolutions : localResolutions;

  return (
    <div>
      <NavbarTopMyResoLoggedIn />

      <div className="min-h-screen bg-gray-100 px-6 py-6">
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          <div className="flex items-center mb-4">
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800">My Resolutions</h2>
          </div>

          {resolutionsToDisplay.length > 0 ? (
            resolutionsToDisplay.map((resolution, index) => (
              <ReadBooksCard key={index} resolution={resolution} />
            ))
          ) : (
            <p>No resolutions added yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyResolutions;
