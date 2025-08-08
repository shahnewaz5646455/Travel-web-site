import React, { useEffect } from "react";
import { FaPlaneDeparture, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";

export default function Banner() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto pt-3 flex flex-col lg:flex-row items-center justify-center">
      {/* Left Side */}
      <div
        className="flex-1 flex flex-col items-center lg:items-start justify-center px-4 sm:px-8 py-8"
        data-aos="fade-right"
      >
        {/* Top Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto items-center">
          <motion.button
            className="btn btn-outline btn-lg rounded-full border-black text-black hover:bg-black hover:text-white transition flex items-center gap-2 w-full sm:w-auto"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link className="flex gap-1 justify-center items-center" to="/packages">
              <FaMapMarkedAlt className="text-xl" />
              Plan
            </Link>
          </motion.button>
          <motion.button
            className="btn btn-outline btn-lg rounded-full border-black text-black hover:bg-black hover:text-white transition flex items-center gap-2 w-full sm:w-auto"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link className="flex justify-center items-center gap-1" to="/community">
              <FaPlaneDeparture className="text-xl" />
              Travel
            </Link>
          </motion.button>
        </div>
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-6 leading-tight text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Elevate your
          <br />
          journey, embrace
          <br />
          the wild.
        </motion.h1>
        {/* Get Started Button */}
        <motion.button
          className="btn btn-lg w-full sm:w-52 rounded-full bg-black text-white hover:bg-white hover:text-black border-black transition mt-4 px-8"
          whileHover={{
            scale: 1.07,
            backgroundColor: "#fff",
            color: "#000",
            borderColor: "#000",
          }}
          whileTap={{ scale: 0.96 }}
        >
          <Link to="/packages">Get started now</Link>
        </motion.button>
        {/* Stats */}
        <div className="flex flex-col md:flex-row w-full h-auto md:h-32 items-center justify-between mt-8 gap-6 md:gap-0">
          {/* Left Stat */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <span className="text-3xl sm:text-4xl font-extrabold text-black">
              150+
            </span>
            <span className="text-gray-700 text-base font-medium mt-1 text-center">
              <Link to="/packages">Planned trip</Link>
              <br className="hidden md:block" /> every month
            </span>
          </motion.div>
          {/* Divider */}
          <div className="w-full h-px bg-gray-300 md:w-px md:h-14 md:bg-gray-300 mx-0 md:mx-6 my-4 md:my-0"></div>
          {/* Right Stat */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <span className="text-3xl sm:text-4xl font-extrabold text-black">
              6
            </span>
            <span className="text-gray-700 text-base font-medium mt-1 text-center">
              Guinness
              <br className="hidden md:block" /> world record
            </span>
          </motion.div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center w-full lg:w-auto mt-10 lg:mt-0">
        <motion.div
          className="w-[90vw] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl overflow-hidden"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <img
            src="https://i.postimg.cc/tRt6F67F/free-vector-bangladesh-map-101265-Bangladesh-Map.png"
            alt="Bangladesh Map"
            className="w-full h-64 sm:h-80 md:h-96 object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
