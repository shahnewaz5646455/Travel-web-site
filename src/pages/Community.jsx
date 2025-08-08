import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function Community() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get(
          "https://travelserver-three.vercel.app/stories"
        );
        setStories(data);
      } catch (err) {
        console.error("Failed to load stories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-dots loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 font-inter">
      <h2 className="text-4xl font-bold text-center text-gray-950 mb-10">
        🌍 Community Travel Stories
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {story.title || "Untitled Story"}
            </h3>

            {/* Description */}
            <p className="text-gray-700 mb-4 line-clamp-4">
              {story.description || "No description available."}
            </p>

            {/* Images */}
            {story.images && story.images.length > 0 && (
              <div
                className={`grid gap-2 mb-4 ${
                  story.images.length === 1
                    ? "grid-cols-1"
                    : story.images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                } max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100 pr-1`}
              >
                {story.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`story-${idx}`}
                    className="rounded-lg object-cover w-full h-40"
                  />
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex justify-start gap-4 mt-auto pt-2 border-t border-gray-200">
              <FacebookShareButton
                url={window.location.href}
                quote={story.title}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={story.title}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={window.location.href}
                title={story.title}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
