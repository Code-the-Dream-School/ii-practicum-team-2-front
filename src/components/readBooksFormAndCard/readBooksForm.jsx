import React, { useState, useEffect } from "react";

const ReadBooksForm = ({ setBookResolutions }) => {
  const [formData, setFormData] = useState({
    booksGoal: "",
    booksRead: "",
    currentlyReading: "",
    plannedBooks: "",
    notes: "",
  });

  // const [goalTypes, setGoalTypes] = useState([]);
  // const [readMoreBooksId, setReadMoreBooksId] = useState(null);
  // const [successMessage, setSuccessMessage] = useState("");

  // useEffect(() => {
  //   const fetchGoalTypes = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/api/v1/goal-types");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setGoalTypes(data.data);
  //     } catch (error) {
  //       console.error("Error fetching goal types:", error);
  //     }
  //   };

  //   fetchGoalTypes();



  // // const url = "http://localhost:
  // 8000/api/v1/"

  // const GoalType = {
  //   "id": "string",
  //   "name": "Read More Books",
  //   "description": "Trade mindless scrolling on social media for the enjoyment of immersing yourself in the pages of a great book.",
  //   "goal_type_fields": [
  //     {
  //       "field_name": "string",
  //       "field_type": "number",
  //       "required": true,
  //       "trackable": true,
  //       "options": [
  //         "string"
  //       ]
  //     },

  //     {
  //       "field_name": "string",
  //       "field_type": "string",
  //       "required": true,
  //       "trackable": true,
  //       "options": [
  //         "string"
  //       ]
  //     }

  //   ]
  // }

  // const GoalTypes =
  //   {
  //     "data": [
  //       {
  //         "id": "7191f7af-deec-4fc1-93ae-7a9045a92553",
  //         "name": "Read more books",
  //         "description": "Trade mindless scrolling on social media for the enjoyment of immersing yourself in the pages of a great book."
  //       },
  //       {
  //         "id": "9e99ed92-c122-4072-8809-9dc142a732ef",
  //         "name": "Lose Weight",
  //         "description": "Focus on healthy eating and regular exercise to achieve your weight loss goals."
  //       }
  //     ]
  //   }

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const savedResolutions =
      JSON.parse(localStorage.getItem("bookResolutions")) || [];
    if (savedResolutions.length > 0) {
      setFormData(savedResolutions[0]); // Loads the single resolution into the form
    }
    setBookResolutions(savedResolutions);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //prevents negative values for booksGoal and booksRead
    if ((name === "booksGoal" || name === "booksRead") && Number(value) < 0) {
      alert("Books read cannot be negative.");
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.booksGoal ||
      formData.booksGoal < 0 ||
      formData.booksRead < 0
    ) {
      alert("Please provide a valid, non-negative books goal and books read.");
      return;
    }

    const updatedResolutions = [{ ...formData, id: Date.now() }]; // Always overwrite with a single resolution

    localStorage.setItem("bookResolutions", JSON.stringify(updatedResolutions));
    setBookResolutions(updatedResolutions); // Update the parent state with the single resolution

    setSuccessMessage("Your resolution has been saved!");
  };

  //Calculates the percentage of books read
  const percentage =
    formData.booksGoal > 0
      ? (formData.booksRead / formData.booksGoal) * 100
      : 0;

  return (
    // <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">

    <div className="bg-[#EDEDF4] rounded-[25px] border border-gray-300 shadow-lg p-5 pb-5 w-[400px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Read more books resolution
      </h2>
      {successMessage && (
        <div className="mt-4 mb-4 text-center ">
          <p className="text-violet-700 font-bold text-2xl">{successMessage}</p>
        </div>
      )}
      <form className="space-y-3 text-left" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How many books do you aim to read this year?
          </label>
          <input
            type="number"
            name="booksGoal"
            value={formData.booksGoal}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How many books did you read already in this year?
          </label>
          <input
            type="number"
            name="booksRead"
            value={formData.booksRead}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            // required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Is there something that you are currently reading?
          </label>
          <input
            type="text"
            name="currentlyReading"
            value={formData.currentlyReading}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={100}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Do you have any specific books that you plan to read?
          </label>
          <textarea
            // type="text"
            name="plannedBooks"
            value={formData.plannedBooks}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={500}
            placeholder="ex. 'The Great Gatsby', 'Lord of the Rings', 'Great Expectations'"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Is there anything else you would like to note?
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            maxLength={500}
            placeholder="ex. 'I want to read more books to improve my vocabulary and expand my knowledge on different subjects and skills.'"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-32 bg-indigo-600 text-white font-semibold p-2 rounded-full 
               hover:bg-blue-700 hover:scale-105 
               hover:shadow-lg hover:shadow-blue-500/50 
               transition duration-300 ease-in-out mb-0"
          >
            Save
          </button>
        </div>
      </form>

      {/* Progress Bar */}
      <div className="relative p-4 mt-4 max-w-sm mx-auto">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full text-indigo-800 bg-indigo-200">
              In Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold inline-block text-indigo-700">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
        <div className="flex rounded-full h-3 bg-gray-300">
          <div
            style={{ width: `${percentage}%` }}
            className="rounded-full bg-indigo-600"
          ></div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mt-4">Your Current Resolution</h3>
        <div className="p-2 border rounded-lg mt-2">
          <p>
            <strong>Books Goal:</strong> {formData.booksGoal}
          </p>
          <p>
            <strong>Books Read:</strong> {formData.booksRead}
          </p>
          <p
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>Currently Reading:</strong> {formData.currentlyReading}
          </p>
          <p
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>Planned Books:</strong> {formData.plannedBooks}
          </p>
          <p
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>Notes:</strong> {formData.notes}
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default ReadBooksForm;
