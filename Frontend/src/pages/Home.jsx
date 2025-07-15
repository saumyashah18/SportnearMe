""// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Profile from "./profile";

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [quote, setQuote] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAuth();

  const sportsQuotes = [
    "\ud83c\udfbd Smash your limits, not just the shuttle!",
    "\u26bd Play hard, dream big, rest later.",
    "\ud83c\udfc0 Dribble, shoot, repeat.",
    "\ud83c\udfbe Every day is a good day for tennis.",
    "\u26be Home runs and hustle.",
    "\ud83e\udd47 Champions train, losers complain.",
    "\ud83c\udfc3\u200d\u2642\ufe0f Sweat is your fat crying.",
    "\ud83e\uddfe\u200d\u2642\ufe0f Hustle for that muscle.",
    "\ud83d\udcaa No pain, no gain, just game.",
    "\ud83c\udfd0 Spike it till you make it!",
    "\u26bd One team, one dream.",
    "\ud83c\udfaf Hustle, hit, never quit.",
    "\ud83d\udd25 Push yourself because no one else is going to do it for you.",
    "\ud83d\ude80 Your only limit is you.",
    "\ud83c\udfc3\u200d\u2642\ufe0f The body achieves what the mind believes."
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
    setQuote(sportsQuotes[Math.floor(Math.random() * sportsQuotes.length)]);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setShowLogout(false);
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
      {/* Centered Logo */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-extrabold text-blue-400">SportnearMe</h1>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700/50 py-2 flex justify-center items-center gap-6 px-6 text-lg md:text-xl whitespace-nowrap overflow-x-auto">
        {["Home", "Location", "About Us"].map((item) => (
          <a
            key={item}
            href="#"
            className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300"
          >
            {item}
          </a>
        ))}

        <a
          href="/catalogue"
          className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300"
        >
          Sports Catalogue
        </a>

        <a
          href="/signup-host"
          className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300"
        >
          Host Your Services
        </a>

        {isLoggedIn ? (
          <button
            onClick={handleProfileClick}
            className="px-4 py-1 rounded bg-green-600 text-white text-lg hover:bg-green-500 transition whitespace-nowrap"
          >
            Profile
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />

      {/* Highlighted Quote */}
      <div className="bg-gray-900 py-4 text-center px-4">
        {isLoggedIn && (
          <p className="text-lg md:text-3xl font-semibold mb-2">
            Hello, {username.firstName}!
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
        <img src="/images/intro.png" className="inline-block rounded-lg" alt="banner1" />
        <img src="/images/volleyball.png" className="inline-block rounded-lg" alt="banner2" />
        <img src="/images/badminton.png" className="inline-block rounded-lg" alt="banner3" />
        <img src="/images/basketball.png" className="inline-block rounded-lg" alt="banner4" />
        <img src="/images/pickleball.png" className="inline-block rounded-lg" alt="banner5" />
      </section>

      {/* Sports Cards Grid */}
      <section className="w-full mt-6 px-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Explore Sports
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sports.map((sport, idx) => (
            <a href={sport.link || "#"} key={idx}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform">
                <img
                  src={sport.img}
                  alt={sport.name}
                  className="w-full h-36 object-cover"
                />
                <div className="p-2 text-center">
                  <p className="text-white font-medium">{sport.name}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-6 py-3 text-sm text-gray-400">
        &copy; 2025 SportWeb. Find, Book, Play.
      </footer>
    </div>
  );
}
