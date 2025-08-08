import React from "react";
import { Outlet, NavLink } from "react-router";
import {
  FaUserShield,
  FaPlusSquare,
  FaUsers,
  FaBookOpen,
  FaUserCheck,
  FaBars,
} from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { ToastContainer } from "react-toastify";

const navItems = [
  {
    to: "adminprofile",
    label: "Manage Profile",
    icon: <FaUserShield />,
  },
  {
    to: "addpakage",
    label: "Add Package",
    icon: <FaPlusSquare />,
  },
  {
    to: "manageuser",
    label: "Manage Users",
    icon: <FaUsers />,
  },
  {
    to: "managecandidate",
    label: "Manage Candidates",
    icon: <FaUserCheck />,
  },
  {
    to: "/",
    label: "GO TO HOME",
    icon: <IoHome />,
  },
];

export default function AdminDashboard() {
  return (
    <div className="drawer lg:drawer-open bg-gray-100 min-h-screen">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Toggle Button */}
        <div className="w-full p-4 bg-white shadow lg:hidden">
          <label htmlFor="admin-drawer" className="btn btn-ghost">
            <FaBars className="text-lg" />
          </label>
        </div>
        {/* Main Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Sidebar / Drawer */}
      <div className="drawer-side z-40">
        <ToastContainer position="top-left" />
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <aside className="w-64 min-h-full bg-black text-white flex flex-col py-6 px-4 shadow-lg">
          <div className="mb-10 text-center">
            <div className="text-2xl font-extrabold mb-1">Admin Dashboard</div>
            <div className="text-xs text-gray-400">Welcome, Admin!</div>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black shadow"
                      : "hover:bg-gray-800 hover:text-white"
                  }`
                }
                end
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
