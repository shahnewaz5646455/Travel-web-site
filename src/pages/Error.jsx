import React from 'react';
import { Ghost } from 'lucide-react'; // Importing the Ghost icon for a "lost page" feel

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-200 text-gray-800 p-4 sm:p-6 relative overflow-hidden">
      {/* Background circles for visual interest */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105 relative z-10 border border-gray-100">
        <Ghost className="mx-auto text-purple-600 w-24 h-24 sm:w-28 sm:h-28 mb-6 animate-bounce-slow" /> {/* Ghost icon for 404 */}

        <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-900 mb-4 tracking-tight drop-shadow-lg">
          404
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </p>
        <p className="text-md sm:text-lg text-gray-600 mb-8 leading-relaxed">
          It looks like the page you're trying to reach has vanished into thin air,
          or perhaps it never existed. Don't worry, you can always go back home!
        </p>
        <button
          onClick={() => window.location.href = '/'} // Redirects to the home page
          className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Take Me Home
        </button>
      </div>

      {/* Tailwind CSS keyframes for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Error;
