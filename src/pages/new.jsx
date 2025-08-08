import React from "react";
import Lottie from "lottie-react";
import travelAnimationData from "../assets/travel.json"; // ✅ Make sure the path and file are correct
import { Link } from "react-router";

const LottieFeatureSection = () => {
  return (
    <section className="py-16  w-11/12 mx-auto sm:py-24 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Your Adventure Awaits
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed">
            Dive into a world of possibilities. Our platform makes planning your
            dream vacation seamless, connecting you with unique experiences and
            destinations tailored just for you. Let's make your next journey
            unforgettable.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link to="/packages">
              <button className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold text-lg rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50">
                Start Your Journey
              </button>
            </Link>
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-md p-3 rounded-full shadow-2xl border-8 border-gray-800 bg-transparent transform transition-all duration-300 hover:scale-[1.02]">
            <Lottie
              animationData={travelAnimationData}
              loop={true}
              autoplay={true}
              className="rounded-full bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LottieFeatureSection;
