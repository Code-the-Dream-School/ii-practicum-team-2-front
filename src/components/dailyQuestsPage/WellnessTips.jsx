import React from "react";
import PropTypes from "prop-types";

import waterImg from "../../assets/water.png";
import meditationImg from "../../assets/meditation.png";
import petImg from "../../assets/pet.png";
import walkingImg from "../../assets/walking.png";
import booksImg from "../../assets/books.png";
import sleepImg from "../../assets/sleep.png";

const wellnessTips = [
  {
    img: waterImg,
    alt: "Drink water",
    text: "Why should we drink water often?",
    href: "https://www.medicalnewstoday.com/articles/290814",
  },
  {
    img: meditationImg,
    alt: "Meditation benefits",
    text: "Benefits of regular meditation",
    href: "https://www.healthline.com/nutrition/12-benefits-of-meditation#anxiety",
  },
  {
    img: petImg,
    alt: "Get a pet",
    text: "Why should we get a pet?",
    href: "https://www.psychologytoday.com/us/blog/supersurvivors/202410/why-you-should-get-a-pet",
  },
  {
    img: walkingImg,
    alt: "Walking benefits",
    text: "Benefits of regular walking",
    href: "https://www.prevention.com/fitness/a20485587/benefits-from-walking-every-day/",
  },
  {
    img: booksImg,
    alt: "Books about wellness",
    text: "9 Books About Workplace Wellness",
    href: "https://health.calm.com/resources/blog/books-about-workplace-wellness/",
  },
  {
    img: sleepImg,
    alt: "Healthy sleep",
    text: "What to Know About Healthy Sleep",
    href: "https://www.healthline.com/health/healthy-sleep",
  },
];

const WellnessCard = ({ img, alt, text, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    referrerPolicy="no-referrer"
    className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white h-40"
  >
    <img src={img} alt={alt} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-indigo-600 bg-opacity-30" />
    <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 px-2 py-2 text-white text-s font-semibold leading-snug h-[50px] flex items-center justify-center text-left break-words whitespace-normal">
      {text}
    </div>
  </a>
);

WellnessCard.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

const WellnessTips = () => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Wellness Tips</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wellnessTips.map((tip, index) => (
          <WellnessCard key={index} {...tip} />
        ))}
      </div>
    </div>
  );
};

export default WellnessTips;
