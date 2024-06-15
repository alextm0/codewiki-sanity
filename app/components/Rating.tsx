"use client"; // Add this line at the top

import React, { useState } from "react";
import Link from "next/link";

interface Params {
  stars: number;
  onBlogPost?: boolean;
}

function Rating({ stars, onBlogPost }: Params) {
  const [onHover, setOnHover] = useState(false);

  let starColor = "";
  let tooltipMessage = "Nu se intalneste aproape deloc, dar merita sa stii";
  let frequency = "Deloc intalnit";

  if (stars === 1) {
    starColor = onBlogPost ? "text-amber-800" : `${onHover ? "text-amber-800" : ""}`;
    tooltipMessage = "Destul de rar intalnit in aceasta sectiune";
    frequency = "Foarte rar";
  } else if (stars === 2) {
    starColor = onBlogPost ? "text-amber-600" : `${onHover ? "text-amber-600" : ""}`;
    tooltipMessage = "Nu este foarte frecvent la aceasta categorie, a aparut doar de cateva ori in ultimii ani";
    frequency = "Nu foarte frecvent";
  } else if (stars === 3) {
    starColor = onBlogPost ? "text-green-700" : `${onHover ? "text-green-700" : ""}`;
    tooltipMessage = "Posibilitatea este foarte mare sa apara la aceasta categorie";
    frequency = "Destul de frecvent";
  } else if (stars === 4) {
    starColor = onBlogPost ? "text-green-500" : `${onHover ? "text-green-500" : ""}`;
    tooltipMessage = "Apare foarte frecvent la aceasta sectiune si merita o atentie sporita";
    frequency = "Foarte frecvent";
  }

  return (
    <div className="flex items-end -mt-12">
      {[1, 2, 3, 4].map((index) => (
        <svg
          key={index}
          onMouseOver={() => setOnHover(true)}
          onMouseOut={() => setOnHover(false)}
          aria-hidden="true"
          className={`w-5 h-5 mb-[2px] ${stars >= index ? starColor : "text-gray-400"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{`${index} star`}</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      <div
        className={`mt-10 group relative inline-block underline underline-offset-4 decoration-1 ${starColor} decoration-dashed duration-300`}
      >
        <span onMouseOver={() => setOnHover(true)} onMouseOut={() => setOnHover(false)} className={`${onHover ? starColor : ""}`}>
          {frequency}
        </span>
        <span className="absolute hidden group-hover:flex top-7 right-20 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:left-1/2 before:-top-4 before:right-[100%] before:border-r-gray-700">
          {tooltipMessage}
        </span>
      </div>
    </div>
  );
}

export default Rating;
