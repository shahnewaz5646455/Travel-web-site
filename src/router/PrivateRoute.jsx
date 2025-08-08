import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
export default function PrivateRoute({ children }) {
  const { user, loading,userRole } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" replace={true} />;
}
