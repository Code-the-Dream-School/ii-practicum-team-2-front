import React from "react";

const ReadBooksCard = ({ resolution }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">Read More Books Resolution</h3>
      <p className="text-base font-medium">
        Books Goal: {resolution.booksGoal}
      </p>
      {resolution.booksRead && (
        <p className="text-sm">Books Read: {resolution.booksRead}</p>
      )}
      {resolution.currentlyReading && (
        <p className="text-sm">
          Currently Reading: {resolution.currentlyReading}
        </p>
      )}
      {resolution.plannedBooks && (
        <p className="text-sm">Planned Books: {resolution.plannedBooks}</p>
      )}
      {resolution.notes && <p className="text-sm">Notes: {resolution.notes}</p>}
    </div>
  );
};

export default ReadBooksCard;
