import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import laptopImage from '../assets/laptopImage.png';
import phoneImage from '../assets/phoneImage.png';

function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 overflow-x-hidden">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full min-h-[calc(100vh-64px)] px-4 md:px-12 py-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-full md:max-w-[50%] mb-8 md:mb-0">
          {/* Logo and Title */}
          <div className="flex items-center mb-4">
            <img src={logo} alt="Resolution Tracker Logo" className="w-10 md:w-12 mr-3" />
            <span className="text-text-black text-xl md:text-2xl font-bold">
              Resolution Tracker
            </span>
          </div>
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-text-black leading-tight mb-8">
            Achieve Your <br />
            Dreams with <br />
            Resolution Tracker
          </h1>
          {/* Buttons */}
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-indigo-900 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="bg-transparent border-2 border-indigo-900 text-indigo-900 font-semibold py-3 px-8 rounded-full hover:bg-indigo-900 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex-1 w-full max-w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[600px] md:max-w-[50vw]">
            <img
              src={laptopImage}
              alt="Laptop Screen"
              className="w-full"
            />
            <img
              src={phoneImage}
              alt="Phone Screen"
              className="absolute w-32 md:w-40 bottom-2 right-2 transform translate-x-[20%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;