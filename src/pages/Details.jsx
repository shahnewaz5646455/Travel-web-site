import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaDollarSign,
  FaUserTie,
  FaMapSigns,
  FaArrowRight,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import TourGuides from "./Alljuide";
import { useNavigate } from "react-router";

const showBookingSuccessAlert = () => {
  Swal.fire({
    title: "Booking Successful! 🎉",
    text: "Your booking has been confirmed. Get ready for your adventure!",
    icon: "success",
    confirmButtonText: "Awesome!",
    confirmButtonColor: "#3085d6",
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `,
    timer: 3000,
    timerProgressBar: true,
  });
};

const fetchPackage = async (id) => {
  const { data } = await axios.get(
    `https://travelserver-three.vercel.app/package/${id}`
  );
  return data;
};

const PackageDetails = () => {
  const { id } = useParams();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const {
    data: pkg,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["package", id],
    queryFn: () => fetchPackage(id),
  });

  const [guides, setGuides] = useState([]);
  const [selectedGuideId, setSelectedGuideId] = useState("");

  useEffect(() => {
    fetch("https://travelserver-three.vercel.app/all-tour-guides")
      .then((res) => res.json())
      .then((data) => setGuides(data))
      .catch(() => toast.error("❗ Failed to load tour guides!"));
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData) => {
    const selectedGuide = guides.find((guide) => guide._id === selectedGuideId);
    const guideName = selectedGuide ? selectedGuide.name : undefined;

    const booking = {
      packageName: pkg.tripTitle,
      packageId: pkg._id,
      touristName: user?.displayName,
      touristEmail: user?.email,
      touristImage: user?.photoURL,
      price: pkg.price,
      tourDate: selectedDate,
      guideName: guideName,
      guideId: selectedGuideId,
      status: "pending",
      paymentStatus: "unpaid",
    };

    if (userRole === "admin" || userRole === "tour-guide") {
      toast.error("Sorry...,Admin or Tour-Guide can not book any package");
    } else {
      try {
        await axios.post(
          "https://travelserver-three.vercel.app/booking",
          booking
        );
        toast.success("✅ Successfully Added!", { theme: "colored" });
        reset();
        showBookingSuccessAlert();
        navigate("/dashboard/my-bookings");
      } catch (err) {
        console.error(err);
        toast.error(`❗ ${"Already added and Failed to add booking"}`);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  if (error) return <p>Error loading package</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Main Container */}
      <div className="flex flex-col gap-6">
        {/* Package Details */}
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            {pkg.tripTitle}
          </h2>
          {/* Image Grid */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-6">
            <div className="sm:col-span-1 grid grid-rows-2 gap-4">
              <img
                src={pkg.images[0]}
                alt="Tour image 1"
                className="rounded-lg object-cover w-full h-48 sm:h-60 lg:h-80 shadow-md"
              />
              <img
                src={pkg.images[1]}
                alt="Tour image 2"
                className="rounded-lg object-cover w-full h-48 sm:h-60 lg:h-80 shadow-md"
              />
            </div>
            <div className="sm:col-span-2">
              <img
                src={pkg.images[2]}
                alt="Tour image 3"
                className="rounded-lg object-cover w-full h-48 sm:h-60 lg:h-[36rem] shadow-md"
              />
            </div>
          </div>

          <p className="text-gray-700 mb-4 text-sm sm:text-base lg:text-lg">
            {pkg.description}
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 text-sm sm:text-base lg:text-lg">
            {pkg.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <FaArrowRight className="text-green-500" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="space-y-2 text-gray-800 font-medium text-sm sm:text-base lg:text-lg">
            <p className="flex items-center gap-2">
              <FaMapSigns className="text-green-500" /> {pkg.location}
            </p>
            <p className="flex items-center gap-2">🕒 {pkg.duration}</p>
            <p className="flex items-center gap-2">💵 {pkg.price} USD</p>
          </div>

          {/* Accordion for Tour Plan */}
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-gray-800">
              Tour Itinerary
            </h3>
            <div className="space-y-4">
              {pkg.tourPlan.map((plan, idx) => (
                <div
                  key={idx}
                  className="collapse collapse-arrow bg-white shadow-lg rounded-lg border border-gray-200"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title bg-gradient-to-r from-green-50 to-blue-50 text-sm sm:text-base lg:text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaMapSigns className="text-green-500" />
                    Day {plan.day}
                  </div>
                  <div className="collapse-content bg-white text-gray-700 text-sm sm:text-base lg:text-lg">
                    <p className="mt-2 flex items-center gap-2">
                      <FaArrowRight className="text-green-500" />
                      {plan.activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-center text-gray-800">
            Book Your Tour
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                value={pkg.tripTitle}
                readOnly
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                value={user?.photoURL}
                readOnly
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
              <FaDollarSign className="text-gray-500" />
              <input
                type="number"
                value={pkg.price}
                readOnly
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
              <FaCalendarAlt className="text-gray-500" />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full outline-none bg-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 border p-2 rounded-lg bg-gray-50">
              <FaUserTie className="text-gray-500" />
              <select
                {...register("guideId", { required: true })}
                className="w-full outline-none bg-transparent text-sm sm:text-base"
                value={selectedGuideId}
                onChange={(e) => setSelectedGuideId(e.target.value)}
              >
                <option value="">Select Guide</option>
                {guides.map((guide) => (
                  <option key={guide._id} value={guide._id}>
                    {guide.name} - {guide.location}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn bg-gray-900 text-white w-full hover:bg-gray-800 text-sm sm:text-base">
              Book Now
            </button>
          </form>
        </div>
      </div>
      <div className="w-full mx-auto mt-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold text-gray-800 mb-6">
          Tour Guides
        </h1>
        <TourGuides />
      </div>
    </div>
  );
};

export default PackageDetails;