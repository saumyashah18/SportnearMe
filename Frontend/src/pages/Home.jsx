// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import { Menu } from "lucide-react";

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  

  const sportsQuotes = [
    "🏸 Smash your limits, not just the shuttle!",
    "⚽ Play hard, dream big, rest later.",
    "🏀 Dribble, shoot, repeat.",
    "🎾 Every day is a good day for tennis.",
    "⚾ Home runs and hustle.",
    "🏆 Champions train, losers complain.",
    "🏃‍♂️ Sweat is your fat crying.",
    "🤾‍♂️ Hustle for that muscle.",
    "💪 No pain, no gain, just game.",
    "🏐 Spike it till you make it!",
    "⚽ One team, one dream.",
    "🎯 Hustle, hit, never quit.",
    "🔥 Push yourself because no one else is going to do it for you.",
    "🚀 Your only limit is you.",
    "🏃‍♂️ The body achieves what the mind believes."
  ];

  useEffect(() => {
    setQuote(sportsQuotes[Math.floor(Math.random() * sportsQuotes.length)]);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
  };


  const sports = [
    { name: "Badminton", img: "/images/badminton.png", link: "/catalogue" },
    { name: "Pickleball", img: "/images/pickleball.png", link: "/turfbooking" },
    { name: "Tennis", img: "/images/tennis.jpeg", link: "/confirmbooking" },
    { name: "Volleyball", img: "/images/volleyball.png" },
    { name: "Football Ground", img: "/images/football.png" },
    { name: "Cricket Ground", img: "/images/cricket.png" },
    { name: "Paddle Sport", img: "/images/paddle.png" },
    { name: "Table Tennis", img: "/images/tt.png" },
    { name: "Skating", img: "/images/skating.png" },
    { name: "Basketball", img: "/images/basketball.png" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header with hamburger for mobile and logo */}
      <div className="flex items-center justify-between py-4 px-4 bg-gray-900">
        <button className="md:hidden text-white cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-8 h-8" />
        </button>
        <h1 className="text-2xl md:text-4xl font-extrabold text-blue-400 text-center flex-grow">
          SportnearMe
        </h1>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700/50 py-2 px-6 text-lg md:flex justify-center items-center gap-6 hidden">
        {["Home", "Location", "About Us"].map((item) => (
          <a
            key={item}
            href="#"
            className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            {item}
          </a>
        ))}
        <a href="/catalogue" className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Sports Catalogue</a>
        <a href="/signup-host" className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Host Your Services</a>
       {isLoggedIn ? (
  <button onClick={handleProfileClick} className="flex items-center gap-2 cursor-pointer">
    <img
      src={user?.profileImageUrl || "/avatars/default.png"}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
      onError={(e) => { e.target.onerror = null; e.target.src="/avatars/default.png" }}
    />
  </button>
) : (
  <button
    onClick={() => setAuthModalOpen(true)}
    className="px-4 py-1 rounded cursor-pointer bg-blue-600 text-white text-lg hover:bg-blue-500 transition whitespace-nowrap"
  >
    Login / Sign Up
  </button>
)}


  
      </nav>

      {/* Sidebar for Mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isLoggedIn={isLoggedIn} />

      {/* Auth Modal */}
     <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />


      {/* Highlighted Quote */}
      <div className="bg-gray-900 py-4 text-center px-4">
        {isLoggedIn && (
          <p className="text-lg md:text-3xl font-semibold mb-2">
            Hello, {user?.firstName || user || "Player"}!
          </p>
        )}
        <p className="text-blue-100 font-semibold text-sm md:text-2xl animate-pulse">{quote}</p>
      </div>

      {/* Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[70vh] p-4">
        {/* Cards */}
        <div className="overflow-y-auto bg-gray-800 rounded-md p-2 space-y-3">
          <div className="flex gap-3 bg-gray-700 p-2 rounded">
            <img
              src="/images/tennis.jpeg"
              className="w-20 h-20 rounded object-cover"
              alt="ground"
            />
            <div>
              <h3 className="font-semibold">Super Smash Court</h3>
              <p className="text-sm">Badminton • ₹300/hr</p>
              <p className="text-xs text-gray-300">
                3.1 km • Indoor • Rated 4.5⭐
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-md bg-blue-950 flex items-center justify-center text-white text-xl">
          <iframe
            src="https://www.google.com/maps/embed?..."
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SportnearMe Map"
          ></iframe>
        </div>
      </section>

      {/* Banner Carousel */}
      <section className="w-full mt-4 px-4 overflow-x-auto whitespace-nowrap space-x-4 flex">
        <img src="/images/intro.png" className="inline-block rounded-lg cursor-pointer" alt="banner1" />
        <img src="/images/volleyball.png" className="inline-block rounded-lg cursor-pointer" alt="banner2" />
        <img src="/images/badminton.png" className="inline-block rounded-lg cursor-pointer" alt="banner3" />
        <img src="/images/basketball.png" className="inline-block rounded-lg cursor-pointer" alt="banner4" />
        <img src="/images/pickleball.png" className="inline-block rounded-lg cursor-pointer" alt="banner5" />
      </section>

      {/* Sports Cards Grid */}
      <section className="w-full mt-6 px-4">
        <h2 className="text-lg font-semibold text-white mb-4">Explore Sports</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sports.map((sport, idx) => (
            <a href={sport.link || "#"} key={idx} className="cursor-pointer">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform">
                <img src={sport.img} alt={sport.name} className="w-full h-36 object-cover" />
                <div className="p-2 text-center">
                  <p className="text-white font-medium">{sport.name}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-6 py-3 text-sm text-gray-400">&copy; 2025 SportWeb. Find, Book, Play.</footer>
    </div>
  );
}
