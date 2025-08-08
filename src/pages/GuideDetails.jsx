import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaStar,
  FaEnvelope,
  FaGlobe,
  FaUserTie,
} from "react-icons/fa";

const fetchGuide = async (id) => {
  const { data } = await axios.get(
    `https://travelserver-three.vercel.app/tour-guide/${id}`
  );
  return data;
};

const GuideDetails = () => {
  const { id } = useParams();

  const {
    data: guide,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guide", id],
    queryFn: () => fetchGuide(id),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  if (error) return <p className="text-center">Error loading guide details</p>;

  return (
    <div className="max-w-5xl min-h-screen mx-auto p-6  rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 flex flex-col items-center justify-center">
        <img
          src={guide.image}
          alt={guide.name}
          className="rounded-xl w-full h-96 object-cover shadow-lg"
        />
      </div>
      <div className="lg:col-span-2 flex flex-col justify-center space-y-4 text-black">
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <FaUserTie /> {guide.name}
        </h2>
        <p className="flex items-center gap-2 text-gray-700 text-lg">
          <FaMapMarkerAlt /> {guide.location}
        </p>
        <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-lg">
          {guide.expertise}
        </span>
        <div className="flex flex-wrap gap-2 text-base">
          {guide.languages.map((lang, index) => (
            <span
              key={index}
              className="bg-gray-200 text-black px-3 py-1 rounded-full flex items-center gap-1"
            >
              <FaGlobe /> {lang}
            </span>
          ))}
        </div>
        <p className="flex items-center gap-2 text-gray-800 text-lg">
          <FaStar className="text-yellow-500" /> {guide.rating} / 5 |{" "}
          {guide.years_experience} yrs experience
        </p>
        <p className="flex items-center gap-2 text-gray-700 text-lg">
          <FaEnvelope /> {guide.contact}
        </p>
      </div>
    </div>
  );
};

export default GuideDetails;
