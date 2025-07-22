// src/pages/TurfProfile.jsx
import React, { useState, useEffect } from "react";

export default function TurfProfile() {
  // Mock data — replace with actual fetch from DB or API
  const [profile, setProfile] = useState({
    fullName: "Samzie Shah",
    dob: "18/12/2004",
    email: "s@gmail.com",
    gender: "Female",
    turfName: "City Sports Arena",
    turfAddress: "123 Sports Lane, Mumbai",
    turfDescription: "Premium turf for badminton, cricket, and more.",
    turfLocationUrl: "https://maps.google.com/example",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save the profile to backend or localStorage
    console.log("Saved profile:", profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Turf Owner Profile</h1>

      <div className="bg-[#1e293b] p-6 rounded-xl space-y-6 max-w-3xl mx-auto shadow-md">

        {/* Owner Info */}
        <h2 className="text-2xl text-center font-semibold border-b pb-2 border-slate-600">Owner Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-2 rounded bg-[#0f172a] border border-slate-700"
            name="fullName"
            placeholder="Owner's Full Name"
            value={profile.fullName}
            disabled={!isEditing}
            onChange={handleChange}
          />
          <input
            className="p-2 rounded bg-[#0f172a] border border-slate-700"
            name="dob"
            placeholder="DOB (dd/mm/yyyy)"
            value={profile.dob}
            disabled={!isEditing}
            onChange={handleChange}
          />
          <input
            className="p-2 rounded bg-[#0f172a] border border-slate-700"
            name="email"
            placeholder="Email"
            value={profile.email}
            disabled={!isEditing}
            onChange={handleChange}
          />
          <input
            className="p-2 rounded bg-[#0f172a] border border-slate-700"
            name="gender"
            placeholder="Gender"
            value={profile.gender}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        {/* Turf Info */}
        <h2 className="text-2xl text-center font-semibold border-b pb-2 border-slate-600 mt-4">Turf Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-2 rounded bg-[#0f172a] border border-slate-700"
            name="turfName"
            placeholder="Turf Name"
            value={profile.turfName}
            disabled={!isEditing}
            onChange={handleChange}
          />
          <input
            className="p-2 rounded bg-[#0f172a] border border-slate-700"
            name="turfAddress"
            placeholder="Turf Address"
            value={profile.turfAddress}
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>
        <textarea
          className="w-full p-2 rounded bg-[#0f172a] border border-slate-700"
          name="turfDescription"
          placeholder="Turf Description"
          value={profile.turfDescription}
          disabled={!isEditing}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 rounded bg-[#0f172a] border border-slate-700"
          name="turfLocationUrl"
          placeholder="Google Maps Link"
          value={profile.turfLocationUrl}
          disabled={!isEditing}
          onChange={handleChange}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
