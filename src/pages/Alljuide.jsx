import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaStar, FaEnvelope, FaCopy, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const TourGuides = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetch("https://travelserver-three.vercel.app/all-tour-guides")
      .then((res) => res.json())
      .then((data) => setGuides(data))
      .catch(() => toast.error("❗ Failed to load tour guides!"));
  }, []);

  return (
    <div className="grid w-11/12 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6  min-h-screen">
      {guides.map((guide) => (
        <motion.div
          key={guide._id}
          whileHover={{ scale: 1.05 }}
          className="text-white bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <img
            src={guide.image}
            alt={guide.name}
            className="w-full h-80 object-cover object-top"
          />

          <div className="p-4 text-black">
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
              {guide.name}
            </h2>
            <p className="text-gray-700 mb-2 flex items-center gap-1">
              <FaMapMarkerAlt /> {guide.location}
            </p>
            <span className="inline-block bg-black text-white px-2 py-1 rounded mb-2">
              {guide.expertise}
            </span>
            <div className="flex flex-wrap gap-2 text-sm mb-2">
              {guide.languages.map((lang, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-black px-2 py-0.5 rounded"
                >
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-gray-800 flex items-center gap-1">
              <FaStar className="text-yellow-500" /> {guide.rating} |{" "}
              {guide.years_experience} yrs experience
            </p>
            <Link to={`/tour-guide/${guide._id}`}>
              <button className="mt-3 font-semibold w-full border border-black rounded px-3 py-1 hover:bg-black hover:text-white flex items-center justify-center gap-2">
                View Profile
              </button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TourGuides;
