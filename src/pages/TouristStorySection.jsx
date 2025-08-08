import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

export default function TouristStorySection() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get(
          "https://travelserver-three.vercel.app/stories/random"
        );
        setStories(data);
      } catch (err) {
        console.error("Failed to load random stories", err);
        toast.error("Failed to load stories.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleShareClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.warning("Please log in to share a story.");
      navigate("/login");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-inter">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
          ✨ Tourist Stories
        </h2>
        <button
          onClick={() => navigate("/community")}
          className="btn btn-outline btn-primary"
        >
          All Stories
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <span className="loading loading-dots loading-lg text-blue-600"></span>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-col"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {story.title}
              </h3>
              <p className="text-sm text-gray-700 mb-3 line-clamp-4">
                {story.description}
              </p>

              {/* Image preview */}
              {story.images && story.images.length > 0 && (
                <div className="mb-4">
                  <img
                    src={story.images[0]}
                    alt="Story"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}

              {/* Share Buttons */}
              <div className="mt-auto border-t pt-2 flex gap-2 justify-start items-center">
                <FacebookShareButton
                  url={window.location.href}
                  quote={story.title}
                  onClick={handleShareClick}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={story.title}
                  onClick={handleShareClick}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={window.location.href}
                  title={story.title}
                  onClick={handleShareClick}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                {/* Fake Instagram Button (visual only) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info(
                      "Instagram sharing is not supported via browser."
                    );
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold"
                  title="Instagram"
                >
                  IG
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
