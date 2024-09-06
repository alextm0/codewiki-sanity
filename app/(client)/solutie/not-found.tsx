import { Link } from 'next-view-transitions';
import React from 'react';
import NotFoundSVG from '@/public/assets/not-found.svg';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-center">
      <div className="flex flex-col items-center space-y-6">
        {/* NotFound SVG */}
        <div className="w-64 h-64">
          <img src={NotFoundSVG.src} alt="Not Found" className="w-full h-full object-cover" />
        </div>
        
        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404 - Pagina nu există</h1>
        
        {/* Subtext */}
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Din păcate, nu există o pagină aici deocamdată. Te rugăm să încerci alte secțiuni!
        </p>

        {/* Call to Action */}
        <Link href="/">
          <div className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300">
            Înapoi Acasă
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
