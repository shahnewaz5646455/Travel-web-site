import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserEdit,
  FaUserShield,
  FaMoneyBillWave,
  FaUsers,
  FaSuitcase,
  FaBookOpen,
  FaUserFriends,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxios";
import { ToastContainer } from "react-toastify";

export default function AdminProfile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [overview, setOverview] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({
    displayName: "",
    photoURL: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      try {
        const [overviewRes, userRes] = await Promise.all([
          axiosSecure.get("/admin/overview"),
          axiosSecure.get(
            `https://travelserver-three.vercel.app/user/${user.email}`
          ),
        ]);

        setOverview(overviewRes.data);
        setAdminInfo(userRes.data);

        setEditData({
          displayName: userRes.data.displayName || "",
          photoURL: userRes.data.photoURL || "",
          phone: userRes.data.phone || "",
        });
      } catch (err) {
        toast.error("Failed to load admin data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, axiosSecure]);

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosSecure.put(
        `https://travelserver-three.vercel.app/user/${user.email}`,
        editData
      );

      if (data.modifiedCount > 0 || data.acknowledged) {
        toast.success("Profile updated successfully!");
        setAdminInfo((prev) => ({ ...prev, ...editData }));
        setEditModal(false);
      } else {
        toast.success("Profile updated successfully!");
        setAdminInfo((prev) => ({ ...prev, ...editData }));
        setEditModal(false);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading || !adminInfo) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
            <FaUserShield className="text-blue-600" /> Welcome,{" "}
            {adminInfo.displayName}
          </h1>
          <p className="text-gray-600 text-lg">
            Here’s your admin dashboard overview.
          </p>
        </div>
        <button
          onClick={() => setEditModal(true)}
          className="btn btn-outline btn-primary flex items-center gap-2"
        >
          <FaUserEdit /> Edit Profile
        </button>
      </div>
      <ToastContainer position="top-left" />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          icon={<FaMoneyBillWave />}
          value={`${overview.totalPayment?.toLocaleString()} USD`}
          label="Total Payment"
          color="blue"
        />
        <StatCard
          icon={<FaUserFriends />}
          value={overview.totalTourGuides}
          label="Total Tour Guides"
          color="green"
        />
        <StatCard
          icon={<FaSuitcase />}
          value={overview.totalPackages}
          label="Total Packages"
          color="yellow"
        />
        <StatCard
          icon={<FaUsers />}
          value={overview.totalClients}
          label="Total Clients"
          color="pink"
        />
        <StatCard
          icon={<FaBookOpen />}
          value={overview.totalStories}
          label="Total Stories"
          color="purple"
        />
      </div>

      {/* Admin Info */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          src={adminInfo.photoURL}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{adminInfo.displayName}</h2>
          <div className="mb-1 text-gray-700">
            <strong>Email:</strong> {adminInfo.email}
          </div>
          <div className="mb-1 text-gray-700">
            <strong>Phone:</strong> {adminInfo.phone || "N/A"}
          </div>
          <div className="text-sm text-white bg-blue-500 inline-block px-3 py-1 mt-2 rounded-full uppercase">
            {adminInfo.role}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-blue-200/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-center">Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <Input
                label="Name"
                name="displayName"
                value={editData.displayName}
                onChange={handleEditChange}
              />
              <Input
                label="Photo URL"
                name="photoURL"
                value={editData.photoURL}
                onChange={handleEditChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
              />
              <Input label="Role" value={adminInfo.role} disabled />
              <Input label="Email" value={adminInfo.email} disabled />
              <button type="submit" className="btn btn-primary w-full mt-4">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input className="input input-bordered w-full" {...props} />
  </div>
);

const StatCard = ({ icon, value, label, color }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-700",
    green: "from-green-500 to-green-700",
    yellow: "from-yellow-500 to-yellow-700",
    pink: "from-pink-500 to-pink-700",
    purple: "from-purple-500 to-purple-700",
  };

  return (
    <div
      className={`bg-gradient-to-r ${colorMap[color]} text-white rounded-xl shadow-lg p-6 flex items-center gap-4`}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
};
