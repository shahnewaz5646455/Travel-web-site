import React from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaLink,
  FaGithub,
  FaUserCircle,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFirebase,
  SiMongodb,
  SiJsonwebtokens,
} from "react-icons/si";

export default function AboutUs() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="w-[95%] sm:w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-800 mb-4">
            👨‍💻 About the Developer
          </h1>
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg max-w-xl sm:max-w-2xl mx-auto">
            Passionate MERN Stack developer with a strong focus on performance,
            design, and user experience. I love building full-stack web
            applications that solve real-world problems.
          </p>
        </div>

        {/* Developer Info */}
        <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Shah Newaz
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Front-End & MERN Stack Web Developer. 2+ years of experience in
              building interactive and scalable web apps.
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Specialized in creating modern UI with React, TailwindCSS,
              Firebase, MongoDB, and JWT for authentication.
            </p>
          </div>
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <img
              className="rounded-lg w-48 sm:w-64 md:w-[300px] h-auto"
              src="https://i.postimg.cc/cHrxpwLz/PXL-20241124-124936993-PORTRAIT-2.jpg"
              alt="Shah Newaz"
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
            🔧 Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-3xl sm:text-4xl text-blue-600">
            <FaHtml5 title="HTML5" />
            <FaCss3Alt title="CSS3" />
            <SiTailwindcss title="Tailwind CSS" />
            <FaReact title="React" />
            <SiFirebase title="Firebase" />
            <SiMongodb title="MongoDB" />
            <SiJsonwebtokens title="JWT Auth" />
          </div>
        </div>

        {/* Projects */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
            🚀 Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Project 1 */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://i.postimg.cc/NM7YXDFZ/Screenshot-2025-06-20-000240.png"
                alt="Subscribe Box Project"
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Subscribe Box
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Newsletter subscription app built with TailwindCSS and React.
                </p>
                <a
                  href="https://subscribe-box-002.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline font-medium text-sm sm:text-base"
                >
                  <FaLink className="mr-1" /> Live Preview
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://i.postimg.cc/Y9wMjZr1/Screenshot-2025-07-28-081441.png"
                alt="Garder App Project"
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Garder App
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  A modern gardening management app built with Firebase and
                  MongoDB.
                </p>
                <a
                  href="https://garderapp.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline font-medium text-sm sm:text-base"
                >
                  <FaLink className="mr-1" /> Live Preview
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-gray-400">
          © {new Date().getFullYear()} Newaz Hossain. All rights reserved.
        </div>
      </div>
    </div>
  );
}