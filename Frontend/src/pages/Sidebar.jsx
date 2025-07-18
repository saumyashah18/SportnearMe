// src/components/Sidebar.jsx
import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose, isLoggedIn }) {
  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Location", link: "/location" },
    { name: "Sports Catalogue", link: "/catalogue" },
    { name: "Host Your Services", link: "/signup-host" },
  ];

  const handleProfileClick = () => {
    if (isLoggedIn) navigate("/profile");
    else navigate("/login"); // or open AuthModal
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-blue-400">SportnearMe</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col p-4 space-y-4">
        {links.map((item) => (
          <a
            key={item.name}
            href={item.link}
            onClick={onClose}
            className="hover:text-blue-400 text-lg"
          >
            {item.name}
          </a>
        ))}
        <button
          onClick={handleProfileClick}
          className="hover:text-blue-400 text-left text-lg"
        >
          {isLoggedIn ? "My Profile" : "Login / Sign Up"}
        </button>
      </div>
    </div>
  );
}
