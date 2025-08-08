import React from "react";
import UserDashboard from "./UserDashboard";
import TourGuideDashboardLayout from "./GuideDashboard";
import AdminDashboard from "./AdminDashboard";
import useAuth from "../hooks/useAuth";

export default function DashboardLayout() {
  const { userRole } = useAuth();

  if (userRole === "user") {
    return <UserDashboard />;
  }
  if (userRole === "tour-guide") {
    return <TourGuideDashboardLayout />;
  }
  if (userRole === "admin") {
    return <AdminDashboard />;
  }
  // Optionally, show a loading or unauthorized message
  return <div className="text-center py-10 text-xl">Loading dashboard...</div>;
}
