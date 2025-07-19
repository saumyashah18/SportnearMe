import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Calendar, CreditCard, User2, Mail, Gift, Upload } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch("http://localhost:5001/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handleImageUpload = async () => {
    if (!newImageFile) return;

    const formData = new FormData();
    formData.append("profileImage", newImageFile);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5001/api/users/completeProfile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update profile image");
        return;
      }

      setUser(data.user);
      setShowUploadModal(false);
      setNewImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center">
        Loading profile…
      </div>
    );
  }

  const getProfileImageUrl = () => {
    if (user.profileImageUrl) {
      return user.profileImageUrl;
    } else {
      return `https://robohash.org/${user.firebaseUid || user.phone}?set=set4`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-10">
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-700 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-400">
              {user.phone} <span className="text-blue-400 cursor-pointer">Change</span>
            </p>
          </div>
          <div className="relative">
            <img
              src={getProfileImageUrl()}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border border-gray-600"
            />
            <button
              onClick={() => setShowUploadModal(true)}
              className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 hover:bg-blue-500"
              title="Change"
            >
              <Upload className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Personal Details</h3>
              <span className="text-blue-400 cursor-pointer">EDIT</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Mail className="w-4 h-4" />
              <span>{user.gmail || "Not Provided"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Gift className="w-4 h-4" />
              <span>{user.gender || "Not Mentioned"}</span>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Favorite Sports</h3>
              <span className="text-blue-400 cursor-pointer">EDIT</span>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-gray-300">
              {user.selectedSports?.length > 0 ? (
                user.selectedSports.map((sport, idx) => (
                  <span key={idx} className="bg-blue-800 px-3 py-1 rounded-full">
                    {sport}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No sports selected</span>
              )}
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-700 cursor-pointer hover:bg-[#1e293b]">
            <div className="flex items-center gap-3">
              <Calendar className="text-teal-400" />
              <div>
                <h4 className="font-semibold">My Bookings</h4>
                <p className="text-sm text-gray-400">View your booked events and venues</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-700 cursor-pointer hover:bg-[#1e293b]">
            <div className="flex items-center gap-3">
              <CreditCard className="text-teal-400" />
              <div>
                <h4 className="font-semibold">Saved Payment Methods</h4>
                <p className="text-sm text-gray-400">View your saved payment methods</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 border border-red-500 text-red-500 hover:bg-red-600 hover:text-white rounded-full font-semibold"
          >
            <LogOut className="inline w-4 h-4 mr-1" /> LOG OUT
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4 text-white">Update Profile Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImageFile(e.target.files[0])}
              className="text-white mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-1 rounded bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleImageUpload}
                disabled={!newImageFile}
                className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
