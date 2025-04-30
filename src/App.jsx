import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllData } from './util/index';
import Home from './pages/Home';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import AddResolutionForm from './AddResolutionForm';
import NewResolutions from './components/chooseNewResopage/NewResolutions';
import DailyQuests from './pages/DailyQuests';
import ReadBooksResolutionGoalsInput from './components/readBooksResolutionGoalsInputPage/ReadBooksResolutionGoalsInput';


const queryClient = new QueryClient();
const URL = 'https://ii-practicum-team-2-back.onrender.com/api/v1';


class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };


  static getDerivedStateFromError(error) {
    return { error };
  }


  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ error, errorInfo });
  }


  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong in the App component</h1>
          <p>{this.state.error?.message || 'Unknown error'}</p>
          <pre>{this.state.errorInfo?.componentStack || 'No stack trace available'}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}


function App() {
  const [message, setMessage] = useState('');
  const [resolutions, setResolutions] = useState([]);


  useEffect(() => {
    (async () => {
      try {
        const myData = await getAllData(URL);
        console.log('getAllData response:', JSON.stringify(myData, null, 2));
        setMessage(myData.data || JSON.stringify(myData));
      } catch (error) {
        console.error('getAllData error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setMessage('Failed to fetch data');
      }
    })();
    return () => {
      console.log('unmounting');
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
              <Route path="/read-books-goals" element={<ReadBooksResolutionGoalsInput />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
}


export default App;
