import { Outlet, NavLink } from "react-router";
import {
  FaUser,
  FaClipboardList,
  FaPlus,
  FaPenFancy,
  FaBars,
} from "react-icons/fa"; // Import FaBars for the hamburger icon
import { IoHome } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
const navItems = [
  {
    to: "tourguideProfile",
    label: "Manage Profile",
    icon: <FaUser />,
  },
  {
    to: "assigntour",
    label: "My Assigned Tours",
    icon: <FaClipboardList />,
  },
  {
    to: "touraddstorys",
    label: "Add Stories",
    icon: <FaPlus />,
  },
  {
    to: "tourguidestorys",
    label: "Manage Stories",
    icon: <FaPenFancy />,
  },
  {
    to: "/",
    label: "GO TO HOME",
    icon: <IoHome />,
  },
];

const TourGuideDashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <ToastContainer position="top-left" />{" "}
      {/* Apply drawer and lg:drawer-open for desktop */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start">
        {" "}
        {/* Adjusted items-start and justify-start */}
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden m-4"
        >
          {" "}
          {/* Hamburger icon for mobile */}
          <FaBars className="text-xl" />
        </label>
        <main className="flex-1 p-6 bg-white w-full">
          {" "}
          {/* Ensure main content takes full width */}
          <Outlet />
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="w-64 min-h-full bg-black text-white flex flex-col py-8 px-4 shadow-lg">
          {" "}
          {/* min-h-full for full height */}
          <div className="mb-10 text-center">
            <div className="text-2xl font-extrabold mb-2">
              Tour Guide Dashboard
            </div>
            <div className="text-xs text-gray-400">Welcome, Guide!</div>
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
};

export default TourGuideDashboardLayout;
