import React, { useState } from "react";
import readBooksIcon from "../../assets/readBooksIcon.png";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ReadBooksCard = ({ resolution }) => {
  const [isExpanded, setIsExpanded] = useState(false); //set to not show expanded content by default
  // const navigate = useNavigate();

  const percentage =
    resolution.booksGoal > 0
      ? (resolution.booksRead / resolution.booksGoal) * 100
      : 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); //To toggle the expanded state
  };
  const handleEditClick = () => {
    window.location.href = "/read-books-resolution-goals";
  };

  return (
    <div className="custom-page">
      <div
        className="card max-w-s rounded overflow-hidden shadow-lg bg-white"
        style={{ maxWidth: "280px", borderBottom: "8px solid #2596be" }}
      >
        {/* Image */}
        <img
          className="w-full h-26 object-cover"
          src={readBooksIcon}
          alt="Read Books Icon"
        />

        <div className="px-6 py-4">
          <h3 className="title font-bold text-2xl mb-1 flex items-center">
            <span>Read More Books&nbsp;</span>
            <span
              className="flex items-center text-gray-900           cursor-pointer hover:text-blue-500"
              onClick={handleEditClick}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24 "
                className="hover:fill-blue-600 transition-colors"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </span>
          </h3>

          <p className="text-gray-700 font-bold text-base mb-0">
            Books Goal:{" "}
            <span className="font-bold">{resolution.booksGoal}</span>
          </p>
          {resolution.booksRead && (
            <p className="text-gray-700 font-bold text-base">
              Books Read: {resolution.booksRead}
            </p>
          )}

          {/* Progress Bar */}
          <div className="relative pt-1 pb-2 mt-[-10] w-full mx-auto">
            <div className="flex mb-2 items-center justify-between">
              <div>
                {/* <span className="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full text-indigo-800 bg-indigo-200">
              In Progress
            </span> */}
              </div>
            </div>

            <div className="flex rounded-full h-3 bg-gray-300">
              <div
                style={{ width: `${percentage}%` }}
                className="rounded-full bg-indigo-600"
              ></div>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold inline-block text-indigo-700">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>

          {/* Down Arrow to Toggle Additional Information */}
          <div className="cursor-pointer" onClick={toggleExpand}>
            {/* <span className="text-gray-900 block text-center font-bold hover:text-cyan-700">
              Show More
            </span> */}
            <div className="flex justify-center">
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                style={{ strokeWidth: 5, transition: "transform 0.3s ease" }}
                aria-hidden="true"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(7px)";
                  e.currentTarget.style.stroke = "#2596be";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.stroke = "#111827";
                }}
              />
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4">
              {resolution.currentlyReading && (
                <p className="text-base text-gray-700 break-words mb-1">
                  <strong> Currently Reading: </strong>
                  {resolution.currentlyReading}
                </p>
              )}
              {resolution.plannedBooks && (
                <p className="text-base break-words mb-1">
                  <strong>Planned Books: </strong>
                  {resolution.plannedBooks}
                </p>
              )}
              {resolution.notes && (
                <p className="text-base break-words">
                  <strong>Notes: </strong>
                  {resolution.notes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadBooksCard;
