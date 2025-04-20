// src/App.jsx
import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAllData } from "./util/index";
import Home from "./pages/Home";
import SignUpForm from "./SignUpForm";
import SignInForm from "./pages/SignInForm";
import AddResolutionForm from "./AddResolutionForm";
import NewResolutions from "./components/newResopage/NewResolutions";
import DailyQuests from "./pages/DailyQuests";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();
const URL = "http://localhost:8000/api/v1/";

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <h1>Error: {this.state.error.message}</h1>;
    }
    return this.props.children;
  }
}

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const myData = await getAllData(URL);
        console.log("getAllData response:", JSON.stringify(myData, null, 2));
        setMessage(myData.data || JSON.stringify(myData));
      } catch (error) {
        console.error("getAllData error:", error.message, error.response?.data);
        setMessage("Failed to fetch data");
      }
    })();
    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <ErrorBoundary>
          <div>
            {message && <p>{message}</p>}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/add-resolution" element={<AddResolutionForm />} />
              <Route path="/new-resolutions" element={<NewResolutions />} />
              <Route path="/daily-quests" element={<DailyQuests />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
