import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router";
import { FaBoxOpen, FaUsers, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "react-tabs/style/react-tabs.css";
import { Links } from "react-router";

export default function OurPakage() {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://travelserver-three.vercel.app/random-packages").then(
        (res) => res.json()
      ),
      fetch("https://travelserver-three.vercel.app/random-tour-guides").then(
        (res) => res.json()
      ),
    ])
      .then(([packagesData, guidesData]) => {
        setPackages(packagesData || []);
        setGuides(guidesData?.slice(0, 6) || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10 px-2">
      <Tabs>
        <TabList className="tabs tabs-boxed gap-2 flex flex-wrap justify-center mb-8 bg-gray-300 rounded-xl items-center shadow-2xl p-2 max-w-3xl mx-auto">
          <Tab className="tab text-lg font-semibold flex  items-center gap-3 px-6 text-gray-300 hover:text-white data-[selected]:bg-white data-[selected]:text-black data-[selected]:shadow-md rounded-lg transition-all duration-300 hover:bg-gray-800">
            <div className="flex justify-center items-center gap-1">
              <FaBoxOpen className="text-xl text-gold-400 data-[selected]:text-black" />
              <span>Package</span>
            </div>
          </Tab>
          <Tab className="tab text-lg font-semibold flex items-center gap-3 px-6  text-gray-300 hover:text-white data-[selected]:bg-white data-[selected]:text-black data-[selected]:shadow-md rounded-lg transition-all duration-300 hover:bg-gray-800">
            <div className="flex justify-center gap-1 items-center">
              <FaUsers className="text-xl text-gold-400 data-[selected]:text-black" />
              <span>Tour Guide</span>
            </div>
          </Tab>
        </TabList>

        {/* Our Packages Tab */}
        <TabPanel>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black">
              Our Popular Tours
            </h2>
            <Link
              to="/packages"
              className="text-yellow-500 font-semibold hover:underline text-base md:text-lg"
            >
              View All Tours
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg text-black"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  className="bg-white rounded-2xl shadow-xl border border-black flex flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="relative">
                    <img
                      src={pkg.images?.[0] || pkg.photo}
                      alt={pkg.tripTitle || pkg.title}
                      className="w-full h-56 object-cover rounded-t-2xl"
                    />
                    <span className="absolute left-4 top-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded shadow">
                      Popular Tour
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-bold text-black text-base">
                        {pkg.rating || "★★★★★"}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        ({pkg.reviews || "1 Review"})
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1">
                      {pkg.tripTitle || pkg.title}
                    </h3>
                    <div className="text-gray-700 text-sm mb-1">
                      {pkg.duration || pkg.days || "3 days"}
                    </div>
                    <div className="flex items-center gap-1 text-gray-700 text-sm mb-2">
                      <FaMapMarkerAlt className="text-black" />
                      {pkg.location || pkg.place || pkg.country || "Unknown"}
                    </div>
                    <div className="mb-4">
                      <span className="text-gray-400 line-through mr-2">
                        {pkg.oldPrice ? `$${pkg.oldPrice}` : ""}
                      </span>
                      <span className="text-yellow-500 font-bold text-lg">
                        From ${pkg.price}
                      </span>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={`/Details/${pkg._id}`}
                        className="btn btn-outline border-black text-black hover:bg-black hover:text-white rounded-full w-full"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabPanel>

        {/* Meet Our Tour Guides Tab */}
        <TabPanel>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black">
              Meet Our Tour Guides
            </h2>
            <Link to={`/allguide`}>
              <button className="btn text-black font-semibold">ViewAll</button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg text-black"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide, idx) => (
                <motion.div
                  key={guide.id}
                  className="bg-[#e9e6e3] rounded-2xl shadow-xl border border-white flex flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="relative">
                    <img
                      src={guide.image || guide.photo}
                      alt={guide.name}
                      className="w-full h-80 object-top object-cover rounded-t-2xl"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-black mb-1">
                      {guide.name}
                    </h3>
                    <div className="text-gray-800 text-sm mb-1">
                      <span className="font-bold text-black">Experience:</span>{" "}
                      {guide.years_experience || guide.experience} years
                    </div>
                    <div className="text-gray-800 text-sm mb-1">
                      <span className="font-bold text-black">Specialty:</span>{" "}
                      {guide.expertise || guide.specialty}
                    </div>
                    <div className="text-gray-800 text-sm mb-4">
                      <span className="font-bold text-black">Languages:</span>{" "}
                      {guide.languages?.join(", ")}
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={`/tour-guide/${guide._id}`}
                        className="btn btn-outline bg-gray-900 text-white hover:bg-white hover:text-black rounded-lg w-full"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}
