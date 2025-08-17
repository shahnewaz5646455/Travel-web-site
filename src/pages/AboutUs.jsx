import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaLink } from "react-icons/fa";
import {
  SiTailwindcss,
  SiFirebase,
  SiMongodb,
  SiJsonwebtokens,
} from "react-icons/si";
import DeveloperCard from "./Developer";

export default function AboutUs() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-inter bg-gradient-to-b ">
      <div className="w-[95%] sm:w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold  mb-4">
            👨‍💻 About the Developer
          </h1>
          <p className="text-gray-700 font-bold text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Passionate MERN Stack developer with a strong focus on performance,
            design, and user experience. I love building full-stack web
            applications that solve real-world problems.
          </p>
        </motion.div>

        {/* Developer Info */}
        <DeveloperCard></DeveloperCard>

        {/* Tech Stack */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🔧 Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-4xl text-green-300">
            {[
              FaHtml5,
              FaCss3Alt,
              SiTailwindcss,
              FaReact,
              SiFirebase,
              SiMongodb,
              SiJsonwebtokens,
            ].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i }}
              >
                <Icon title="Tech" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🚀 Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Project 1 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://i.postimg.cc/YCqW0Rzs/Screenshot-2025-08-09-163326.png"
                alt="thinkfast Project"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  ThinkFast - Assignment Management Platform
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Welcome to ThinkFast! A modern, user-friendly web application
                  for managing assignments, submissions, and collaborative
                  learning.
                </p>
                <a
                  href=" https://think-fast00.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline font-medium"
                >
                  <FaLink className="mr-1" /> Live Preview
                </a>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://i.postimg.cc/Y9wMjZr1/Screenshot-2025-07-28-081441.png"
                alt="Garder App Project"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
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
                  className="inline-flex items-center text-blue-600 hover:underline font-medium"
                >
                  <FaLink className="mr-1" /> Live Preview
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          className="mt-16 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} Shah Newaz . All rights reserved.
        </motion.div>
      </div>
    </div>
  );
}
