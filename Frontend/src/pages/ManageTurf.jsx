import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageTurf() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const initialData = {
    sports: [
      { sport: "Badminton", courts: "3", minSlotDuration: "60", advanceAmount: "500" },
      { sport: "Football", courts: "1", minSlotDuration: "90", advanceAmount: "1000" },
    ],
    primaryImage: null,
    galleryImages: [],
    amenities: ["Parking", "Washroom", "Floodlights"],
    availability: {
      sameForAll: false,
      defaultStart: "06:00",
      defaultEnd: "22:00",
      days: {
        Monday: { open: true, start: "06:00", end: "22:00" },
        Tuesday: { open: false, start: "", end: "" },
        Wednesday: { open: true, start: "08:00", end: "21:00" },
        Thursday: { open: false, start: "", end: "" },
        Friday: { open: true, start: "07:00", end: "23:00" },
        Saturday: { open: true, start: "06:00", end: "23:00" },
        Sunday: { open: true, start: "07:00", end: "21:00" },
      },
    },
  };

  const [data, setData] = useState(initialData);

  const handleSportChange = (index, field, value) => {
    const updatedSports = [...data.sports];
    updatedSports[index][field] = value;
    setData({ ...data, sports: updatedSports });
  };

  const handleAmenityToggle = (amenity) => {
    setData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", data);
    alert("Turf details saved successfully!");
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Manage Turf Profile</h1>

        {/* Sports Section */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Sports Offered</h2>
          {data.sports.map((sport, index) => (
            <div key={index} className="border-b border-white/20 pb-4 mb-4">
              {isEditing ? (
                <div className="space-y-2">
                  <h3 className="font-semibold">Sport Name:</h3>
                  <input
                    type="text"
                    value={sport.sport}
                    onChange={(e) => handleSportChange(index, "sport", e.target.value)}
                    className="p-2 rounded w-full text-black"
                  />
                  <h3 className="font-semibold">Number of Courts/Turfs:</h3>
                  <input
                    type="number"
                    value={sport.courts}
                    onChange={(e) => handleSportChange(index, "courts", e.target.value)}
                    className="p-2 rounded w-full text-black"
                  />
                  <h3 className="font-semibold">Minimum Slot Duration (minutes):</h3>
                  <input
                    type="number"
                    value={sport.minSlotDuration}
                    onChange={(e) => handleSportChange(index, "minSlotDuration", e.target.value)}
                    className="p-2 rounded w-full text-black"
                  />
                  <h3 className="font-semibold">Advance Payable Amount (₹):</h3>
                  <input
                    type="number"
                    value={sport.advanceAmount}
                    onChange={(e) => handleSportChange(index, "advanceAmount", e.target.value)}
                    className="p-2 rounded w-full text-black"
                  />
                   <h3 className="font-semibold">Price Amount (₹):</h3>
                  <input
                    type="number"
                    value={sport.priceAmount}
                    onChange={(e) => handleSportChange(index, "priceAmount", e.target.value)}
                    className="p-2 rounded w-full text-black"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <p>🏅 <b>Sport:</b> {sport.sport}</p>
                  <p>🏟️ <b>Courts:</b> {sport.courts}</p>
                  <p>⏱️ <b>Min Slot Duration:</b> {sport.minSlotDuration} minutes</p>
                  <p>💰 <b>Advance Amount:</b> ₹{sport.advanceAmount}</p>
                  <p>💵 <b>Price Amount:</b> ₹{sport.priceAmount}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Weekly Availability */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Weekly Availability</h2>
          {isEditing ? (
            <div className="space-y-2">
              {Object.entries(data.availability.days).map(([day, info]) => (
                <div key={day} className="space-y-1">
                  <h3 className="font-semibold">{day}:</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={info.open}
                      onChange={() =>
                        setData((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            days: {
                              ...prev.availability.days,
                              [day]: { ...info, open: !info.open },
                            },
                          },
                        }))
                      }
                    />
                    <input
                      type="time"
                      disabled={!info.open}
                      value={info.start}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            days: {
                              ...prev.availability.days,
                              [day]: { ...info, start: e.target.value },
                            },
                          },
                        }))
                      }
                      className="p-2 rounded text-black"
                    />
                    <input
                      type="time"
                      disabled={!info.open}
                      value={info.end}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          availability: {
                            ...prev.availability,
                            days: {
                              ...prev.availability.days,
                              [day]: { ...info, end: e.target.value },
                            },
                          },
                        }))
                      }
                      className="p-2 rounded text-black"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {Object.entries(data.availability.days).map(([day, info]) =>
                info.open ? (
                  <p key={day}>{day}: {info.start} - {info.end}</p>
                ) : (
                  <p key={day}>{day}: Closed</p>
                )
              )}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Amenities Offered</h2>
          <div className="flex flex-wrap gap-2">
            {["Parking", "Washroom", "Drinking Water", "Floodlights", "Locker Rooms", "Changing Rooms", "First Aid"].map((item) => (
              <button
                key={item}
                onClick={() => isEditing && handleAmenityToggle(item)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  data.amenities.includes(item) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                } ${isEditing ? "cursor-pointer" : "cursor-default"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          {isEditing ? (
            <>
              <h3 className="font-semibold">Primary Image:</h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, primaryImage: e.target.files[0] }))
                }
                className="p-2 rounded w-full text-black mb-2"
              />
              <h3 className="font-semibold">Gallery Images (Max 4):</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    galleryImages: Array.from(e.target.files).slice(0, 4),
                  }))
                }
                className="p-2 rounded w-full text-black"
              />
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.primaryImage ? (
                <img
                  src={URL.createObjectURL(data.primaryImage)}
                  alt="Primary"
                  className="w-40 h-40 object-cover rounded"
                />
              ) : (
                <p>No primary image uploaded.</p>
              )}
              {data.galleryImages.length > 0 ? (
                data.galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`Gallery ${idx}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))
              ) : (
                <p>No gallery images uploaded.</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 cusrsor-pointer rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => navigate("/turfownerdashboard")}
            className="bg-gray-500 text-white px-6 py-2 cursor-pointer rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
