import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
// import laptopImage from '../assets/laptopImage.png';
// import phoneImage from '../assets/phoneImage.png';
import laptopHero from "../../dist/assets/laptopHero.png";

function Home() {
  return (
    <div className="h-screen w-full relative bg-white">
      <div className="h-[500px] w-full absolute bottom-0 bg-gradient-to-t from-indigo-300 to-transparent z-1"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full min-h-[calc(100vh-64px)] px-4 md:px-12 py-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-full md:max-w-[50%] mb-8 md:mb-0">
          {/* Logo and Title */}
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="Resolution Tracker Logo"
              className="w-10 md:w-12 mr-3"
            />
            <span
              className="text-indigo-950 text-xl md:text-xl font-bold"
              style={{ lineHeight: "1" }}
            >
              Resolution <br />
              Tracker
            </span>
          </div>
          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl font-bold text-indigo-950 mb-8 text-left"
            style={{ lineHeight: "1.2" }}
          >
            Achieve Your <br />
            Dreams with <br />
            Resolution Tracker
          </h1>
          {/* Buttons */}
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-800 transition hover:-translate-y-1 hover:scale-105"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="bg-transparent border-2 border-indigo-900 text-indigo-900 text-lg font-bold py-2 px-8 rounded-full hover:bg-indigo-200 hover:border-indigo-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-200 hover:to-blue-200 hover:shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex-1 w-full max-w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-[600px] md:max-w-[50vw]">
            {/* <img
              src={laptopImage}
              alt="Laptop Screen"
              className="w-full"
            />
            <img
              src={phoneImage}
              alt="Phone Screen"
              className="absolute w-32 md:w-40 bottom-2 right-2 transform translate-x-[20%]"
            /> */}
            <img src={laptopHero} alt="Laptop Screen" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
