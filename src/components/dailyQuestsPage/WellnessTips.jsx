import React from "react";

import waterImg from "../../assets/water.png";
import meditationImg from "../../assets/meditation.png";
import petImg from "../../assets/pet.png";
import walkingImg from "../../assets/walking.png";
import booksImg from "../../assets/books.png";
import sleepImg from "../../assets/sleep.png";

const WellnessTips = () => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Wellness Tips</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="https://www.medicalnewstoday.com/articles/290814"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white h-40"
        >
          <img
            src={waterImg}
            alt="Drink water"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 px-2 py-2 text-white text-sm font-semibold leading-snug h-[48px] flex items-center justify-center text-center break-words whitespace-normal">
            Why should we drink water often?
          </div>
        </a>
        <a
          href="https://www.healthline.com/nutrition/12-benefits-of-meditation#anxiety"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white h-40"
        >
          <img
            src={meditationImg}
            alt="Meditation benefits"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 px-2 py-2 text-white text-sm font-semibold leading-snug h-[48px] flex items-center justify-center text-center break-words whitespace-normal">
            Benefits of regular meditation
          </div>
        </a>
        <a
          href="https://www.psychologytoday.com/us/blog/supersurvivors/202410/why-you-should-get-a-pet"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white h-40"
        >
          <img
            src={petImg}
            alt="Get a pet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 px-2 py-2 text-white text-sm font-semibold leading-snug h-[48px] flex items-center justify-center text-center break-words whitespace-normal">
            Why should we get a pet?
          </div>
        </a>
        <a
          href="https://www.prevention.com/fitness/a20485587/benefits-from-walking-every-day/"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white h-40"
        >
          <img
            src={walkingImg}
            alt="Walking benefits"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 px-2 py-2 text-white text-sm font-semibold leading-snug h-[48px] flex items-center justify-center text-center break-words whitespace-normal">
            Benefits of regular walking
          </div>
        </a>
        <a
          href="https://health.calm.com/resources/blog/books-about-workplace-wellness/"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white h-40"
        >
          <img
            src={booksImg}
            alt="Books about wellness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 px-2 py-2 text-white text-sm font-semibold leading-snug h-[48px] flex items-center justify-center text-center break-words whitespace-normal">
            9 Books About Workplace Wellness
          </div>
        </a>
        <a
          href="https://www.healthline.com/health/healthy-sleep"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white h-40"
        >
          <img
            src={sleepImg}
            alt="Benefits of having a dog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600 bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 px-2 py-2 text-white text-sm font-semibold leading-snug h-[48px] flex items-center justify-center text-center break-words whitespace-normal">
            What to Know About Healthy Sleep
          </div>
        </a>
      </div>
    </div>
  );
};

export default WellnessTips;
