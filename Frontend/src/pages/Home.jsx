// src/pages/Home.jsx
import React, { useState } from "react";

export default function Home() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const sports = [
    { name: "Badminton", img: "/images/badminton.png", link: "/catalogue" },
    { name: "Pickleball", img: "/images/pickleball.png", link: "/turfbooking" },
    { name: "Tennis", img: "/images/tennis.jpeg", link:"/confirmbooking"},
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
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="text-center mb-2">
          <h1 className="text-4xl font-extrabold text-blue-400">SportnearMe</h1>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 px-4 text-sm md:text-base">
          {["Home", "Location", "About Us"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300 mt-2"
            >
              {item}
            </a>
          ))}
          <a
            href="/signup-host"
            className="relative text-white hover:text-blue-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-300 hover:after:w-full after:transition-all after:duration-300 mt-2"
          >
            Host Your Services
          </a>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Login / Sign Up
          </button>
        </nav>
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur flex items-center justify-center">
          <div className="bg-[#111827] text-white max-w-md w-full p-6 relative shadow-xl">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 text-2xl hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-center text-xl font-semibold mb-6">Get Started</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-600 rounded py-2 hover:bg-gray-800 transition">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span>Continue with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-600 rounded py-2 hover:bg-gray-800 transition">
                📧 <span>Continue with Email</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-600 rounded py-2 hover:bg-gray-800 transition">
                 <span>Continue with Apple</span>
              </button>
            </div>
            <div className="my-4 text-center text-sm text-gray-500">OR</div>
            <div className="border border-gray-600 px-3 py-2 rounded flex items-center gap-2 text-gray-400 bg-gray-900">
              🇮🇳 +91
              <input
                type="text"
                placeholder="Continue with mobile number"
                className="w-full outline-none bg-transparent text-white placeholder-gray-500"
              />
            </div>
            <p className="text-xs text-gray-500 text-center mt-6">
              I agree to the <a href="#" className="underline hover:text-white">Terms & Conditions</a> &
              <a href="#" className="underline hover:text-white"> Privacy Policy</a>
            </p>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[70vh] p-4">
        {/* Cards */}
        <div className="overflow-y-auto bg-gray-800 rounded-md p-2 space-y-3">
          <div className="flex gap-3 bg-gray-700 p-2 rounded">
            <img src="/images/tennis.jpeg" className="w-20 h-20 rounded object-cover" alt="ground" />
            <div>
              <h3 className="font-semibold">Super Smash Court</h3>
              <p className="text-sm">Badminton • ₹300/hr</p>
              <p className="text-xs text-gray-300">3.1 km • Indoor • Rated 4.5⭐</p>
            </div>
          </div>
          {/* Add dynamic cards later */}
        </div>

        {/* Map */}
        <div className="rounded-md bg-blue-950 flex items-center justify-center text-white text-xl">
          {/* Google Maps embed */}
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
        <h2 className="text-lg font-semibold text-white mb-4">Explore Sports</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sports.map((sport, idx) => (
            <a href={sport.link || "#"} key={idx}>
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
      <footer className="text-center mt-6 py-3 text-sm text-gray-400">
        &copy; 2025 SportWeb. Find, Book, Play.
      </footer>
    </div>
  );
}
