import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FaHeart, FaShareAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";



const mockTurfData = {
  images: [
    "https://unsplash.com/photos/brown-soil-with-green-grass-F44LVxRpA5k",
    "https://via.placeholder.com/800x300?text=Image+2",
    "https://via.placeholder.com/800x300?text=Image+3",
  ],
  description: "A premium turf for football and cricket with LED lighting, seating, and locker facilities.",
  offer: {
    title: "Monsoon Discount!",
    details: "Get 20% off on bookings before 5 PM.",
  },
  sports: [
    {
      name: "Football",
      pricing: [
        { day: "Weekdays", price: 800, time: "6 AM - 6 PM" },
        { day: "Weekends", price: 1000, time: "6 AM - 10 PM" },
      ],
    },
    {
      name: "Cricket",
      pricing: [
        { day: "Weekdays", price: 1000, time: "6 AM - 6 PM" },
        { day: "Weekends", price: 1200, time: "6 AM - 10 PM" },
      ],
    },
  ],
  amenities: ["Floodlights", "Drinking Water", "Locker Room", "First Aid"],
  rating: 4.5,
  reviews: [
    {
      user: "Aman",
      stars: 5,
      comment: "Excellent turf and well maintained.",
    },
    {
      user: "Priya",
      stars: 4,
      comment: "Great experience but parking was limited.",
    },
  ],
  cancellation: [
    "Full refund if cancelled 24 hours before slot.",
    "50% refund if cancelled 6-24 hours before.",
    "No refund if cancelled within 6 hours.",
  ],
  terms: [
    "Sports shoes mandatory.",
    "No outside food allowed.",
    "Please vacate on time.",
  ],
  location: {
    lat: 23.0225,
    lng: 72.5714,
  },
};

const TurfDescription = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % mockTurfData.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const turfData = mockTurfData;

  return (
    <div className="w-full text-white bg-[#0f172a] min-h-screen relative pb-24">
      {/* Banner Slider */}
      <div className="relative w-full h-64 overflow-hidden">
        {turfData.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="banner"
            className={`w-full h-64 object-cover absolute transition-opacity duration-1000 ${
              index === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Like & Share - Bottom Right of Banner */}
        <div className="absolute bottom-4 right-4 flex space-x-3">
          <button className="bg-white/90 rounded-full p-2 shadow-md">
            <FaHeart className="text-blue-500" />
          </button>
          <button className="bg-white/90 rounded-full p-2 shadow-md">
            <FaShareAlt className="text-blue-500" />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-blue-400 mb-2">About Venue</h2>
        <p className="text-gray-300">{turfData.description}</p>

        {/* Offer Section */}
        {turfData.offer && (
          <div className="bg-green-700/20 text-green-300 p-3 rounded-md mt-4">
            <strong>{turfData.offer.title}</strong> - {turfData.offer.details}
          </div>
        )}

        {/* Sports Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-400">Available Sports</h3>
          <div className="flex gap-4 mt-2 flex-wrap">
            {turfData.sports.map((sport) => (
              <button
                key={sport.name}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 border rounded-md ${
                  selectedSport?.name === sport.name
                    ? "bg-blue-600 text-white"
                    : "bg-[#1e293b] text-blue-300 border-blue-500"
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>

          {selectedSport && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-blue-300">Pricing & Timings</h4>
              <ul className="mt-2 space-y-2">
                {selectedSport.pricing.map((day, idx) => (
                  <li key={idx} className="bg-[#1e293b] p-2 rounded-md text-gray-300">
                    <strong>{day.day}</strong>: ₹{day.price} ({day.time})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-400">Amenities</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {turfData.amenities.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#1e293b] rounded-md text-sm text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-400">Overall Rating</h3>
          <p className="text-3xl font-bold mt-1 text-yellow-400">{turfData.rating} ⭐</p>
          <div className="mt-4 space-y-3">
            {turfData.reviews.map((review, idx) => (
              <div key={idx} className="bg-green-700/20 p-3 rounded-md text-gray-300">
                <p className="font-semibold">{review.user}</p>
                <p className="text-yellow-400">{review.stars}⭐</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-400">Cancellation Policy</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
            {turfData.cancellation.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Terms */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-400">Venue Terms & Conditions</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-300">
            {turfData.terms.map((term, idx) => (
              <li key={idx}>{term}</li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="mt-8 h-64 w-full rounded-md overflow-hidden">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "https://www.google.com/maps/embed?..." }}
            defaultCenter={{
              lat: turfData.location.lat,
              lng: turfData.location.lng,
            }}
            defaultZoom={16}
          >
            <div className="text-blue-600">📍</div>
          </GoogleMapReact>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1e293b] text-white px-4 py-3 flex justify-between items-center z-50 shadow-[0_-1px_4px_rgba(0,0,0,0.4)]">
  <div className="flex items-center space-x-6 text-xl">
    <div className="flex items-center space-x-2">
      <FaThumbsUp className="text-white" />
      <span className="text-gray-300 text-base">33</span>
    </div>
    <div className="flex items-center space-x-2">
      <FaThumbsDown className="text-white" />
    </div>
  </div>

  <button
   className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold text-base transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700">
    Book now
  </button>
</div>
    </div>      
  );
};

export default TurfDescription;
