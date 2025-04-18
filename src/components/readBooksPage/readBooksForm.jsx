import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReadBooksForm = ({ setBookResolutions }) => {
  const [formData, setFormData] = useState({
    booksGoal: "",
    booksRead: "",
    currentlyReading: "",
    plannedBooks: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const savedResolutions =
      JSON.parse(localStorage.getItem("bookResolutions")) || [];
    if (savedResolutions.length > 0) {
      setFormData(savedResolutions[0]); // Load the single resolution into the form
    }
    setBookResolutions(savedResolutions);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
      <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-5 pb-5 w-[400px] max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Read more books resolution
        </h2>
        {successMessage && (
          <div className="mt-4 text-center">
            <p className="text-green-600">{successMessage}</p>
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do you have any specific books that you plan to read?
            </label>
            <input
              type="text"
              name="plannedBooks"
              value={formData.plannedBooks}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-32 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition mb-0"
            >
              Save
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              className="w-40 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
              onClick={() => navigate("/my-resolutions")}
            >
              Go to My Resolutions
            </button>
          </div>
        </form>
        <div>
          <h3 className="text-xl font-bold mt-4">Your Current Resolution</h3>
          <div className="p-2 border rounded-lg mt-2">
            <p>
              <strong>Books Goal:</strong> {formData.booksGoal}
            </p>
            <p>
              <strong>Books Read:</strong> {formData.booksRead}
            </p>
            <p>
              <strong>Currently Reading:</strong> {formData.currentlyReading}
            </p>
            <p>
              <strong>Planned Books:</strong> {formData.plannedBooks}
            </p>
            <p>
              <strong>Notes:</strong> {formData.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBooksForm;

