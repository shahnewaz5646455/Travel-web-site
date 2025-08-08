import React from 'react';
import { Ban } from 'lucide-react'; // Importing the Ban icon from lucide-react

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-200 text-gray-800 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105">
        <Ban className="mx-auto text-red-600 w-20 h-20 mb-6 animate-bounce" /> {/* Forbidden icon */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Access Denied!
        </h1>
        <p className="text-xl sm:text-2xl text-red-700 mb-6 font-medium">
          You are not allowed to access this page.
        </p>
        <p className="text-md sm:text-lg text-gray-500 mb-8 leading-relaxed">
          It seems you do not have the necessary permissions to view this content.
          Please ensure you are logged in with an authorized account.
        </p>
        <button
          onClick={() => window.location.href = '/'} // Redirects to the home page
          className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
