import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import AddResolutionForm from './AddResolutionForm';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <Router>
    <div>
      {message && <p>{message}</p>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/add-resolution" element={<AddResolutionForm />} />
      </Routes>
    </div>
  </Router>
  );

}

export default App
