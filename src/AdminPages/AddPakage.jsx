import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../hooks/useAxios";

export default function AddPakage() {
   const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState({
    id: "",
    tourType: "",
    tripTitle: "",
    description: "",
    price: "",
    duration: "",
    location: "",
    images: ["", "", ""],
    highlights: ["", "", ""],
    tourPlan: [
      { day: 1, activity: "" },
      { day: 2, activity: "" },
      { day: 3, activity: "" },
    ],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, idx, key) => {
    const arr = [...form[key]];
    arr[idx] = e.target.value;
    setForm({ ...form, [key]: arr });
  };

  const handleTourPlanChange = (e, idx, field) => {
    const arr = [...form.tourPlan];
    arr[idx][field] = field === "day" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, tourPlan: arr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };
      await axiosSecure.post("/packages", payload);
      toast.success("Package added successfully!");
      console.log("hihihi")
      setForm({
        id: "",
        tourType: "",
        tripTitle: "",
        description: "",
        price: "",
        duration: "",
        location: "",
        images: ["", "", ""],
        highlights: ["", "", ""],
        tourPlan: [
          { day: 1, activity: "" },
          { day: 2, activity: "" },
          { day: 3, activity: "" },
        ],
      });
    } catch (error) {
        console.log(error);
      toast.error("Failed to add package.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Package ID</label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Tour Type</label>
          <input
            type="text"
            name="tourType"
            value={form.tourType}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Trip Title</label>
          <input
            type="text"
            name="tripTitle"
            value={form.tripTitle}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-semibold">Price (BDT)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold">Duration</label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>
        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Images (3 URLs)</label>
          {form.images.map((img, idx) => (
            <input
              key={idx}
              type="text"
              value={img}
              onChange={(e) => handleArrayChange(e, idx, "images")}
              className="input input-bordered w-full mb-2"
              placeholder={`Image URL ${idx + 1}`}
              required
            />
          ))}
        </div>
        <div>
          <label className="font-semibold">Highlights (3)</label>
          {form.highlights.map((hl, idx) => (
            <input
              key={idx}
              type="text"
              value={hl}
              onChange={(e) => handleArrayChange(e, idx, "highlights")}
              className="input input-bordered w-full mb-2"
              placeholder={`Highlight ${idx + 1}`}
              required
            />
          ))}
        </div>
        <div>
          <label className="font-semibold">Tour Plan (3 Days)</label>
          {form.tourPlan.map((plan, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="number"
                min={1}
                name={`day${idx}`}
                value={plan.day}
                onChange={(e) => handleTourPlanChange(e, idx, "day")}
                className="input input-bordered w-20"
                required
              />
              <input
                type="text"
                name={`activity${idx}`}
                value={plan.activity}
                onChange={(e) => handleTourPlanChange(e, idx, "activity")}
                className="input input-bordered flex-1"
                placeholder={`Activity for Day ${plan.day}`}
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Add Package
        </button>
      </form>
       <ToastContainer position="top-left" />
    </div>
  );
}