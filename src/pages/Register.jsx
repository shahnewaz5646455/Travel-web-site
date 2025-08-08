import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaUserCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import registerAni from "../assets/register.json";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router";
import { GoogleAuthProvider } from "firebase/auth";
export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const { uploadProfile, createUser, setUserRole, signInWithGoogle } =
    useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Image upload handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=17b3fe542cc377f40ed27a1bf6277038`;
    try {
      const res = await axios.post(uploadUrl, formData);
      setImage(res.data.data.url);
      setValue("image", res.data.data.url, { shouldValidate: true });
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed!");
    }
  };

  // Registration handler
  const onSubmit = async (data) => {
    if (!data.image) {
      toast.error("Profile image is required!");
      return;
    }
    try {
      // 1. Create user with email and password
      await createUser(data.email, data.password);

      // 2. Upload profile (displayName and photoURL)
      const userProfile = {
        displayName: data.name,
        photoURL: data.image,
      };
      await uploadProfile(userProfile);

      // 3. Save user to database
      const anotherData = {
        displayName: data.name,
        email: data.email,
        role: "user",
        createdAt: new Date().toISOString(),
        last_login: new Date().toISOString(),
        photoURL: data.image,
      };

      await axios.post(
        "https://travelserver-three.vercel.app/user",
        anotherData
      );

      // 4. Fetch user role and set it (like login page)
      const response = await fetch(
        `https://travelserver-three.vercel.app/user-role/${data.email}`
      );
      const roleData = await response.json();
      setUserRole(roleData.role);

      toast.success("Registration successful!");
      navigate(location.state || "/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Registration failed!");
    }
  };

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
      } catch (error) {
        console.log(error);
        // Ignore if user already exists
      }

      // Fetch user role and set it (like login page)
      const response = await fetch(
        `https://travelserver-three.vercel.app/user-role/${user.email}`
      );
      const data = await response.json();
      setUserRole(data.role);

      navigate(location.state || "/");
      toast.success("Logged in with Google!");
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Lottie animationData={registerAni} loop={true} className="w-72 h-72" />
      </div>
      {/* Register Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white border-2 border-black rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-extrabold text-black mb-8 text-center">
            Register
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <div className="mb-6">
              <label
                className="block text-black font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`input input-bordered w-full border-black bg-white text-black focus:outline-none focus:border-black ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your name"
                autoComplete="name"
              />
              {errors.name && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>
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
            {/* Image Upload */}
            <div className="mb-6">
              <label
                className="block text-black font-semibold mb-2"
                htmlFor="image"
              >
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="btn btn-outline border-black text-black hover:bg-black hover:text-white rounded-full px-4 py-2">
                    Upload
                  </span>
                </label>
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-black"
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-gray-400" />
                )}
              </div>
              {/* Hidden input for react-hook-form validation */}
              <input
                type="hidden"
                {...register("image", {
                  required: "Profile image is required",
                })}
                value={image || ""}
              />
              {errors.image && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.image.message}
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
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black z-10 bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
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
            {/* Register Button */}
            <button
              type="submit"
              className="btn w-full bg-black text-white border-black hover:bg-white hover:text-black hover:border-black font-bold rounded-full mb-4 transition"
            >
              Register
            </button>
            {/* Google Register */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="btn w-full border-black text-black bg-white hover:bg-black hover:text-white hover:border-black font-bold rounded-full flex items-center justify-center gap-2 transition"
            >
              <FaGoogle className="text-lg" />
              Register with Google
            </button>
            <div>
              <p className="font-semibold pt-2">
                Already have an account?
                <Link className="text-red-700" to={"/login"}>
                  Login
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
