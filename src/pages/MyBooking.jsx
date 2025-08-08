import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaBook, FaCreditCard, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const navigate = useNavigate();
  const errorShown = useRef(false);
  const [width, height] = useWindowSize();
  const [showCongrats, setShowCongrats] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user?.email && user?.displayName) {
          const { data } = await axiosSecure.get(
            `/my-bookings/${user.email}/${user.displayName}`
          );
          setBookings(data);
        } else {
          setBookings([]);
        }
      } catch (error) {
        if (!errorShown.current) {
          console.error(error);
          toast.info("You did not book any tour package OR Failed to load bookings.");
          errorShown.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }

    return () => {
      errorShown.current = false;
    };
  }, [user, axiosSecure]);

  useEffect(() => {
    if (bookings.length > 3) {
      setShowCongrats(true);
      const timer = setTimeout(() => {
        setShowCongrats(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [bookings]);

  // Prevent horizontal scrollbar when Confetti is visible
  useEffect(() => {
    if (showCongrats) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
    }
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, [showCongrats]);

  const handleCancel = async () => {
    try {
      await axios.delete(`https://travelserver-three.vercel.app/booking/${cancelId}`);
      toast.success("Booking cancelled successfully!");
      setBookings((prev) => prev.filter((b) => b._id !== cancelId));
      setCancelId(null);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  const handlePayment = (booking) => {
    navigate(`/Dashboard/payment/${booking.packageId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center p-6 sm:p-8 bg-white rounded-xl shadow-lg">
          <span className="loading loading-spinner loading-lg text-blue-500 mb-4"></span>
          <p className="text-base sm:text-lg font-medium text-gray-700">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center p-6 sm:p-8 bg-white rounded-xl shadow-lg">
          <FaBook className="text-4xl sm:text-6xl text-gray-400 mb-4" />
          <p className="text-lg sm:text-xl font-semibold text-gray-700">No bookings found.</p>
          <p className="text-sm sm:text-base text-gray-500 mt-2">Start exploring and book your next adventure!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-[95%] sm:w-full max-w-7xl mx-auto">
        {/* Confetti and Congratulations */}
        {showCongrats && (
          <div className="fixed inset-0 overflow-hidden z-50">
            <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="bg-white border border-green-300 px-6 py-4 sm:px-8 sm:py-6 rounded-2xl text-center shadow-2xl animate-bounce w-full max-w-md">
                <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
                  🎉 Congratulations! 🎉
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  You've booked more than 3 tours! Keep exploring with us!
                </p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 text-center text-gray-900">My Bookings</h2>

        {/* Bookings List */}
        <div className="space-y-4">
          {currentBookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{booking.packageName}</h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Tour Guide:</span> {booking.guideName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Tour Date:</span>{" "}
                      {new Date(booking.tourDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Price:</span> {booking.price} USD
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                          booking.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-start sm:justify-end gap-2 sm:gap-3">
                    {booking.status === "pending" ? (
                      <>
                        {booking.paymentStatus === "paid" ? (
                          <button
                            disabled
                            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-gray-400 text-white cursor-not-allowed opacity-70"
                          >
                            <FaCreditCard className="mr-1 sm:mr-2" /> Paid
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePayment(booking)}
                            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-green-600 hover:bg-green-700 text-white transition duration-200"
                          >
                            <FaCreditCard className="mr-1 sm:mr-2" /> Pay
                          </button>
                        )}
                        <button
                          onClick={() => setCancelId(booking._id)}
                          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white transition duration-200"
                        >
                          <FaTimes className="mr-1 sm:mr-2" /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          disabled
                          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-gray-400 text-white cursor-not-allowed opacity-70"
                        >
                          <FaCreditCard className="mr-1 sm:mr-2" /> Pay
                        </button>
                        <button
                          disabled
                          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-gray-400 text-white cursor-not-allowed opacity-70"
                        >
                          <FaTimes className="mr-1 sm:mr-2" /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-8 gap-3 sm:gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm text-white ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm text-white ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>

        <ToastContainer position="top-left" />

        {/* Cancel Modal */}
        {cancelId && (
          <div className="fixed inset-0 bg-blue-200/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl text-center w-full max-w-sm">
              <p className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
                Are you sure you want to cancel this booking?
              </p>
              <div className="flex justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setCancelId(null)}
                  className="px-4 sm:px-6 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 text-xs sm:text-sm"
                >
                  No
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 sm:px-6 py-1.5 sm:py-2 border border-transparent text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 text-xs sm:text-sm"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;