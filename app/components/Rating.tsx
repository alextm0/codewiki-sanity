"use client"; // Add this line at the top

import React from "react";

interface Params {
  stars: number;
  onHover?: boolean; // Accept onHover prop
  onBlogPost?: boolean;
}

function Rating({ stars, onHover }: Params) {
  const starColorClasses: { [key: number]: string } = {
    1: "text-gray-500",
    2: "text-yellow-500",
    3: "text-blue-500",
    4: "text-green-500",
  };

  let starColor = starColorClasses[stars] || "text-gray-400";
  let tooltipMessage = "Nu se întâlnește aproape deloc, dar merită să știi.";
  let importance = "Deloc important";

  if (stars === 1) {
    tooltipMessage = "Acest subiect este abordat rar, dar poate fi util.";
    importance = "Foarte rar";
  } else if (stars === 2) {
    tooltipMessage = "Acest subiect este abordat ocazional.";
    importance = "Nu foarte important";
  } else if (stars === 3) {
    tooltipMessage = "Acest subiect este abordat frecvent.";
    importance = "Destul de important";
  } else if (stars === 4) {
    tooltipMessage = "Acest subiect este foarte important și apare des.";
    importance = "Foarte important";
  }

  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4].map((index) => (
          <svg
            key={index}
            aria-hidden="true"
            className={`w-5 h-5 ${
              onHover ? (stars >= index ? starColor : "text-gray-300") : (stars >= index ? "text-gray-400" : "text-gray-300")
            } transition duration-300 ease-in-out`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{`${index} star`}</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
      <div className={`ml-2 group relative inline-block underline underline-offset-4 decoration-1 decoration-dashed`}>
        <span
          className={`${
            onHover ? starColor : "text-gray-600"
          } font-inter font-light transition duration-300 ease-in-out`}
        >
          {importance}
        </span>
        <span className="font-inter absolute hidden group-hover:flex -top-16 right-0 transform translate-x-1/2 w-56 px-3 py-2 bg-gray-800 rounded-lg text-center text-white text-sm shadow-md transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
          {tooltipMessage}
        </span>
      </div>
    </div>
  );
}

export default Rating;
