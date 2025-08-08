import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxios";

export default function ManageCandidates() {
  const axiosSecure = useAxiosSecure();

  const {
    data: initialCandidates = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-tour-guides"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tour-guides/pending");
      return data;
    },
  });

  const [candidates, setCandidates] = useState([]);
  const [synced, setSynced] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;

  const totalPages = Math.ceil(candidates.length / candidatesPerPage);
  const indexOfLast = currentPage * candidatesPerPage;
  const indexOfFirst = indexOfLast - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (!synced && initialCandidates.length) {
      setCandidates(initialCandidates);
      setSynced(true);
      setCurrentPage(1); // reset page
    }
  }, [initialCandidates, synced]);

  const handleAccept = async (candidate) => {
    setCandidates((prev) => prev.filter((item) => item._id !== candidate._id));
    try {
      await axios.put(
        `https://travelserver-three.vercel.app/users/role/tour-guide/${candidate.contact}`
      );
      await axios.put(
        `https://travelserver-three.vercel.app/tour-guides/approve/${candidate._id}`
      );
      toast.success(`${candidate.displayName} is now a Tour Guide!`);
      refetch();
    } catch (error) {
      toast.error("Failed to approve candidate.");
      setCandidates((prev) => [...prev, candidate]);
    }
  };

  const handleReject = async (candidate) => {
    setCandidates((prev) => prev.filter((item) => item._id !== candidate._id));
    try {
      await axios.delete(
        `https://travelserver-three.vercel.app/tour-guides/${candidate._id}`
      );
      toast.info(`${candidate.displayName}'s application rejected.`);
      refetch();
    } catch (error) {
      toast.error("Failed to reject candidate.");
      setCandidates((prev) => [...prev, candidate]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Tour Guide Candidates</h2>

      {isLoading ? (
        <div className="text-center py-10">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : candidates.length === 0 ? (
        <div className="text-center border-2 border-dashed font-bold py-10 text-gray-500">
          No pending applications.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCandidates.map((candidate) => (
                  <tr key={candidate._id} className="border-b">
                    <td className="px-4 py-3">{candidate.name}</td>
                    <td className="px-4 py-3">{candidate.contact}</td>
                    <td className="px-4 py-3 capitalize">
                      {candidate.role || "user"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        {candidate.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2 justify-center">
                      <button
                        onClick={() => handleAccept(candidate)}
                        className="px-4 py-1 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(candidate)}
                        className="px-4 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {candidates.length > candidatesPerPage && (
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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
        </>
      )}
    </div>
  );
}
