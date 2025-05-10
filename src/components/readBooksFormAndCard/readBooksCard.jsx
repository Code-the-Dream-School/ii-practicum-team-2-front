import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import readBooksIcon from "../../assets/readBooksIcon.png";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ReadBooksCard = ({ resolution, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false); //set to not show expanded content by default;
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const navigate = useNavigate();

  const percentage =
    resolution.booksGoal > 0
      ? (resolution.booksRead / resolution.booksGoal) * 100
      : 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); //To toggle the expanded state
  };

  const handleEditClick = () => {
    navigate("/read-books-resolution-goals");
  };

  const handleDeleteClick = () => {
    onDelete && onDelete();
  };

  return (
    <div className="custom-page">
      <div
        className="card max-w-s rounded overflow-hidden shadow-lg bg-white"
        style={{ maxWidth: "280px", borderBottom: "8px solid #2596be" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          if (!showMenu) setShowMenu(false);
        }}
      >
        {/* Image */}
        <div className="image-container relative w-full h-30 overflow-hidden">
          <img
            className="w-full h-26 object-cover"
            src={readBooksIcon}
            alt="Read Books Icon"
          />
          {(hovered || showMenu) && (
            <div
              className="dots-button absolute top-2 right-2 flex justify-center items-center h-8 w-8 bg-gray-900 bg-opacity-50 text-white rounded-full font-bold text-xl cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
              aria-label="More options"
              title="More options"
            >
              <EllipsisVerticalIcon
                className="w-7 h-7 text-white"
                style={{
                  stroke: "white",
                  strokeWidth: "1",
                  fill: "white",
                }}
              />
            </div>
          )}
          {showMenu && (
            <div
              className="menu-popup absolute top-12 right-4 bg-white border rounded-lg shadow-lg p-2"
              ref={menuRef}
            >
              <button
                onClick={handleEditClick}
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <PencilSquareIcon className="w-5 h-5 mr-2 text-gray-600" />
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                <TrashIcon className="w-5 h-5 mr-2 text-gray-600" />
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="px-5 py-2">
          <h3 className="title font-bold text-2xl text-gray-800 mb-1 flex items-center">
            <span>Read More Books&nbsp;</span>
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
                className={`h-6 w-6 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                style={{ strokeWidth: 4, transition: "transform 0.3s ease" }}
                aria-hidden="true"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(7px)";
                  e.currentTarget.style.stroke = "#2790b5";
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
