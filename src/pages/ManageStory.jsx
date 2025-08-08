import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxios";

const ManageStories = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editData, setEditData] = useState(null);

  // TanStack Query for fetching stories
  const {
    data: stories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stories", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/stories/${user.email}`);
      if (!data || data.length === 0) {
        toast.info("NO story is added");
      }
      return data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/stories/${id}`);
      toast.success("Story deleted");
      refetch();
    } catch (error) {
      toast.error("Failed to delete story");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleEdit = (story) => {
    setEditData({ ...story });
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.put(`/stories/${editData._id}`, editData);
      toast.success("Story updated successfully!");
      refetch();
      setEditData(null);
    } catch (error) {
      toast.error("Failed to update story.");
    }
  };

  const handleRemoveImage = async (storyId, imageUrl) => {
    try {
      await axiosSecure.patch(`/stories/${storyId}/remove-image`, { imageUrl });
      toast.success("Image removed");
      refetch();
    } catch (error) {
      toast.error("Failed to remove image");
    }
  };

  if (!user || isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">
        Manage Your Stories
      </h2>
      {!stories.length && (
        <div className="flex border-2 border-dashed flex-col items-center justify-center min-h-[400px]">
          <h1 className="font-bold text-2xl text-center">No Stories Added</h1>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white shadow-lg rounded p-4 space-y-2"
          >
            <h3 className="text-xl font-semibold">{story.title}</h3>
            <p className="text-gray-700">{story.description}</p>
            <div className="grid grid-cols-2 gap-2">
              {story.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="Story"
                    className="rounded object-cover h-32 w-full"
                  />
                  <button
                    onClick={() => handleRemoveImage(story._id, img)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => handleEdit(story)}
                className="btn btn-outline btn-primary flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => confirmDelete(story._id)}
                className="btn btn-outline btn-error flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editData && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-center mb-6">
              ✏️ Edit Your Story
            </h3>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="input input-bordered w-full mb-4"
              placeholder="Story Title"
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="textarea textarea-bordered w-full mb-4"
              rows="4"
              placeholder="Story Description"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline hover:bg-gray-200 transition"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary hover:scale-105 transition"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStories;