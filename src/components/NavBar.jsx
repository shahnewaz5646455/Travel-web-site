import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Mainlogo from "../pages/logo";

export default function NavBar() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/community", label: "Community" },
    { to: "/packages", label: "Trips" },
  ];
  const { user, logout, userRole } = useAuth();

  const getDashboardRoute = () => {
    if (userRole === "admin") return "/admindashaboard";
    if (userRole === "tour-guide") return "/GuideDashboard";
    return "/Dashboard";
  };
  const navigate = useNavigate();
  const damyphoto =
    "https://i.postimg.cc/HWwKx0JW/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Helper to handle broken image links
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = damyphoto;
  };

  // Logout handler with toastify
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast.success("Logout successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Logout failed!");
    }
  };

  // Toggle profile menu in drawer (small devices)
  const toggleProfileMenu = () => setShowProfileMenu((open) => !open);

  // Close drawer when a route is clicked
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("nav-drawer");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="navbar bg-white rounded-xl w-11/12 mx-auto mt-4 border-2 shadow-2xl px-4">
      {/* Drawer for small devices */}
      <div className="drawer lg:hidden">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex items-center justify-between">
          <label htmlFor="nav-drawer" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <span className="font-extrabold text-xl text-black tracking-tight">
            <Link to="/" onClick={closeDrawer}>
              <Mainlogo />
            </Link>
          </span>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="nav-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white space-y-2 overflow-y-auto">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-bold text-lg hover:bg-white hover:text-black rounded transition flex items-center gap-2 px-3 py-2"
                  onClick={closeDrawer}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li className="flex flex-col items-center mt-4">
                  <button
                    type="button"
                    className="w-16 h-16 rounded-full border-2 border-white overflow-hidden focus:outline-none shadow-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"
                    onClick={toggleProfileMenu}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        onError={handleImgError}
                        alt="profile"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-14 h-14 text-gray-400" />
                    )}
                  </button>
                  <div className="mt-2 text-center">
                    <div className="font-bold text-white">
                      {user.displayName || "User"}
                    </div>
                    <div className="text-xs text-gray-300">{user.email}</div>
                  </div>
                </li>
                {/* Animated collapsible menu for profile actions */}
                <li>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      showProfileMenu
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-2 mt-4">
                      <li>
                        <Link
                          to={getDashboardRoute()}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg font-bold bg-white text-black hover:bg-black hover:text-white transition duration-200 shadow"
                          onClick={() => {
                            setShowProfileMenu(false);
                            closeDrawer();
                          }}
                        >
                          <FaTachometerAlt className="text-xl" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowProfileMenu(false);
                            closeDrawer();
                          }}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-black hover:to-black hover:text-red-400 transition duration-200 shadow"
                        >
                          <FaSignOutAlt className="text-xl" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <button
                    className="mt-2 text-xs text-gray-400 underline"
                    onClick={toggleProfileMenu}
                  >
                    {showProfileMenu
                      ? "Hide Profile Actions"
                      : "Show Profile Actions"}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-black w-full mt-4"
                    to="/login"
                    onClick={closeDrawer}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="btn bg-white text-black hover:bg-black hover:text-white border-white w-full mt-2"
                    to="/register"
                    onClick={closeDrawer}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="navbar-start hidden lg:flex">
        <span className="flex items-center gap-2 text-2xl sm:text-3xl text-black tracking-tight">
          <Link to="/">
            <Mainlogo />
          </Link>
          <span>Wayfind</span>
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="font-bold text-black hover:bg-black hover:text-white rounded transition px-4 py-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex space-x-2">
        {user ? (
          <div className="relative">
            <button
              type="button"
              className="w-12 h-12 bg-red-400 rounded-full border-2 border-black overflow-hidden focus:outline-none"
              onClick={() => setShowProfileMenu((open) => !open)}
            >
              <img
                src={user.photoURL || damyphoto}
                onError={handleImgError}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-black via-gray-900 to-gray-800 border-2 border-black rounded-2xl shadow-2xl z-50 flex flex-col items-start p-6 space-y-3 animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={user.photoURL || damyphoto}
                    onError={handleImgError}
                    alt="profile"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg"
                  />
                  <div>
                    <div className="font-extrabold text-lg text-white">
                      {user.displayName || "User"}
                    </div>
                    <div className="text-xs text-gray-300">{user.email}</div>
                  </div>
                </div>
                <Link
                  to={getDashboardRoute()}
                  className="w-full text-left px-4 py-2 rounded-lg font-bold bg-white text-black hover:bg-black hover:text-white transition duration-200 shadow flex items-center gap-2"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <FaTachometerAlt className="text-xl" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-black hover:to-black hover:text-red-400 transition duration-200 shadow border-t border-gray-700 mt-2 flex items-center gap-2"
                >
                  <FaSignOutAlt className="text-xl" />
                  Logout
                </button>
                <style>
                  {`
                    @keyframes fade-in {
                      from { opacity: 0; transform: translateY(-10px);}
                      to { opacity: 1; transform: translateY(0);}
                    }
                    .animate-fade-in {
                      animation: fade-in 0.25s ease;
                    }
                  `}
                </style>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              className="btn btn-outline border-black text-black hover:bg-black hover:text-white"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn bg-black text-white hover:bg-white hover:text-black border-black"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}