
import React, { useState, useEffect } from "react";
import NavbarTopnewResoLoggedIn from "../chooseNewResopage/NavbarTopnewResoLoggedIn";
import ReadBooksForm from "../readBooksFormAndCard/readBooksForm";
import AddResolutionQuests from "../../pages/AddResolutionQuests";
import confetti4 from "../../assets/confetti4.png";

const ReadBooksApp = () => {
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    const savedResolutions =
      JSON.parse(localStorage.getItem("bookResolutions")) || [];
    setResolutions(savedResolutions);
  }, []);

  return (
    <div>
      <NavbarTopnewResoLoggedIn />
      <div className="min-h-[160vh] bg-gray-100 px-6 py-6 pt-12">
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          {/* Title for My Resolutions */}
          {/* <div className="flex justify-center mb-4">
            <h2 className="text-4xl font-bold text-gray-800">My Resolutions</h2>
          </div> */}

          <div className="absolute inset-x-0 top-16 z-1">
            
            {/* Adjust top value as needed */}
            <img
              src={confetti4}
              alt="Confetti"
              className="w-full h-auto"
              style={{ opacity: 0.9 }}
            />
          </div>

          {/* Flex container for ReadBooksForm and AddResolutionQuests */}
          <div className="flex flex-col md:flex-row justify-center items-start space-x-0 md:space-x-4">
            <div className="flex-1 max-w-md mx-2 z-0 ">
              <ReadBooksForm setBookResolutions={setResolutions} />
            </div>

            <div className="flex-1 max-w-md mx-2 z-0">
              <AddResolutionQuests />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBooksApp;
