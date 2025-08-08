import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function DashboardHome() {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === "admin") {
      navigate("adminprofile", { replace: true });
    } else {
      navigate("profile", { replace: true });
    }
  }, [userRole, navigate]);

  return null; // or a loading spinner
}