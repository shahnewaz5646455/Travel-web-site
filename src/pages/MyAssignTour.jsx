import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxios";

export default function MyAssignTour() {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState(null);
  const [guideId, setGuideId] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 10;
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  // Fetch tour guide ID by email
  useEffect(() => {
    const fetchGuideId = async () => {
      if (!user?.email) return;
      try {
        const { data } = await axiosSecure.get(`/tour-guides/email/${user.email}`);
        setGuideId(data?._id);
      } catch (error) {
        toast.error("Failed to get tour guide info.");
      }
    };
    fetchGuideId();
  }, [user, axiosSecure]);

  // Fetch assigned tours for this guide
  useEffect(() => {
    const fetchTours = async () => {
      if (!guideId) return;
      setLoading(true);
      try {
        const { data } = await axiosSecure.get(`/bookings/guide/${guideId}`);
        setTours(data);
        setCurrentPage(1); // reset to page 1
      } catch (error) {
        toast.error("Failed to load assigned tours.");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [guideId, axiosSecure]);

  const handleAccept = async (id) => {
    try {
      await axiosSecure.put(`/bookings/accept/${id}`);
      setTours((prev) =>
        prev.map((tour) => (tour._id === id ? { ...tour, status: "Accepted" } : tour))
      );
      toast.success("Tour accepted!");
    } catch (error) {
      toast.error("Failed to accept tour.");
    }
  };

  const handleReject = async () => {
    try {
      await axiosSecure.put(`/bookings/reject/${rejectId}`);
      setTours((prev) =>
        prev.map((tour) =>
          tour._id === rejectId ? { ...tour, status: "Rejected" } : tour
        )
      );
      toast.info("Tour rejected.");
      setRejectId(null);
    } catch (error) {
      toast.error("Failed to reject tour.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">My Assigned Tours</h2>

      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : tours.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No assigned tours found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3 text-left">Package Name</th>
                <th className="px-4 py-3 text-left">Tourist Name</th>
                <th className="px-4 py-3 text-left">Tour Date</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTours.map((tour) => (
                <tr key={tour._id} className="border-b">
                  <td className="px-4 py-3">{tour.packageName}</td>
                  <td className="px-4 py-3">{tour.touristName}</td>
                  <td className="px-4 py-3">
                    {new Date(tour.tourDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{tour.price} USD</td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        tour.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : tour.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : tour.status === "in-review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleAccept(tour._id)}
                      disabled={tour.status !== "In Review"}
                      className={`px-4 py-1 rounded font-semibold flex items-center gap-2 transition ${
                        tour.status === "In Review"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      onClick={() => setRejectId(tour._id)}
                      disabled={
                        tour.status !== "pending" && tour.status !== "In Review"
                      }
                      className={`px-4 py-1 rounded font-semibold flex items-center gap-2 transition ${
                        tour.status === "pending" || tour.status === "In Review"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FaTimes /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {tours.length > toursPerPage && (
            <div className="flex justify-center items-center gap-4 py-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded text-white ${
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded text-white ${
                  currentPage === totalPages
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {rejectId && (
        <div className="fixed inset-0 bg-blue-200/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm w-full">
            <p className="text-xl font-semibold text-gray-800 mb-6">
              Are you sure you want to reject this tour?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100"
                onClick={() => setRejectId(null)}
              >
                No
              </button>
              <button
                className="px-6 py-2 border border-transparent text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700"
                onClick={handleReject}
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
