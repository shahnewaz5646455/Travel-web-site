import React from "react";
import useAuth from "../hooks/useAuth"; // Assuming useAuth hook provides user and userRole
import { Navigate, useLocation } from "react-router";

export default function AdminPrivateRoute({ children }) {
  const { user, loading, userRole } = useAuth(); // Destructuring userRole from useAuth
  const location = useLocation();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  // Check if user is logged in AND if their role is 'admin'
  if (user && user?.email && userRole === 'admin') {
    return children; // Allow access to the protected route
  }

  // If not an admin or not logged in, redirect to the access denied page
  // The 'replace' prop ensures the current location is replaced in the history stack
  return <Navigate state={location.pathname} to="/Accessdenied" replace={true} />;
}
