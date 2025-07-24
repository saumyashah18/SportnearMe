import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TurfProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firebaseUid: "",
    phone: "",
    name: "",
    dob: "",
    email: "",
    gender: "",
    turfName: "",
    turfAddress: "",
    turfDescription: "",
    turfLocationUrl: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const firebaseUid = localStorage.getItem("firebaseUid"); 

    if (!firebaseUid) {
      navigate("/"); 
      return;
    }

    setProfile((prev) => ({ ...prev, firebaseUid }));

    // Fetch profile
    fetch(`http://localhost:5001/api/owner/profile/${firebaseUid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.log("Profile fetch error:", err.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/owner/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      const data = await res.json();
      console.log("Saved profile:", data);
      setIsEditing(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("firebaseUid");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Turf Owner Profile</h1>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-xl space-y-6 max-w-3xl mx-auto shadow-md">
        {/* Owner Info */}
        <h2 className="text-2xl text-center font-semibold border-b pb-2 border-slate-600">Owner Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-2 rounded bg-[#0f172a] border border-slate-700"
            name="name"
            placeholder="Owner's Full Name"
            value={profile.name}
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
