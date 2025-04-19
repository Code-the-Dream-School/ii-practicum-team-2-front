import React, { useState } from "react";
import AddResolutionQuests from "./pages/AddResolutionQuests";
// import ReadBooksCard from "./components/myResolutionsPage/readBooksCard";

const AddResolutionForm = () => {
  // State to store the list of resolutions
  const [resolutions, setResolutions] = useState([]);

  // State to store form input values
  const [formData, setFormData] = useState({
    booksGoal: "",
    booksRead: "",
    currentlyReading: "",
    plannedBooks: "",
    notes: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // addResolution(formData);
    setResolutions([...resolutions, formData]);
    // Reset form after submission
    setFormData({
      booksGoal: "",
      booksRead: "",
      currentlyReading: "",
      plannedBooks: "",
      notes: "",
    });
  };

  return (
    // <div>
    // <NavbarTopnewResoLoggedIn />
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white z-10">
      <div className="bg-white rounded-[25px] border border-gray-300 shadow-lg p-5 pb-5 w-[400px] max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Read more books resolution
        </h2>

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
              placeholder=""
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
              placeholder=""
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
              placeholder=""
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
              placeholder=""
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
              placeholder=""
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mb-0"
          >
            ADD RESOLUTION
          </button>
        </form>
        {/* <div className="mt-6 text-gray-800">
            {resolutions.map((resolution, index) => (
              <Card key={index} resolution={resolution} /> 
            ))}
          </div> */}
        {/* Display added resolutions */}
        {resolutions.length > 0 && (
          <div className="mt-6 text-gray-800">
            <h3 className="text-lg font-semibold mb-2">
              Read more books resolution
            </h3>
            {resolutions.map((resolution, index) => (
              <div key={index} className="mb-4">
                <p className="text-base font-medium">
                  {" "}
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
                  <p className="text-sm">
                    Planned Books: {resolution.plannedBooks}
                  </p>
                )}
                {resolution.notes && (
                  <p className="text-sm">Notes: {resolution.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AddResolutionQuests />
    </div>
  );
};

export default AddResolutionForm;
