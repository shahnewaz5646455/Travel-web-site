import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import ViewAll from "../pages/ViewAll";
import PackagesAndGuides from "../pages/ViewAll";
import PackageDetails from "../pages/Details";
import GuideDetails from "../pages/GuideDetails";
import DashboardLayout from "../layout/DashboardLayout";
import ManageProfile from "../pages/ManageProfile";
import AddStories from "../pages/AddStory";
import JoinAsTourGuide from "../pages/JoinAsTourGuide";
import ManageStories from "../pages/ManageStory";
import MyBookings from "../pages/MyBooking";
import TourGuideDashboardLayout from "../layout/GuideDashboard";
import Payment from "../pages/Payment";
import ManageCandidates from "../AdminPages/ManageCandidates";
import AddPakage from "../AdminPages/AddPakage";
import ManageUser from "../layout/ManageUser";
import Profile from "../AdminPages/AdminProfile";
import AdminProfile from "../AdminPages/AdminProfile";
import DashboardHome from "../layout/DashboardHome";
import MyAssignTour from "../pages/MyAssignTour";
import AdminDashboard from "../layout/AdminDashboard";
import Error from "../pages/Error";
import AdminPrivateRoute from "../context/AdminPrivateRoute";
import ForbiddenPage from "../pages/ForbiddenPage";
import Community from "../pages/Community";
import AboutUs from "../pages/AboutUs";
import TourGuides from "../pages/Alljuide";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },

      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/allguide",
        element: <TourGuides></TourGuides>,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/community",
        Component: Community,
      },

      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/packages",
        Component: PackagesAndGuides,
      },
      {
        path: "/Details/:id",
        element: (
          <PrivateRoute>
            <PackageDetails></PackageDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/tour-guide/:id",
        Component: GuideDetails,
        element: (
          <PrivateRoute>
            <GuideDetails></GuideDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // User Dashboard Routes
      {
        index: true,

        element: <ManageProfile />,
      },
      {
        path: "profile",
        element: <ManageProfile />,
      },
      {
        path: "addStory",
        element: <AddStories />,
      },
      {
        path: "join-guide",
        element: <JoinAsTourGuide />,
      },
      {
        path: "manage-stories",
        element: <ManageStories />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },

      // Admin Dashboard Routes

      // Shared/Other Routes
    ],
  },
  {
    path: "/GuideDashboard",
    element: (
      <PrivateRoute>
        <TourGuideDashboardLayout></TourGuideDashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,

        element: <ManageProfile></ManageProfile>,
      },
      {
        path: "tourguideProfile",
        element: <ManageProfile></ManageProfile>,
      },
      {
        path: "tourguidestorys",
        Component: ManageStories,
      },
      {
        path: "touraddstorys",
        Component: AddStories,
      },
      {
        path: "assigntour",
        Component: MyAssignTour,
      },
    ],
  },
  {
    path: "/admindashaboard",
    element: (
      <PrivateRoute>
        <AdminPrivateRoute>
          <AdminDashboard></AdminDashboard>
        </AdminPrivateRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminProfile />,
      },
      {
        path: "adminprofile",
        element: <AdminProfile />,
      },
      {
        path: "manageuser",
        element: <ManageUser />,
      },
      {
        path: "addpakage",
        element: <AddPakage />,
      },
      {
        path: "managecandidate",
        element: <ManageCandidates />,
      },
    ],
  },
  {
    path: "/Accessdenied",
    Component: ForbiddenPage,
  },
  {
    path: "/*",
    Component: Error,
  },
]);
