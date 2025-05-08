import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
import { NavbarTop } from "../NavbarTop";
import readBooksIcon from "../../assets/readBooksIcon.png";
import fireworkImage from "../../assets/fireworks1.png";
import defaultIcon from "../../../src/assets/books.png"; // Default icon for other cards
import api from "../../util/auth";

function NewResolutions() {
  const navigate = useNavigate();
  const [goalTypes, setGoalTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch goal types from the Swagger API 
  useEffect(() => {
    const fetchGoalTypes = async () => {
      try {
        setLoading(true);
        setError(null);

        // fetches api
        const response = await api.get("/goal-types?limit=10&sort=id");

        setGoalTypes(response.data.data); // Update state with fetched data
      } catch (err) {
        // Logs any errors
        setError(err.response?.data?.message || "Failed to fetch resolutions.");
      } finally {
        // makes sure the loading state is updated
        setLoading(false);
      }
    };

    fetchGoalTypes();
  }, []);

  const handleCardClick = (title) => {
    if (title === "Read more books") {
      navigate("/read-books-resolution-goals");
    } else {
      navigate("/daily-quests");
    }
  };

  return (
    <div>
      <div className="relative z-10">
        <NavbarTop />
      </div>

      {/* Main container with grid layout */}
      <div className="min-h-screen bg-gray-100 px-6 py-6">
        <div className="max-w-screen-xl mx-auto px-6 mb-8">
          <div className="flex items-center mb-4">
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800">
              Choose a resolution
            </h2>

            {/* Firework Image */}
            <img
              src={fireworkImage}
              alt="Firework"
              className="absolute top-[50px] w-24 h-24 z-1 ml-80"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore popular resolutions designed to help you achieve your larger
            aspirations. Each pathway includes actionable steps to guide you on
            your journey to success.
          </p>
        </div>

        {/* Handle loading state */}
        {loading && (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        )}

        {/* Handle error state */}
        {error && (
          <div className="text-center text-red-500 text-lg">
            Failed to load resolutions: {error}
          </div>
        )}

        {/* Grid container */}
        {!loading && !error && (
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-6">
            {goalTypes.map((goal) => (
              <CardComponent
                key={goal.id}
                title={goal.name}
                content={goal.description || "No description available"}
                imageUrl={
                  goal.name === "Read more books"
                    ? readBooksIcon
                    : defaultIcon
                }
                onClick={() => handleCardClick(goal.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewResolutions;


// old code snippet+++++++++++++++++++++++++++++++++++++++
// import React from "react";
// import { useNavigate } from "react-router-dom";
// //import NavbarTopnewResoLoggedIn from "./NavbarTopnewResoLoggedIn";
// import CardComponent from "./CardComponent";
// import readBooksIcon from "../../assets/readBooksIcon.png";
// import { NavbarTop } from "../NavbarTop";

// function NewResolutions() {
//   const navigate = useNavigate();

//   const handleCardClick = (title) => {
//     if (title === "Read more books") {
//       navigate("/read-books-resolution-goals");
//     } else {
//       navigate("/daily-quests");
//     }
//   };

//   return (
//     <div>
//       <div className="relative z-10">
//         {/* <NavbarTopnewResoLoggedIn /> */}
//         <NavbarTop />
//       </div>

//       {/* Main container with grid layout */}
//       <div className="min-h-screen bg-gray-100 px-6 py-6">
//         <div className="max-w-screen-xl mx-auto px-6 mb-8">
//           <div className="flex items-center mb-4">
//             {/* Title */}
//             <h2 className="text-4xl font-bold text-gray-800">
//               Choose a resolution
//             </h2>

//             {/* Firework Image */}
//             <img
//               src="/src/assets/fireworks1.png"
//               alt="Firework"
//               className="absolute top-[50px] w-24 h-24 z-1 ml-80"
//             />
//           </div>

//           {/* Description */}
//           <p className="text-lg text-gray-600 max-w-3xl">
//             Explore popular resolutions designed to help you achieve your larger
//             aspirations. Each pathway includes actionable steps to guide you on
//             your journey to success.
//           </p>
//         </div>

//         {/* Grid container */}
//         <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-6">
//           {/* Card 1 */}
//           <CardComponent
//             title="Read more books"
//             content="Trade mindless scrolling on social media for the enjoyment of immersing yourself in the pages of a great book."
//             imageUrl={readBooksIcon}
//             onClick={() => handleCardClick("Read more books")}
//           />

//           {/* Card 2 */}
//           <CardComponent
//             title="Lose Weight"
//             content="Swap the couch for a workout and make fitness a part of your daily routine."
//             imageUrl={readBooksIcon}
//             onClick={() => handleCardClick("Read more books")}
//           />

//           {/* Card 3 */}
//           <CardComponent
//             title="Study"
//             content="Fuel your body with nutritious food for better health and energy."
//             imageUrl={readBooksIcon}
//           />

//           {/* Card 4 */}
//           <CardComponent
//             title="Sleep More"
//             content="Start budgeting, cutting unnecessary expenses, and building your savings."
//             imageUrl={readBooksIcon}
//           />

//           {/* Card 5 */}
//           <CardComponent
//             title="Journal"
//             content="Fuel your body with nutritious food for better health and energy."
//             imageUrl={readBooksIcon}
//           />

//           {/* Card 6 */}
//           <CardComponent
//             title="Create custom goal"
//             content="Start budgeting, cutting unnecessary expenses, and building your savings."
//             imageUrl={readBooksIcon}
//           />

//           {/* Card 7 */}
//           <CardComponent
//             title="Exercise Regularly"
//             content="Swap the couch for a workout and make fitness a part of your daily routine."
//             imageUrl={readBooksIcon}
//             onClick={() => handleCardClick("Read more books")}
//           />

//           {/* Card 8 */}
//           <CardComponent
//             title="Exercise Regularly"
//             content="Swap the couch for a workout and make fitness a part of your daily routine."
//             imageUrl={readBooksIcon}
//             onClick={() => handleCardClick("Read more books")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewResolutions;
