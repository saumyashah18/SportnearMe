import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageTurf() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTurfData = async () => {
      const turfId = "688bb4c017765fcded8a0ac9";
      const apiUrl = `${import.meta.env.VITE_APP_API_BASE_URL}/api/turf/get/${turfId}`;

      try {
        const res = await fetch(apiUrl);
        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          const text = await res.text();
          console.error("Unexpected response:", text);
          return;
        }

        const turfData = await res.json();
        if (res.ok) {
          setData(turfData);
        } else {
          setError(turfData.error || "Unknown error");
        }
      } catch (err) {
        setError("Failed to fetch turf data");
      } finally {
        setLoading(false);
      }
    };

    fetchTurfData();
  }, []);

  const handleSportChange = (index, field, value) => {
    const updated = [...data.sports];
    updated[index][field] = value;
    setData({ ...data, sports: updated });
  };

  const handleAmenityToggle = (amenity) => {
    setData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/turf/${data._id}`, data);
      alert("Turf details updated successfully!");
      setIsEditing(false);
    } catch {
      alert("Failed to update turf details");
    }
  };

  const renderImage = (fileOrUrl) => {
    if (!fileOrUrl) return null;
    return (
      <img
        src={typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl)}
        className="w-32 h-32 object-cover rounded"
        alt="Turf"
      />
    );
  };

  if (loading) return <div className="text-white text-center mt-10">Loading turf...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Manage Turf Profile</h1>

        {/* Sports */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Sports Offered</h2>
          {data.sports?.map((sport, index) => (
            <div key={index} className="border-b border-white/20 pb-4 mb-4">
              {isEditing ? (
                <>
                  <input type="text" value={sport.sport} onChange={(e) => handleSportChange(index, "sport", e.target.value)} placeholder="Sport Name" className="input" />
                  <input type="number" value={sport.courts} onChange={(e) => handleSportChange(index, "courts", e.target.value)} placeholder="Courts" className="input" />
                  <input type="number" value={sport.minSlotDuration} onChange={(e) => handleSportChange(index, "minSlotDuration", e.target.value)} placeholder="Min Slot (min)" className="input" />
                  <input type="number" value={sport.advanceAmount} onChange={(e) => handleSportChange(index, "advanceAmount", e.target.value)} placeholder="Advance (₹)" className="input" />
                  <input type="number" value={sport.priceAmount} onChange={(e) => handleSportChange(index, "priceAmount", e.target.value)} placeholder="Price (₹)" className="input" />
                </>
              ) : (
                <div className="space-y-1">
                  <p><b>🏅 Sport:</b> {sport.sport}</p>
                  <p><b>🏟️ Courts:</b> {sport.courts}</p>
                  <p><b>⏱️ Min Slot:</b> {sport.minSlotDuration} min</p>
                  <p><b>💰 Advance:</b> ₹{sport.advanceAmount}</p>
                  <p><b>💵 Price:</b> ₹{sport.priceAmount}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Weekly Availability */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Weekly Availability</h2>
          {isEditing ? (
            Object.entries(data.availability?.days || {}).map(([day, info]) => (
              <div key={day} className="space-y-1">
                <h3 className="font-semibold">{day}</h3>
                <input type="checkbox" checked={info.open} onChange={() => {
                  setData((prev) => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      days: {
                        ...prev.availability.days,
                        [day]: { ...info, open: !info.open },
                      },
                    },
                  }));
                }} />
                <input type="time" disabled={!info.open} value={info.start} onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      days: {
                        ...prev.availability.days,
                        [day]: { ...info, start: e.target.value },
                      },
                    },
                  }));
                }} className="input" />
                <input type="time" disabled={!info.open} value={info.end} onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      days: {
                        ...prev.availability.days,
                        [day]: { ...info, end: e.target.value },
                      },
                    },
                  }));
                }} className="input" />
              </div>
            ))
          ) : (
            Object.entries(data.availability?.days || {}).map(([day, info]) => (
              <p key={day}>{day}: {info.open ? `${info.start} - ${info.end}` : "Closed"}</p>
            ))
          )}
        </div>

        {/* Amenities */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Amenities Offered</h2>
          <div className="flex flex-wrap gap-2">
            {["Parking", "Washroom", "Drinking Water", "Floodlights", "Locker Rooms", "Changing Rooms", "First Aid"].map((item) => (
              <button key={item} onClick={() => isEditing && handleAmenityToggle(item)} className={`px-4 py-2 rounded-full border text-sm ${data.amenities?.includes(item) ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} ${isEditing ? "cursor-pointer" : "cursor-default"}`}>
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
              <input type="file" accept="image/*" onChange={(e) => setData({ ...data, primaryImage: e.target.files[0] })} className="input mb-2" />
              <input type="file" accept="image/*" multiple onChange={(e) => setData({ ...data, galleryImages: Array.from(e.target.files).slice(0, 4) })} className="input" />
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              {renderImage(data.primaryImage) || <p>No primary image.</p>}
              {Array.isArray(data.galleryImages) && data.galleryImages.length > 0
                ? data.galleryImages.map((img, i) => <div key={i}>{renderImage(img)}</div>)
                : <p>No gallery images.</p>}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-6">
          {isEditing ? (
            <button onClick={handleSave} className="btn-green">Save Changes</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-blue">Edit</button>
          )}
          <button onClick={() => navigate("/turfownerdashboard")} className="btn-gray">Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}
