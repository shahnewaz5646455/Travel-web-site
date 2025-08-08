import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";

const MyAssignedTours = ({ guideId }) => {
  const [assignedTours, setAssignedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState(null);

  useEffect(() => {
    const fetchAssignedTours = async () => {
      try {
        const { data } = await axios.get(
          `https://travelserver-three.vercel.app/assigned-tours/${guideId}`
        );
        setAssignedTours(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load assigned tours");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedTours();
  }, [guideId]);

  const handleAccept = async (id) => {
    try {
      await axios.patch(
        `https://travelserver-three.vercel.app/assigned-tours/${id}`,
        { status: "Accepted" }
      );
      toast.success("Tour accepted!");
      setAssignedTours((prev) =>
        prev.map((tour) =>
          tour._id === id ? { ...tour, status: "Accepted" } : tour
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to accept tour");
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(
        `https://travelserver-three.vercel.app/assigned-tours/${rejectId}`,
        { status: "Rejected" }
      );
      toast.success("Tour rejected!");
      setAssignedTours((prev) =>
        prev.map((tour) =>
          tour._id === rejectId ? { ...tour, status: "Rejected" } : tour
        )
      );
      setRejectId(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject tour");
    }
  };

  if (loading)
    return <p className="text-center py-10">Loading Assigned Tours...</p>;

  return (
    <div className="overflow-x-auto min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">My Assigned Tours</h2>
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Package Name</th>
            <th>Tourist Name</th>
            <th>Tour Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedTours.map((tour) => (
            <tr key={tour._id} className="text-center">
              <td>{tour.packageName}</td>
              <td>{tour.touristName}</td>
              <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
              <td>{tour.price} BDT</td>
              <td>{tour.status}</td>
              <td className="flex justify-center gap-2">
                <button
                  disabled={tour.status !== "In Review"}
                  onClick={() => handleAccept(tour._id)}
                  className={`btn btn-sm ${
                    tour.status !== "In Review" ? "btn-disabled" : "btn-success"
                  }`}
                >
                  <FaCheck /> Accept
                </button>
                {tour.status === "In Review" && (
                  <button
                    onClick={() => setRejectId(tour._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTimes /> Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rejectId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="mb-4">Are you sure you want to reject this tour?</p>
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-outline"
                onClick={() => setRejectId(null)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleReject}>
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignedTours;
