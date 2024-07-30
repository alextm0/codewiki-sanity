import { Link } from 'next-view-transitions';
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen mt-[-84px] flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4 overflow-hidden">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Oops!</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          It might have been moved or deleted.
        </p>
        <Link href="/">
          <div className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Return Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
