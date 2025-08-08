import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router"; // Changed import from react-router-dom to react-router
import {
  FaPenFancy,
  FaImage,
  FaRegFileAlt,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxios";

const AddStories = () => {
  // Destructure errors from formState for validation messages
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Function to handle image file selection and upload
  const handleImageUpload = async (event) => {
    const files = event.target.files; // Get all selected files
    if (!files || files.length === 0) {
      setImageUrls([]); // Clear image URLs if no files are selected
      setIsUploading(false);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=17b3fe542cc377f40ed27a1bf6277038`;
    const uploadedUrls = [...imageUrls]; // Copy current image URLs

    try {
      // Loop through all selected files
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("image", files[i]);

        const res = await axios.post(uploadUrl, formData);
        const imgUrl = res.data.data.url;
        uploadedUrls.push(imgUrl); // Add new URL to the array

        // Update progress (optional, for UX)
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setImageUrls(uploadedUrls); // Update state with all URLs
      setIsUploading(false);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images.");
      setIsUploading(false);
    }
  };
  console.log(imageUrls);
  const onSubmit = async (data) => {
    // Prevent submission if images are still uploading, or if files were selected but not uploaded
    if (isUploading) {
      toast.error("Please wait for images to finish uploading.");
      return;
    }
    if (data.images && data.images.length > 0 && imageUrls.length === 0) {
      toast.error("Please upload the selected images first.");
      return;
    }

    try {
      const storyData = {
        title: data.title,
        description: data.description,
        images: imageUrls, // Use the state variable that holds uploaded URLs
        authorEmail: user?.email, // Use optional chaining for user.email
      };
      console.log("Story Data to be sent to Backend:", storyData); // Debugging log

      await axiosSecure.post("/stories", storyData);
      toast.success("🎉 Story added successfully!");
      reset(); // Reset form fields
      setImageUrls([]); // Clear image URLs after successful submission
      if (userRole === "user") {
        navigate("/dashboard/manage-stories"); // Navigate to manage stories
      } else {
        navigate("/GuideDashboard/tourguidestorys");
      }
    } catch (error) {
      console.error("Error adding story to database:", error);
      toast.error("❗ Failed to add story.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-inter">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 flex items-center justify-center gap-3">
          <FaPenFancy className="text-blue-600" /> Share Your Story
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className=" text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <FaRegFileAlt className="text-blue-500" /> Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 10,
                  message: "Title must be at least 10 characters long",
                },
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none transition-all duration-200"
              placeholder="Enter story title"
            />
            {/* Display validation error for title */}
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className=" text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <FaRegFileAlt className="text-blue-500" /> Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "Description must be at least 50 characters long",
                },
              })}
              rows="5"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base outline-none resize-y transition-all duration-200"
              placeholder="Share your experience..."
            ></textarea>
            {/* Display validation error for description */}
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Upload Field */}
          <div>
            <label
              htmlFor="images"
              className=" text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <FaImage className="text-blue-500" /> Upload Images
            </label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-900
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 transition-all duration-200
                cursor-pointer border border-gray-300 rounded-lg p-2"
            />
            <p className="text-sm text-gray-500 mt-2">
              You can select multiple image files.
            </p>

            {/* Upload Status/Count Display */}
            {isUploading && (
              <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium">
                <FaSpinner className="animate-spin" /> Uploading... (
                {uploadProgress}%)
              </div>
            )}
            {!isUploading && imageUrls.length > 0 && (
              <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
                <FaCheckCircle /> {imageUrls.length} image(s) uploaded.
              </div>
            )}
            {!isUploading && imageUrls.length === 0 && (
              <div className="mt-4 flex items-center gap-2 text-gray-500 font-medium">
                No images selected.
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            disabled={isUploading} // Disable button during image upload
          >
            {isUploading ? (
              <>
                <FaSpinner className="animate-spin mr-3 text-lg" /> Uploading
                Images...
              </>
            ) : (
              <>
                <FaPenFancy className="mr-3 text-lg" /> Submit Story
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStories;
