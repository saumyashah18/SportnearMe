import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function DashboardHost() {
  const [sports, setSports] = useState([
    {
      sport: "",
      price: "",
      courts: "",
      slots: [""],
      images: [],
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedSports = [...sports];
    updatedSports[index][field] = value;
    setSports(updatedSports);
  };

  const handleSlotChange = (sportIndex, slotIndex, value) => {
    const updatedSports = [...sports];
    updatedSports[sportIndex].slots[slotIndex] = value;
    setSports(updatedSports);
  };

  const addSlot = (sportIndex) => {
    const updatedSports = [...sports];
    updatedSports[sportIndex].slots.push("");
    setSports(updatedSports);
  };

  const removeSlot = (sportIndex, slotIndex) => {
    const updatedSports = [...sports];
    updatedSports[sportIndex].slots.splice(slotIndex, 1);
    setSports(updatedSports);
  };

  const addSportRow = () => {
    setSports([
      ...sports,
      {
        sport: "",
        price: "",
        courts: "",
        slots: [""],
        images: [],
      },
    ]);
  };

  const removeSportRow = (index) => {
    const updatedSports = sports.filter((_, i) => i !== index);
    setSports(updatedSports);
  };

  const handleImageChange = (index, files) => {
    const updatedSports = [...sports];
    updatedSports[index].images = Array.from(files);
    setSports(updatedSports);
  };
  
  const navigate = useNavigate();
  const handlePublish = () => {
    const groundData = {
      name: document.getElementById("groundName").value,
      address: document.getElementById("groundAddress").value,
      city: document.getElementById("groundCity").value,
      sports,
    };

    console.log("Ground Data to be published:", groundData);
    // You can replace this with navigation to your turf page

    // Optionally store in localStorage or send to server here
  // localStorage.setItem("hostGroundData", JSON.stringify(groundData));

    navigate("/turfownerdashboard");
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center min-h-screen text-white px-4 py-8">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-5xl text-gray-800">
        <h1 className="text-xl font-bold mb-4">Set Up Your Turf Profile</h1>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            id="groundName"
            placeholder="Ground / Academy Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            id="groundAddress"
            placeholder="Google Maps Link or Address"
            className="border p-2 rounded"
          />
          <input
            type="text"
            id="groundCity"
            placeholder="City / Area"
            className="border p-2 rounded"
          />
          <input type="file" className="border p-2 rounded bg-gray-50" />
        </div>

        {/* Sports Setup */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Add Sports Offered</h3>

        <div className="space-y-6">
          {sports.map((sport, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 relative p-2 border rounded"
            >
              <select
                value={sport.sport}
                onChange={(e) =>
                  handleInputChange(index, "sport", e.target.value)
                }
                className="border p-2 rounded"
              >
                <option disabled value="">
                  Select Sport
                </option>
                <option>Badminton</option>
                <option>Pickleball</option>
                <option>Cricket</option>
                <option>Tennis</option>
                <option>Football</option>
              </select>

              <input
                type="text"
                placeholder="Price (₹/hour)"
                value={sport.price}
                onChange={(e) =>
                  handleInputChange(index, "price", e.target.value)
                }
                className="border p-2 rounded"
              />

              <input
                type="number"
                placeholder="No. of Courts/Turfs"
                value={sport.courts}
                onChange={(e) =>
                  handleInputChange(index, "courts", e.target.value)
                }
                className="border p-2 rounded"
              />

              <div className="col-span-2 space-y-2">
                <label className="block text-sm font-semibold">
                  Available Time Slots
                </label>
                {sport.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="e.g. 6:00 AM"
                      value={slot}
                      onChange={(e) =>
                        handleSlotChange(index, slotIndex, e.target.value)
                      }
                      className="border p-2 rounded w-full md:w-40"
                    />
                    {sport.slots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(index, slotIndex)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addSlot(index)}
                  className="text-sm text-blue-500 hover:text-blue-400 underline"
                >
                  + Add Another Slot
                </button>

                <label className="block text-sm font-semibold mt-4">
                  Upload Image of Court/Ground
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files)}
                  className="border p-2 rounded w-full bg-gray-50"
                />
              </div>

              {sports.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSportRow(index)}
                  className="absolute top-0 right-0 text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add More */}
        <div className="mt-4">
          <button
            type="button"
            onClick={addSportRow}
            className="text-sm text-blue-500 hover:text-blue-400 underline"
          >
            + Add Another Sport
          </button>
        </div>

        {/* Submit */}
        <div className="text-right mt-6">
          <button
            onClick={handlePublish}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Publish Turf
          </button>
        </div>
      </div>
    </div>
  );
}
