import React from "react";
import { format } from "date-fns";

const WeekDaysCarousel = ({
  weekDays,
  selectedDay,
  setSelectedDay,
  changeWeek,
}) => {
  return (
    <div className="flex items-center gap-2 mb-6 w-full justify-center">
      <button
        onClick={() => changeWeek("prev")}
        className="text-gray-500 text-3xl ml-2"
      >
        ‹
      </button>

      <div className="flex justify-center w-auto px-1">
        {weekDays.map(({ date, day, fullDate }) => (
          <button
            key={day}
            onClick={() => setSelectedDay(fullDate)}
            className={`flex flex-col items-center w-10 px-1.5 py-1.5 rounded-xl text-xs mx-0.5 ${
              selectedDay.getDate() === date &&
              selectedDay.getMonth() === fullDate.getMonth() &&
              selectedDay.getFullYear() === fullDate.getFullYear()
                ? "bg-indigo-600 text-white"
                : "bg-white text-[gray-800] hover:bg-indigo-600/10"
            } scroll-snap-start shadow-sm border border-gray-200`}
          >
            <span>{date}</span>
            <span className="text-[8px] text-gray-400">{day}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => changeWeek("next")}
        className="text-gray-500 text-3xl mr-2"
      >
        ›
      </button>
    </div>
  );
};

export default WeekDaysCarousel;
