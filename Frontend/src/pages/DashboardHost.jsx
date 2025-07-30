import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import axios from "axios";



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

        const response = await axios.get(`/api/owners/profile/${uid}`);
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
    },
  ]);

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

  // Toggle Amenity Selection
  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  // Toggle a Day's Availability
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

  // Change Start/End Time for a Specific Day
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

  // Toggle Between Same Timing for All or Custom per Day
  const handleSameForAllChange = (e) => {
    setAvailability((prev) => ({
      ...prev,
      sameForAll: e.target.checked,
    }));
  };

  // Handle Default Start/End Time When SameForAll is true
  const handleDefaultTimeChange = (field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Sports Input Change
  const handleInputChange = (index, field, value) => {
    const updatedSports = [...sports];
    updatedSports[index][field] = value;
    setSports(updatedSports);
  };

  // Add a New Sport Row
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

  // Remove Sport Row
  const removeSportRow = (index) => {
    const updated = sports.filter((_, i) => i !== index);
    setSports(updated);
  };

  // Upload an Image to Firebase and Return URL
  const uploadImageToFirebase = async (file) => {
    const imageRef = ref(storage, `turfImages/${uuidv4()}-${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };
const handlePublish = async () => {
  try {
    const uid = localStorage.getItem("firebaseUid");
    console.log("📦 Local Info:", { uid});

    // Upload primary image
    let primaryImageURL = "";
    if (primaryImage) {
      const primaryRef = ref(storage, `turfImages/${uuidv4()}_${primaryImage.name}`);
      const snapshot = await uploadBytes(primaryRef, primaryImage);
      primaryImageURL = await getDownloadURL(snapshot.ref);
    }

    // Upload gallery images
    let galleryImageURLs = [];
    if (galleryImages.length > 0) {
      galleryImageURLs = await Promise.all(
        galleryImages.map(async (file) => {
          const galleryRef = ref(storage, `turfImages/${uuidv4()}_${file.name}`);
          const snapshot = await uploadBytes(galleryRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return downloadURL;
        })
      );
    }

    // 🛠️ Transform sports array into what backend expects
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
  uid : uid,
  sports: sportsData,
  amenities: selectedAmenities,
  primaryImage: primaryImageURL,
  galleryImages: galleryImageURLs,
};

    

    console.log("🚀 Final Payload Sent to Backend:", data);

    const res = await axios.post( `${import.meta.env.VITE_APP_API_BASE_URL}/api/turfs/setup`, data);
    console.log("✅ Turf created:", res.data);

    navigate("/turfownerdashboard");
  } catch (error) {
    console.error("❌ Error during publish:", error);
    alert("Failed to publish turf");
  }
};

// Helper function
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
      return "1hr"; // fallback
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
                    <label className="font-semibold block mb-2">
                      Weekly Availability
                    </label>
                    <label className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input
                        type="checkbox"
  checked={availability.sameForAll}
  onChange={handleSameForAllChange}
                        className="cursor-pointer"
                      />
                      Same for all days
                    </label>

                    {availability.sameForAll ? (
                      <div className="flex gap-4 mb-4">
                        <input
                          type="time"
                          value={availability.defaultStart}
                          onChange={(e) =>
                            handleDefaultTimeChange(index, "defaultStart", e.target.value)
                          }
                          className="border p-2 rounded"
                        />
                        <input
                          type="time"
                          value={availability.defaultEnd}
                          onChange={(e) =>
                            handleDefaultTimeChange(index, "defaultEnd", e.target.value)
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {Object.keys(availability.days).map((day) => (
                          <div key={day} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={availability.days[day].open}
                              onChange={() => toggleDayOpen(index, day)}
                              className="cursor-pointer"
                            />
                            <label className="w-24 cursor-pointer">{day}</label>
                            <input
                              type="time"
                              disabled={!availability.days[day].open}
                              value={availability.days[day].start}
                              onChange={(e) =>
                                handleAvailabilityChange(index, day, "start", e.target.value)
                              }
                              className="border p-2 rounded flex-1"
                            />
                            <input
                              type="time"
                              disabled={!availability.days[day].open}
                              value={availability.days[day].end}
                              onChange={(e) =>
                                handleAvailabilityChange(index, day, "end", e.target.value)
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

