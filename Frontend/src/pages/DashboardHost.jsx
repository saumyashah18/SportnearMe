import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardHost() {
  const [sports, setSports] = useState([
    {
      sport: "",
      courts: "",
      startTime: "",
      endTime: "",
      minSlotDuration: "",
      advanceAmount: "",
    },
  ]);
  const [showBack, setShowBack] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [availability, setAvailability] = useState({
    sameForAll: true,
    defaultStart: "",
    defaultEnd: "",
    days: {
      Monday: { open: false, start: "", end: "" },
      Tuesday: { open: false, start: "", end: "" },
      Wednesday: { open: false, start: "", end: "" },
      Thursday: { open: false, start: "", end: "" },
      Friday: { open: false, start: "", end: "" },
      Saturday: { open: false, start: "", end: "" },
      Sunday: { open: false, start: "", end: "" },
    },
  });

  const amenities = [
    "Parking",
    "Washroom",
    "Drinking Water",
    "Floodlights",
    "Locker Rooms",
    "Changing Rooms",
    "First Aid",
  ];

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const toggleDayOpen = (day) => {
    setAvailability((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          open: !prev.days[day].open,
        },
      },
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          [field]: value,
        },
      },
    }));
  };

  const navigate = useNavigate();

  const handleInputChange = (index, field, value) => {
    const updatedSports = [...sports];
    updatedSports[index][field] = value;
    setSports(updatedSports);
  };
  const addSportRow = () => {
    setSports([
      ...sports,
      {
        sport: "",
        courts: "",
        startTime: "",
        endTime: "",
        minSlotDuration: "",
        advanceAmount: "",
      },
    ]);
  };

  const removeSportRow = (index) => {
    const updatedSports = sports.filter((_, i) => i !== index);
    setSports(updatedSports);
  };

  const handlePublish = () => {
    const data = {
      sports,
      primaryImage,
      galleryImages,
      amenities: selectedAmenities,
      availability,
    };
    console.log("Final Data:", data);
    navigate("/turfownerdashboard");
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-screen flex items-center justify-center text-white px-4 py-8">
      <div className="relative w-full max-w-5xl min-h-[700px] [perspective:2000px]">
        <div
          className={`transition-transform duration-700 [transform-style:preserve-3d] relative w-full h-full ${
            showBack ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full backface-hidden bg-white p-6 rounded-2xl shadow-md text-gray-800">
            <h1 className="text-xl text-center font-bold mb-4">
              Set Up Your Turf Profile
            </h1>

            <h3 className="text-lg font-semibold mt-4 mb-2">Add Sports Offered</h3>
            <div className="space-y-6">
              {sports.map((sport, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-4 border rounded p-4 relative bg-gray-50"// My name is suryaraj Jadeja
                >
                  <select
                    value={sport.sport}
                    onChange={(e) =>
                      handleInputChange(index, "sport", e.target.value)
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Select Sport</option>
                    <option>Badminton</option>
                    <option>Pickleball</option>
                    <option>Cricket</option>
                    <option>Tennis</option>
                    <option>Football</option>
                  </select>

                  <input
                    type="number"
                    placeholder="No. of Courts/Turfs"
                    value={sport.courts}
                    onChange={(e) =>
                      handleInputChange(index, "courts", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <select
                    value={sport.minSlotDuration}
                    onChange={(e) =>
                      handleInputChange(index, "minSlotDuration", e.target.value)
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Select Min Slot Duration</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">1 Hour</option>
                    <option value="90">1.5 Hours</option>
                    <option value="120">2 Hours</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Advance Payable Amount (₹)"
                    value={sport.advanceAmount}
                    onChange={(e) =>
                      handleInputChange(index, "advanceAmount", e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                   <div className="mb-4">
              <label className="font-semibold block mb-2">Weekly Availability</label>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={availability.sameForAll}
                  onChange={(e) =>
                    setAvailability((prev) => ({
                      ...prev,
                      sameForAll: e.target.checked,
                    }))
                  }
                />
                Same for all days
              </label>

              {availability.sameForAll ? (
                <div className="flex gap-4 mb-4">
                  <input
                    type="time"
                    value={availability.defaultStart}
                    onChange={(e) =>
                      setAvailability((prev) => ({
                        ...prev,
                        defaultStart: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="time"
                    value={availability.defaultEnd}
                    onChange={(e) =>
                      setAvailability((prev) => ({
                        ...prev,
                        defaultEnd: e.target.value,
                      }))
                    }
                    className="border p-2 rounded"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(availability.days).map((day) => (
                    <div key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={availability.days[day].open}
                        onChange={() => toggleDayOpen(day)}
                      />
                      <label className="w-24">{day}</label>
                      <input
                        type="time"
                        disabled={!availability.days[day].open}
                        value={availability.days[day].start}
                        onChange={(e) =>
                          handleAvailabilityChange(day, "start", e.target.value)
                        }
                        className="border p-2 rounded flex-1"
                      />
                      <input
                        type="time"
                        disabled={!availability.days[day].open}
                        value={availability.days[day].end}
                        onChange={(e) =>
                          handleAvailabilityChange(day, "end", e.target.value)
                        }
                        className="border p-2 rounded flex-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

                  {sports.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSportRow(index)}
                      className="absolute right-2 text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            

            <div className="mt-4">
              <button
                type="button"
                onClick={addSportRow}
                className="text-blue-500 hover:underline text-sm"
              >
                + Add Another Sport
              </button>
            </div>

            <div className="text-right mt-6">
              <button
                onClick={() => setShowBack(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Continue to More Info
              </button>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute w-full rotate-y-180 backface-hidden bg-white p-6 rounded-2xl shadow-md text-gray-800">
            <h2 className="text-lg font-bold mb-4">Add Images, Amenities & Availability</h2>

            <label className="block mb-2">Primary Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPrimaryImage(e.target.files[0])}
              className="mb-4 border p-2 rounded w-full"
            />

            <label className="block mb-2">Gallery Images (Max 4):</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImages(Array.from(e.target.files).slice(0, 4))
              }
              className="mb-4 border p-2 rounded w-full"
            />

            <h3 className="font-semibold mt-4 mb-2">Select Amenities Offered</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {amenities.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedAmenities.includes(item)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowBack(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handlePublish}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Publish Turf
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
