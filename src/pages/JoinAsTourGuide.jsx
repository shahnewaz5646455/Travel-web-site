import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaUserTie,
  FaPaperPlane,
  FaLink,
  FaGlobe,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxios";

const JoinAsTourGuide = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const application = {
        applicationTitle: data.applicationTitle,
        whyTourGuide: data.whyTourGuide,
        cvLink: data.cvLink,
        expertise: data.expertise,
        location: data.location,
        years_experience: Number(data.years_experience),
        languages: data.languages.split(",").map((lang) => lang.trim()),
        name:user.displayName ,

        contact: user.email,
        status: "pending",
        image: user.photoURL,
      };
      await axiosSecure.post("/tour-guides", application);
      reset();
      toast.success("Add application successfull");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="w-[80%] mx-auto p-8 rounded-lg min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaUserTie /> Join as Tour Guide
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Application Title</label>
          <input
            type="text"
            {...register("applicationTitle", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter application title"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            {...register("whyTourGuide", { required: true })}
            rows="4"
            className="textarea textarea-bordered w-full"
            placeholder="Explain your motivation..."
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-semibold">CV Link</label>
          <input
            type="text"
            {...register("cvLink", { required: true })}
            className="input input-bordered w-full"
            placeholder="https://your-cv-link.com"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold flex items-center gap-2">
            <FaGlobe /> Expertise
          </label>
          <input
            type="text"
            {...register("expertise", { required: true })}
            className="input input-bordered w-full"
            placeholder="Adventure Travel, Cultural Tours..."
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold flex items-center gap-2">
            <FaMapMarkerAlt /> Location
          </label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your City, Country"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold flex items-center gap-2">
            <FaGlobe /> Languages (Comma Separated)
          </label>
          <input
            type="text"
            {...register("languages", { required: true })}
            className="input input-bordered w-full"
            placeholder="English, Spanish, French"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold flex items-center gap-2">
            <FaStar /> Years of Experience
          </label>
          <input
            type="number"
            {...register("years_experience", { required: true, min: 0 })}
            className="input input-bordered w-full"
            placeholder="5"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          <FaPaperPlane /> Submit Application
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-2xl font-bold mb-4">
              Application Submitted Successfully!
            </h3>
            <button
              className="btn btn-outline btn-primary mt-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinAsTourGuide;
