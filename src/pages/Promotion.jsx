import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaTag, FaCheckCircle } from "react-icons/fa";

// Sample Package Data with Discounts
const packages = [
  {
    id: "pkg001",
    tourType: "Nature",
    tripTitle: "Sundarbans Mangrove Adventure",
    description:
      "Explore the world’s largest mangrove forest, home to the Royal Bengal Tiger. Enjoy a 3-day boat tour through serene waterways, spotting wildlife and visiting local villages.",
    price: 15000,
    discount: 30, // percentage
    duration: "3 Days",
    location: "Khulna, Bangladesh",
    images: [
      "https://i.postimg.cc/d38btvJX/sundarbans-5060068-640.jpg",
    ],
    highlights: ["Tiger tracking", "Bird watching", "Village visits"],
  },
  {
    id: "pkg002",
    tourType: "Beach",
    tripTitle: "Cox’s Bazar Coastal Escape",
    description:
      "Relax on the world’s longest natural sea beach. This 2-day trip includes beach activities, seafood dining, and a visit to Himchari National Park.",
    price: 8000,
    discount: 20,
    duration: "2 Days",
    location: "Cox’s Bazar, Bangladesh",
    images: [
      "https://i.postimg.cc/1zhDDQSM/images-1.jpg",
    ],
    highlights: ["Beach relaxation", "Seafood tasting", "Himchari waterfall"],
  },
  {
    id: "pkg003",
    tourType: "Historical",
    tripTitle: "Paharpur Buddhist Vihara Tour",
    description:
      "Discover the ancient Somapura Mahavihara, a UNESCO World Heritage Site. This 1-day tour explores the ruins of this 8th-century Buddhist monastery.",
    price: 5000,
    discount: 25,
    duration: "1 Day",
    location: "Naogaon, Bangladesh",
    images: [
      "https://i.postimg.cc/3xgk5DMC/images-2.jpg",
    ],
    highlights: [
      "UNESCO site",
      "Archaeological exploration",
      "Guided tour",
    ],
  },
];

export default function SalesPromotion() {
  return (
    <section className="py-12 px-6 md:px-16 ">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🔥 Hot Travel Deals & Discounts
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Limited-time offers – Book your adventure now and save big!
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, i) => {
          const discountedPrice = pkg.price - (pkg.price * pkg.discount) / 100;

          return (
            <motion.div
              key={pkg.id}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Image */}
              <motion.img
                src={pkg.images[0]}
                alt={pkg.tripTitle}
                className="w-full h-52 object-cover"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              />

              {/* Discount Badge */}
              <motion.div
                className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <FaTag /> {pkg.discount}% OFF
              </motion.div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800">{pkg.tripTitle}</h3>
                <p className="text-sm text-gray-500 mb-3">{pkg.description.slice(0, 90)}...</p>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" /> {pkg.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-green-500" /> {pkg.duration}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-purple-500" />{" "}
                    {pkg.highlights.slice(0, 2).join(", ")}...
                  </p>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xl font-bold text-red-500">
                    ${discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 line-through">
                    ${pkg.price.toLocaleString()}
                  </span>
                </div>

                {/* CTA */}
                <motion.button
                  className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
