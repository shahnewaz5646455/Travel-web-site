import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";

const reviews = [
  {
    name: "Sophia Taylor",
    location: "Paris, France",
    text: "Wayfind made my trip so effortless. I discovered hidden gems I would’ve never found on my own!",
    rating: 5,
  },
  {
    name: "Liam Johnson",
    location: "Tokyo, Japan",
    text: "The experience was beyond expectations. Smooth booking and incredible recommendations!",
    rating: 4,
  },
  {
    name: "Amelia Brown",
    location: "Bali, Indonesia",
    text: "Loved how everything was well-organized. I’ll definitely use Wayfind again for my next adventure!",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="py-12 px-6 md:px-16 ">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What Travelers Say
        </h2>
        <p className="text-gray-500 mt-2">
          Hear from people who explored the world with Wayfind
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            className="relative p-6 bg-white rounded-2xl shadow-lg flex flex-col justify-between"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Floating quote icon with infinite animation */}
            <motion.div
              className="absolute -top-4 -left-4 text-blue-400 text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaQuoteLeft />
            </motion.div>

            <p className="text-gray-600 italic mb-4">"{review.text}"</p>

            {/* Rating */}
            <div className="flex text-yellow-400 mb-4">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <FaStar key={idx} />
              ))}
            </div>

            {/* User Info */}
            <motion.div
              className="flex items-center gap-3 mt-auto"
              animate={{ x: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <FaUserCircle className="text-4xl text-blue-500" />
              <div>
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.location}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
