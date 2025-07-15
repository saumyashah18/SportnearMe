import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Calendar, CreditCard, User2, Mail, Gift } from "lucide-react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-10">
      <div className="max-w-2xl mx-auto bg-[#1e293b] p-6 rounded-2xl shadow-xl">
        {/* Profile Header */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-400">{user.phone} <span className="text-blue-400 cursor-pointer">Change</span></p>
          </div>
          <div>
            {user.profileImage ? (
              <img src={user.profileImage} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                <User2 className="text-gray-300 w-8 h-8" />
              </div>
            )}
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-4">
          {/* Personal Details */}
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

          {/* Favorite Sports */}
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

          {/* My Bookings */}
          <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-700 cursor-pointer hover:bg-[#1e293b]">
            <div className="flex items-center gap-3">
              <Calendar className="text-teal-400" />
              <div>
                <h4 className="font-semibold">My Bookings</h4>
                <p className="text-sm text-gray-400">View your booked events and venues</p>
              </div>
            </div>
          </div>

          {/* Saved Payment Methods */}
          <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-700 cursor-pointer hover:bg-[#1e293b]">
            <div className="flex items-center gap-3">
              <CreditCard className="text-teal-400" />
              <div>
                <h4 className="font-semibold">Saved Payment Methods</h4>
                <p className="text-sm text-gray-400">View your saved payment methods</p>
              </div>
            </div>
          </div>

          {/* Corporate Profile */}
          <div className="bg-[#0f172a] rounded-xl p-4 border border-gray-700 cursor-pointer hover:bg-[#1e293b]">
            <div className="flex items-center gap-3">
              <User2 className="text-teal-400" />
              <div>
                <h4 className="font-semibold">Corporate Profile</h4>
                <p className="text-sm text-gray-400">View your booked events and venues</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 border border-red-500 text-red-500 hover:bg-red-600 hover:text-white rounded-full font-semibold"
          >
            <LogOut className="inline w-4 h-4 mr-1" /> LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}