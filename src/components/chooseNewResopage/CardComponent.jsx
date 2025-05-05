import React from "react";
import "./CardComponent.css";

const CardComponent = ({ title, content, imageUrl, onClick }) => {
  return (
    <div
      className="newResolutionCard max-w-s rounded overflow-hidden shadow-lg bg-white"
      style={{ maxWidth: "250px" }}
      onClick={onClick}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      {/* Image */}
      {imageUrl && (
        <img
          className="w-full h-40 object-cover"
          src={imageUrl}
          alt="Card Image"
        />
      )}

      <div className="px-6 py-4">
        {/* Title */}
        <div className="title font-bold text-2xl mb-2">{title}</div>

        {/* Content */}
        <p className="text-gray-700 text-base">{content}</p>
      </div>

      {/* CTA Button */}
      {/* <div className="flex justify-start px-6">
        <button className="px-3 py-1.5 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </div> */}

      {/* Tags/Chips */}
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #books
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #reading
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #lifestyle
        </span>
      </div> */}
    </div>
  );
};

export default CardComponent;
