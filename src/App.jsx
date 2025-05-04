import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
// import AddResolutionForm from "./AddResolutionForm";
import NewResolutions from "./components/chooseNewResopage/NewResolutionsPage";
import DailyQuests from "./pages/DailyQuests";
import MyResolutions from "./components/myResolutionsPage/MyResolutionsPage";
import ReadBooksResolutionGoalsInput from "./components/readBooksResolutionGoalsInputPage/ReadBooksResolutionGoalsInputPage";
import DailyQuestsPage from "./components/dailyQuestsPage/DailyQuestPage";

const queryClient = new QueryClient();
class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "20px", color: "red" }}>
          <h1>Something went wrong in the App component</h1>
          <p>{this.state.error?.message || "Unknown error"}</p>
          <pre>
            {this.state.errorInfo?.componentStack || "No stack trace available"}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [message, setMessage] = useState("");
  const [resolutions, setResolutions] = useState([]);
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
              {/* <Route path="/add-resolution" element={<AddResolutionForm />} /> */}
              <Route path="/new-resolutions" element={<NewResolutions />} />
              <Route path="/daily-quests-old" element={<DailyQuests />} />

              <Route path="/daily-quests" element={<DailyQuestsPage />} />

              <Route
                path="/my-resolutions"
                element={<MyResolutions resolutions={resolutions} />}
              />
              <Route
                path="/read-books-resolution-goals"
                element={<ReadBooksResolutionGoalsInput />}
              />

              <Route
                path="/read-books-goals"
                element={<ReadBooksResolutionGoalsInput />}
              />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
