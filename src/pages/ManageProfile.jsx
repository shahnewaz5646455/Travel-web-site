import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxios";

const ManageProfile = () => {
  const { user, userRole } = useAuth();
   const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // Get user full info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/user/${user?.email}`
        );
        setUserInfo(data);
        reset({
          displayName: data?.displayName || "",
          photoURL: data?.photoURL || "",
        });
      } catch (error) {
        toast.error("Failed to fetch user info.");
        console.error(error);
      }
    };

    if (user?.email) fetchUserInfo();
  }, [user?.email, reset,axiosSecure]);

  // Handle profile update
  const onSubmit = async (formData) => {
    try {
      const payload = {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      };

      const res = await axiosSecure.put(
        `/user/${user?.email}`,
        payload
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        setUserInfo((prev) => ({ ...prev, ...payload }));
        reset(payload);
        setIsOpen(false);
      } else {
        toast.success("Profile updated successfully!");
        setUserInfo((prev) => ({ ...prev, ...payload }));
        reset(payload);
        setIsOpen(false);
      }
    } catch (err) {
      toast.error("Error updating profile.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Welcome, {userInfo?.displayName || user?.displayName || "User"}!
        </h1>

        <div className="flex flex-col items-center space-y-4 mb-8">
          {userInfo?.photoURL ? (
            <img
              src={userInfo.photoURL}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <FaUserCircle className="w-36 h-36 text-gray-400 border-4 border-blue-500 rounded-full p-1 shadow-lg transition-transform duration-300 hover:scale-105" />
          )}

          <p className="text-2xl font-semibold text-gray-800">
            {userInfo?.displayName || user?.displayName || "Guest User"}
          </p>
          <p className="text-lg text-gray-600">{user?.email || "No email"}</p>
          <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
            Role: {userRole?.toUpperCase() || "USER"}
          </span>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            <FaEdit className="mr-2 text-lg" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-blue-200/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register("displayName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  {...register("photoURL")}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfile;
