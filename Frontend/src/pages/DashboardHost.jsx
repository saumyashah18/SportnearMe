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
      images: [],
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedSports = [...sports];
    updatedSports[index][field] = value;
    setSports(updatedSports);
  };

  const handleImageChange = (index, files) => {
    const updatedSports = [...sports];
    updatedSports[index].images = Array.from(files);
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
        images: [],
      },
    ]);
  };

  const removeSportRow = (index) => {
    const updatedSports = sports.filter((_, i) => i !== index);
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
    navigate("/turfownerdashboard");
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center min-h-screen text-white px-4 py-8">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-5xl text-gray-800">
        <h1 className="text-xl text-center font-bold mb-4">Set Up Your Turf Profile</h1>
{/* 
        Basic Info
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
        </div> */}

        <h3 className="text-lg font-semibold mt-4 mb-2">Add Sports Offered</h3>

        <div className="space-y-6">
          {sports.map((sport, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded p-4 relative bg-gray-50"
            >
              {/* Select Sport */}
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

              {/* No. of Courts */}
              <input
                type="number"
                placeholder="No. of Courts/Turfs"
                value={sport.courts}
                onChange={(e) =>
                  handleInputChange(index, "courts", e.target.value)
                }
                className="border p-2 rounded"
              />

              {/* Working Hours */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="time"
                  placeholder="Start Time"
                  value={sport.startTime}
                  onChange={(e) =>
                    handleInputChange(index, "startTime", e.target.value)
                  }
                  className="border p-2 rounded flex-1"
                />
                <input
                  type="time"
                  placeholder="End Time"
                  value={sport.endTime}
                  onChange={(e) =>
                    handleInputChange(index, "endTime", e.target.value)
                  }
                  className="border p-2 rounded flex-1"
                />
              </div>

              {/* Minimum Slot Duration */}
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

              {/* Advance Payable */}
              <input
                type="number"
                placeholder="Advance Payable Amount (₹)"
                value={sport.advanceAmount}
                onChange={(e) =>
                  handleInputChange(index, "advanceAmount", e.target.value)
                }
                className="border p-2 rounded"
              />

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">
                  Upload Images of Court/Ground
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files)}
                  className="border p-2 rounded bg-gray-50 w-full"
                />
              </div>

              {/* Remove Button */}
              {sports.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSportRow(index)}
                  className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Another Sport */}
        <div className="mt-4">
          <button
            type="button"
            onClick={addSportRow}
            className="text-blue-500 hover:underline text-sm"
          >
            + Add Another Sport
          </button>
        </div>

        {/* Publish Button */}
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
