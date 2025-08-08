import React from "react";
import { Link } from "react-router";

const OverviewSection = () => {
  const youtubeVideoId = "Z44fFqBQQtg"; // Extracted from the provided URL

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-inter ">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Explore the World with Us
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover breathtaking destinations, unique experiences, and
            unforgettable journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="aspect-w-16 aspect-h-9 flex justify-center items-center ">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-[400px] w-full"
              ></iframe>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
              Your Journey, Our Passion
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              We believe every journey tells a story. From bustling cityscapes
              to serene natural wonders, our platform connects you with
              experiences that resonate with your adventurous spirit. Plan your
              next escape with ease, guided by expert insights and a community
              of fellow travelers.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-24 pt-12 border-t border-gray-100">
          <p className="text-xl sm:text-2xl text-gray-700 mb-8">
            Ready to start your adventure?
          </p>
          <Link to="/packages">
            <button className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold text-lg rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50">
              Start Planning Your Trip
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
