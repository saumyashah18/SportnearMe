import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

export default function DashboardHost() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOwnerData() {
      try {
        const uid = localStorage.getItem("firebaseUid");
        if (!uid) {
          console.error("❌ UID missing in localStorage");
          return;
        }

        await axios.get(`/api/owners/profile/${uid}`);
      } catch (error) {
        console.error("❌ Failed to fetch owner data:", error);
      }
    }
    fetchOwnerData();
  }, []);

  const [sports, setSports] = useState([
    {
      sport: "",
      courts: "",
      startTime: "",
      endTime: "",
      minSlotDuration: "",
      advanceAmount: "",
      priceAmount: "",
    },
  ]);

const [availability, setAvailability] = useState({
  sameForAll: false,
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

  const [showBack, setShowBack] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

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
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

const toggleDayOpen = (day) => {
  setAvailability((prev) => {
    const current = prev.days[day] || { open: false, start: "", end: "" };
    return {
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...current,
          open: !current.open,
        },
      },
    };
  });
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

  const handleSameForAllChange = (e) => {
    setAvailability((prev) => ({
      ...prev,
      sameForAll: e.target.checked,
    }));
  };

const handleDefaultTimeChange = (field, value) => {
  setAvailability((prev) => ({
    ...prev,
    [field]: value,
  }));
};


  const handleInputChange = (index, field, value) => {
    const updated = [...sports];
    updated[index][field] = value;
    setSports(updated);
  };

  const addSportRow = () => {
    setSports((prev) => [
      ...prev,
      {
        sport: "",
        courts: "",
        startTime: "",
        endTime: "",
        minSlotDuration: "",
        advanceAmount: "",
        priceAmount: "",
      },
    ]);
  };

  const removeSportRow = (index) => {
    setSports((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    try {
      const uid = localStorage.getItem("firebaseUid");
      console.log("📦 Local Info:", { uid });

      let primaryImageURL = "";
      if (primaryImage) {
        const primaryRef = ref(storage, `turfImages/${uuidv4()}_${primaryImage.name}`);
        const snapshot = await uploadBytes(primaryRef, primaryImage);
        primaryImageURL = await getDownloadURL(snapshot.ref);
      }

      let galleryImageURLs = [];
      if (galleryImages.length > 0) {
        galleryImageURLs = await Promise.all(
          galleryImages.map(async (file) => {
            const galleryRef = ref(storage, `turfImages/${uuidv4()}_${file.name}`);
            const snapshot = await uploadBytes(galleryRef, file);
            return await getDownloadURL(snapshot.ref);
          })
        );
      }

      const sportsData = sports.map((sport) => ({
        name: sport.sport,
        courtCount: Number(sport.courts),
        minSlotDuration: convertMinutesToEnum(sport.minSlotDuration),
        amountPerSlot: Number(sport.priceAmount),
        advanceAmount: Number(sport.advanceAmount || 0),
        availability: {
          sameForAll: availability.sameForAll,
          defaultStart: availability.defaultStart,
          defaultEnd: availability.defaultEnd,
          customDays: Object.keys(availability.days).map((day) => ({
            day,
            isOpen: availability.days[day].open,
            startTime: availability.days[day].start,
            endTime: availability.days[day].end,
          })),
        },
      }));

      const data = {
        uid,
        sports: sportsData,
        amenities: selectedAmenities,
        primaryImage: primaryImageURL || null,
        galleryImages: galleryImageURLs.length > 0 ? galleryImageURLs : [],
      };

      console.log("🚀 Final Payload Sent to Backend:", data);
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/turf/setup`, data);
      console.log("✅ Turf created:", res.data);
      navigate("/turfownerdashboard");
    } catch (error) {
      console.error("❌ Error during publish:", error);
      alert("Failed to publish turf");
    }
  };

  const convertMinutesToEnum = (minutes) => {
    switch (minutes) {
      case "30":
        return "30min";
      case "45":
        return "45min";
      case "60":
        return "1hr";
      case "90":
        return "1.5hr";
      case "120":
        return "2hr";
      default:
        return "1hr";
    }
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
                  className="grid md:grid-cols-2 gap-4 border rounded p-4 relative bg-gray-50"
                >
                  <select
                    value={sport.sport}
                    onChange={(e) =>
                      handleInputChange(index, "sport", e.target.value)
                    }
                    className="border p-2 rounded cursor-pointer"
                  >
                    <option value="">Select Sport</option>
                    {["Badminton", "Pickleball", "Cricket", "Tennis", "Football"]
                      .filter(
                        (option) =>
                          !sports.some((s, i) => s.sport === option && i !== index)
                      )
                      .map((option) => (
                        <option key={option}>{option}</option>
                      ))}
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
                    className="border p-2 rounded cursor-pointer"
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

                  <input
                    type="number"
                    placeholder="Price Amount (₹)"
                    value={sport.priceAmount || ""}
                    onChange={(e) =>
                      handleInputChange(index, "priceAmount", e.target.value)
                    }
                    className="border p-2 rounded w-full"
                  />

   <div className="mb-4 col-span-2">
  <label className="font-semibold block mb-2">Weekly Availability</label>

  {/* Same for all toggle */}
  <label className="flex items-center gap-2 mb-2 cursor-pointer">
    <input
      type="checkbox"
      checked={availability.sameForAll}
      onChange={handleSameForAllChange}
      className="cursor-pointer"
    />
    Same for all days
  </label>

  {/* Same for all time inputs */}
  {availability.sameForAll ? (
    <div className="flex gap-4 mb-4">
      <TimePicker
        onChange={(value) =>
          handleDefaultTimeChange( "defaultStart", value)
        }
        value={availability.defaultStart || ""}
        disableClock
        clearIcon={null}
        format="hh:mm a"
        className="border p-2 rounded"
      />
      <TimePicker
        onChange={(value) =>
          handleDefaultTimeChange(  "defaultEnd", value)
        }
        value={availability.defaultEnd || ""}
        disableClock
        clearIcon={null}
        format="hh:mm a"
        className="border p-2 rounded"
      />
    </div>
  ) : (
    // Per-day time configuration
    <div className="grid grid-cols-1 gap-4">
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => (
        <div key={day} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={availability.days?.[day]?.open || false}
            onChange={() => toggleDayOpen(day)}
            className="cursor-pointer"
          />
          <label className="w-24 cursor-pointer">{day}</label>

          <TimePicker
            onChange={(value) =>
              handleAvailabilityChange( "start", value)
            }
            value={availability.days?.[day]?.start || ""}
            disabled={!availability.days?.[day]?.open}
            disableClock
            clearIcon={null}
            format="hh:mm a"
            className="border p-2 rounded flex-1"
          />

          <TimePicker
            onChange={(value) =>
              handleAvailabilityChange("end", value)
            }
            value={availability.days?.[day]?.end || ""}
            disabled={!availability.days?.[day]?.open}
            disableClock
            clearIcon={null}
            format="hh:mm a"
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
                      className="absolute right-2 text-red-500 hover:underline text-sm cursor-pointer"
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
                className="text-blue-500 hover:underline text-sm cursor-pointer"
              >
                + Add Another Sport
              </button>
            </div>

            <div className="text-right mt-6">
              <button
                onClick={() => setShowBack(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
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
              className="mb-4 border p-2 rounded w-full cursor-pointer"
            />

            <label className="block mb-2">Gallery Images (Max 4):</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImages(Array.from(e.target.files).slice(0, 4))
              }
              className="mb-4 border p-2 rounded w-full cursor-pointer"
            />

            <h3 className="font-semibold mt-4 mb-2">Select Amenities Offered</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {amenities.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`px-4 py-2 rounded-full border text-sm cursor-pointer ${
                    selectedAmenities.includes(item)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* <div>
               <button
                onClick={handleDummyClick}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 cursor-pointer"
              >
              DUMMYYYYYY
              </button>


            </div> */}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowBack(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handlePublish}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
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