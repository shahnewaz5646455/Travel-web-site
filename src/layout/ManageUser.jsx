import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxios";

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "user", label: "User/Tourist" },
  { value: "tour-guide", label: "Tour Guide" },
  { value: "admin", label: "Admin" },
];

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(roleOptions[0]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const axiosSecure = useAxiosSecure();
  // Fetch users based on logic
  const fetchUsers = async () => {
    setLoading(true);
    try {
      let response;

      if (search.trim() !== "") {
        // Search takes priority
        response = await axiosSecure.get("/users/search", {
          params: { q: search },
        });
      } else if (role.value) {
        // Filter by role
        response = await axios.get(
          `https://travelserver-three.vercel.app/users/role/${role.value}`
        );
      } else {
        // Get all users
        response = await axiosSecure.get("/users");
      }

      setUsers(response.data || []);
      setCurrentPage(1); // reset pagination
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever role or search changes
  useEffect(() => {
    fetchUsers();
  }, [search, role]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRoleChange = (selected) => {
    setRole(selected);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      {/* Filter controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center w-full md:w-1/2 bg-white rounded-lg shadow px-3 py-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>

        <div className="w-full md:w-1/4">
          <Select
            options={roleOptions}
            value={role}
            onChange={handleRoleChange}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>
      </div>

      {/* Table display */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-left">Photo</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            ) : currentUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">
                    {user.displayName}
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : user.role === "tour-guide"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.role === "user" ? "User/Tourist" : user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {users.length > usersPerPage && (
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
      </div>
    </div>
  );
}
