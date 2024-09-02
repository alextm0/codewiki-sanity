import { Link } from 'next-view-transitions';
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen mt-[-84px] flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4 overflow-hidden">
      <div className="flex flex-col items-center max-w-lg">
        {/* 404 Icon or Illustration */}
        <div className="mb-6">
          {/* Replace this with an SVG or image */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm1 18h-2v-2h2v2zm0-4h-2V7h2v7z" />
          </svg>
        </div>
        {/* Main Message */}
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Pagina nu a fost gasita</h2>
        <p className="mb-6 mt-4 text-gray-600 dark:text-gray-400">
          Este posibil să fi fost mutată sau ștearsă.
        </p>
        {/* Call to Action */}
        <Link href="/">
          <div className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300">
            Înapoi Acasă
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
