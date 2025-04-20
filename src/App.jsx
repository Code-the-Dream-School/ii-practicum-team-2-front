import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Link } from "react-router-dom";
import Home from "./Home";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import AddResolutionForm from "./AddResolutionForm";
// import NavbarTopLoggedIn from "./components/newResopage/NavbarTopLoggedIn";
import NewResolutions from "./components/chooseNewResopage/NewResolutions";
import DailyQuests from "./pages/DailyQuests";
import MyResolutions from "./components/myResolutionsPage/MyResolutions";
import ReadBooksForm from "./components/readBooksFormAndCard/readBooksForm";
import ReadBooksResolutionGoalsInput from "./components/readBooksResolutionGoalsInputPage/ReadBooksResolutionGoalsInput";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <Router>
      <div>
        {/* <NavbarTopLoggedIn /> */}

        {message && <p>{message}</p>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/add-resolution" element={<AddResolutionForm />} />
          <Route path="/new-resolutions" element={<NewResolutions />} />
          <Route path="/daily-quests" element={<DailyQuests />} />

          <Route path="/read-books-resolution-goals" element={<ReadBooksResolutionGoalsInput />} />

          <Route
            path="/my-resolutions"
            element={<MyResolutions resolutions={resolutions} />}
          />

          {/* <Route
            path="/read-books-form"
            element={
              <ReadBooksForm
                setBookResolutions={(newResolutions) => {
                  console.log("Updating Resolutions in App:", newResolutions); // Debugging
                  setResolutions(newResolutions);
                }}
              />
            }
          /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
