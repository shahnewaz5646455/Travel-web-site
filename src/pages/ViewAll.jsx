import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import { useState } from "react";
import TourGuides from "./Alljuide";

// Fetch packages data
const fetchPackages = async () => {
  const { data } = await axios.get(
    "https://travelserver-three.vercel.app/all-packages"
  );
  return data;
};

// Fetch tour guides data
const fetchTourGuides = async () => {
  const { data } = await axios.get(
    "https://travelserver-three.vercel.app/all-tour-guides"
  );
  return data;
};

const PackagesAndGuides = () => {
  const navigate = useNavigate();

  // TanStack Query for packages
  const {
    data: packages,
    isLoading: packagesLoading,
    error: packagesError,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  // TanStack Query for tour guides
  const {
    data: tourGuides,
    isLoading: guidesLoading,
    error: guidesError,
  } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: fetchTourGuides,
  });

  if (packagesLoading || guidesLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  if (packagesError || guidesError)
    return (
      <div className="text-center text-[#393E46] py-10">Error loading data</div>
    );

  return (
    <div className="min-h-screen  w-11/12 mx-auto  py-12 px-4 sm:px-6 lg:px-8">
      {/* Packages Section */}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-4xl font-bold text-[#393E46] text-center mb-8">
          Our Travel Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages?.map((pkg) => (
            <motion.div
              key={pkg._id}
              className="bg-[#fffafa] rounded-xl shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Grid */}
              <div className="grid grid-cols-3 gap-2 p-4 h-64">
                {/* Portrait Images (Stacked Vertically) */}
                <div className="col-span-1 grid grid-rows-2 gap-2">
                  <img
                    src={pkg.images[0]}
                    alt={`${pkg.tripTitle} 1`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <img
                    src={pkg.images[1]}
                    alt={`${pkg.tripTitle} 2`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {/* Horizontal Image */}
                <div className="col-span-2">
                  <img
                    src={pkg.images[2]}
                    alt={`${pkg.tripTitle} 3`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              {/* Package Details */}
              <div className="p-6">
                <div className=" md:h-[80px]">
                  <h3 className="text-2xl font-semibold text-[#393E46]">
                    {pkg.tripTitle}
                  </h3>
                </div>
                <p className="text-[#6D9886] text-sm mb-2">{pkg.tourType}</p>

                <div className="flex flex-col items-start gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-[#6D9886]" />
                    <span className="text-[#393E46]">{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-[#6D9886]" />
                    <span className="text-[#393E46]">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-[#6D9886]" />
                    <span className="text-[#393E46]">{pkg.price} </span>
                  </div>
                </div>

                <Link to={`/Details/${pkg._id}`}>
                  <button className="btn bg-gray-900 font-semibold text-white w-full">
                    {" "}
                    Details{" "}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default PackagesAndGuides;
