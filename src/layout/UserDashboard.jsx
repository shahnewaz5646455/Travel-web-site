import { Outlet, NavLink } from "react-router";
import { FaUser, FaBook, FaPenFancy, FaPlus, FaUsers, FaBars } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { IoHome } from "react-icons/io5";

const navItems = [
  {
    to: "/Dashboard/profile",
    label: "Manage Profile",
    icon: <FaUser />,
  },
  {
    to: "/Dashboard/my-bookings",
    label: "My Bookings",
    icon: <FaBook />,
  },
  {
    to: "/dashboard/manage-stories",
    label: "Manage Stories",
    icon: <FaPenFancy />,
  },
  {
    to: "/dashboard/addStory",
    label: "Add Stories",
    icon: <FaPlus />,
  },
  {
    to: "/dashboard/join-guide",
    label: "Join as Tour Guide",
    icon: <FaUsers />,
  },
  {
    to: "/",
    label: "GO TO HOME",
    icon: <IoHome />,
  },
];

const UserDashboard = () => {
  // Function to close the drawer on small devices
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-3");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start w-[95%] sm:w-full mx-auto">
        {/* Hamburger button for mobile */}
        <label htmlFor="my-drawer-3" className="btn btn-primary drawer-button lg:hidden m-4">
          <FaBars className="text-xl" />
        </label>
        <main className="flex-1 p-4 sm:p-6 bg-white w-full">
          <Outlet />
        </main>
        <ToastContainer position="top-left" />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="w-64 sm:w-72 min-h-full bg-black text-white flex flex-col py-8 px-4 shadow-lg">
          <div className="mb-8 sm:mb-10 text-center">
            <div className="text-xl sm:text-2xl font-extrabold mb-2">User Dashboard</div>
            <div className="text-xs sm:text-sm text-gray-400">Welcome, Traveler!</div>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                    isActive
                      ? "bg-white text-black shadow"
                      : "hover:bg-gray-800 hover:text-white"
                  }`
                }
                end
                onClick={closeDrawer}
              >
                <span className="text-base sm:text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default UserDashboard;