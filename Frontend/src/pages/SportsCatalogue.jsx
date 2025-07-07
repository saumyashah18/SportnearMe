import React from "react";

export default function SportsCatalogue() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Header */}
      <header className="bg-[#1e293b] shadow p-6 flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-400 text-center">Sports Catalogue</h1>

        {/* Filters Centered */}
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <select className="bg-[#334155] text-white px-4 py-2 rounded focus:outline-none">
            <option disabled selected>Filter by Sport</option>
            <option>Badminton</option>
            <option>Football</option>
            <option>Tennis</option>
            <option>Pickleball</option>
          </select>
          <select className="bg-[#334155] text-white px-4 py-2 rounded focus:outline-none">
            <option disabled selected>Sort by Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
          <select className="bg-[#334155] text-white px-4 py-2 rounded focus:outline-none">
            <option disabled selected>Nearby</option>
            <option>Within 2km</option>
            <option>Within 5km</option>
            <option>Within 10km</option>
          </select>
        </div>
      </header>

      {/* Listings */}
      <main className="p-6 space-y-4 max-w-3xl mx-auto">
        {/* Turf Card 1 */}
        <div className="bg-[#1e293b] rounded-lg p-4 flex gap-4 hover:bg-[#334155] transition">
          <img
            src="/public/images/tennis.jpeg"
            alt="Turf"
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h2 className="text-xl font-bold">Super Smash Court</h2>
            <p className="text-gray-300">Badminton • ₹300/hr</p>
            <p className="text-sm text-gray-400">3.1 km • Indoor • Rated 4.5⭐</p>
          </div>
        </div>

        {/* Turf Card 2 */}
        <div className="bg-[#1e293b] rounded-lg p-4 flex gap-4 hover:bg-[#334155] transition">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
            alt="Turf"
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h2 className="text-xl font-bold">Urban Turf Arena</h2>
            <p className="text-gray-300">Football • ₹700/hr</p>
            <p className="text-sm text-gray-400">1.8 km • Outdoor • Rated 4.7⭐</p>
          </div>
        </div>
      </main>
    </div>
  );
}
