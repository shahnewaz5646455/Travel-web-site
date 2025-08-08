import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAni from "../assets/loginani.json";
import { useForm } from "react-hook-form";
// Make sure this hook uses AuthContext
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import { GoogleAuthProvider } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router";

export default function Login() {
  const location = useLocation();
  const { setUserRole } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await login(data.email, data.password);
      const user = userCredential.user || userCredential; // handle both cases

      // Fetch user role after successful login
      const response = await fetch(
        `https://travelserver-three.vercel.app/user-role/${user.email}`
      );
      const roleData = await response.json();
      setUserRole(roleData.role);

      navigate(location.state || "/");
      toast.success("Logged in successfully!");
      reset();
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  // const handleGoogleLogin = async () => {
  //     try {
  //     const provider = new GoogleAuthProvider();

  //     const result = await signInWithGoogle(provider);
  //     setUser(result.user);
  //     toast.success("Logged in with Google!");
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);

  //     toast.error("Google login failed.");
  //   }
  // };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithGoogle(provider);
      const user = result.user;
      const newData = {
        displayName: user.displayName,
        email: user.email,
        role: "user",
        createdAt: new Date().toISOString(),
        last_login: new Date().toISOString(),
        photoURL: user.photoURL,
      };
      try {
        await axios.post("https://travelserver-three.vercel.app/user", newData);
        const response = await fetch(
          `https://travelserver-three.vercel.app/user-role/${user.email}`
        );
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.log(error);
        // If user already exists, still fetch role
        const response = await fetch(
          `https://travelserver-three.vercel.app/user-role/${user.email}`
        );
        const data = await response.json();
        setUserRole(data.role);
      }
      navigate(location.state || "/");
      toast.success("Logged in with Google!");
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center ">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Lottie animationData={loginAni} loop={true} className="w-72 h-72" />
      </div>
      {/* Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white border-2 border-black rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-extrabold text-black mb-8 text-center">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div className="mb-6">
              <label
                className="block text-black font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`input input-bordered w-full border-black bg-white text-black focus:outline-none focus:border-black ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mb-6">
              <label
                className="block text-black font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: {
                      hasUpper: (v) =>
                        /[A-Z]/.test(v) ||
                        "Password must contain at least one uppercase letter",
                      hasLower: (v) =>
                        /[a-z]/.test(v) ||
                        "Password must contain at least one lowercase letter",
                      hasNumber: (v) =>
                        /\d/.test(v) ||
                        "Password must contain at least one number",
                      hasSpecial: (v) =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                        "Password must contain at least one special character",
                    },
                  })}
                  className={`input input-bordered w-full border-black bg-white text-black focus:outline-none focus:border-black pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black z-10 bg-transparent"
                  onClick={() => setShowPassword((show) => !show)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="btn w-full bg-black text-white border-black hover:bg-white hover:text-black hover:border-black font-bold rounded-full mb-4 transition"
            >
              Login
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn w-full border-black text-black bg-white hover:bg-black hover:text-white hover:border-black font-bold rounded-full flex items-center justify-center gap-2 transition"
            >
              <FaGoogle className="text-lg" />
              Login with Google
            </button>
            <div className="font-semibold  pt-2 mt-2">
              Don't have an account?
              <Link className="text-red-700" to={"/register"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
