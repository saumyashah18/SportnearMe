import React, { useState } from "react";

export default function OwnerBooking() {
  const [selectedSport, setSelectedSport] = useState("Pickleball");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [blockedCourts, setBlockedCourts] = useState([]);
  const [courts, setCourts] = useState(["Court 1", "Court 2", "Court 3"]);
  const [slotTimes, setSlotTimes] = useState([
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
  ]);

  const getNext7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const parseTime = (timeStr) => {
    const [hourMin, meridian] = timeStr.split(" ");
    const [hour, minute] = hourMin.split(":").map(Number);
    let h = hour % 12 + (meridian === "PM" ? 12 : 0);
    return h * 60 + minute;
  };

  const sortedSlotTimes = [...slotTimes].sort((a, b) => parseTime(a) - parseTime(b));

  const toggleBlockSlot = (slotId) => {
    setBlockedSlots((prev) =>
      prev.includes(slotId) ? prev.filter((s) => s !== slotId) : [...prev, slotId]
    );
  };

  const toggleBlockCourt = (court) => {
    setBlockedCourts((prev) =>
      prev.includes(court) ? prev.filter((c) => c !== court) : [...prev, court]
    );
  };

  const addCourt = () => {
    if (
      window.confirm(
        "Are you sure you want to add a court? This change will apply for every day. For single-day change, use block court."
      )
    ) {
      const newCourtNumber = courts.length + 1;
      setCourts([...courts, `Court ${newCourtNumber}`]);
    }
  };

  const removeCourt = () => {
    if (courts.length > 1) {
      if (
        window.confirm(
          "Are you sure you want to delete a court? This change will apply for every day. For single-day change, use block court."
        )
      ) {
        setCourts(courts.slice(0, -1));
      }
    }
  };

  const handleAddSlot = () => {
    const newTime = prompt("Enter new slot time (e.g., 05:00 PM)");
    if (newTime && /^[0-9]{1,2}:[0-9]{2} (AM|PM)$/i.test(newTime.trim())) {
      const cleaned = newTime.trim().toUpperCase();
      if (!slotTimes.includes(cleaned)) {
        setSlotTimes((prev) => [...prev, cleaned]);
      } else {
        alert("This time already exists.");
      }
    } else {
      alert("Please enter time in format HH:MM AM/PM");
    }
  };

  const handleDeleteSlot = () => {
    const toDelete = prompt("Enter slot time to delete (e.g., 05:00 PM)");
    if (toDelete) {
      const cleaned = toDelete.trim().toUpperCase();
      if (!slotTimes.includes(cleaned)) {
        alert("That slot does not exist.");
        return;
      }
      const confirmDelete = window.confirm(
        `⚠️ WARNING: This will delete "${cleaned}" from all days. 
If you want to make a change for just one day, block the slot instead. 
This deletion is sport-specific (${selectedSport}). Proceed?`
      );
      if (confirmDelete) {
        setSlotTimes((prev) => prev.filter((t) => t !== cleaned));
      }
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex flex-col items-center pb-20">
      <h1 className="text-3xl font-extrabold text-blue-400 mt-6">Manage Bookings</h1>

      {/* Sport Selector */}
      <div className="flex gap-4 mt-6 px-4 mb-4">
        {[
          { name: "Pickleball", img: "https://img.icons8.com/ios-filled/50/ffffff/badminton.png" },
          { name: "Box Cricket", img: "https://img.icons8.com/ios-filled/50/ffffff/cricket.png" },
          { name: "Football", img: "/images/soccer.svg" }
        ].map((sport) => (
          <button
            key={sport.name}
            className={`sport-btn min-w-[100px] p-4 rounded-lg flex flex-col items-center ${
              selectedSport === sport.name ? "bg-blue-600" : "bg-[#1e293b] hover:bg-blue-600"
            }`}
            onClick={() => setSelectedSport(sport.name)}
          >
            <img src={sport.img} className="w-8 h-8 mb-2" alt={sport.name} />
            <span className="text-sm">{sport.name}</span>
          </button>
        ))}
      </div>

      {/* Date Selector */}
      <div className="flex gap-3 overflow-x-auto mb-6 px-4">
        {getNext7Days().map((date, idx) => (
          <button
            key={idx}
            className={`date-btn flex flex-col items-center px-4 py-2 rounded-lg hover:bg-blue-600 transition ${
              selectedDate.toDateString() === date.toDateString()
                ? "bg-blue-600"
                : "bg-[#1e293b]"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <span className="text-xs">{date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</span>
            <span className="text-lg font-bold">{date.getDate()}</span>
            <span className="text-xs">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-4 px-4">
        <button onClick={addCourt} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">Add Court</button>
        <button onClick={removeCourt} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">Remove Court</button>
      </div>

      {/* Court Block Toggle */}
      <div className="flex gap-3 mb-4 px-4 flex-wrap">
        {courts.map((court, idx) => (
          <button
            key={court}
            onClick={() => toggleBlockCourt(court)}
            className={`px-4 py-2 rounded-md text-sm ${
              blockedCourts.includes(court)
                ? "bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {blockedCourts.includes(court) ? `Unblock ${court}` : `Block ${court}`}
          </button>
        ))}
      </div>

      {/* Slot Table */}
      <div className="w-full max-w-6xl px-4 relative group">
        <div className="overflow-x-auto relative">
          <table className="w-full text-center">
            <thead className="bg-[#334155] text-white">
              <tr>
                <th className="p-3 text-sm">Time</th>
                {courts.map((court) => (
                  <th key={court} className="p-3 text-sm">{court}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedSlotTimes.map((time, idx) => (
                <tr key={idx}>
                  <td className="p-3">
                    <div className="bg-[#1e293b] text-white rounded-lg py-3">{time}</div>
                  </td>
                  {courts.map((court) => {
                    const slotId = `${time}-${court}`;
                    const isBlocked = blockedSlots.includes(slotId);
                    const isCourtBlocked = blockedCourts.includes(court);
                    return (
                      <td key={court} className="p-3">
                        <button
                          onClick={() => toggleBlockSlot(slotId)}
                          disabled={isCourtBlocked}
                          className={`w-full py-4 rounded-lg text-sm ${
                            isCourtBlocked
                              ? "bg-gray-500 cursor-not-allowed"
                              : isBlocked
                              ? "bg-red-600"
                              : "bg-[#334155] hover:bg-blue-600"
                          }`}
                        >
                          {isCourtBlocked ? "Court Blocked" : isBlocked ? "Blocked" : "Available"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Row to add/delete time slots */}
              <tr className="bg-[#0f172a] border-t border-[#334155]">
                <td colSpan={courts.length + 1} className="p-4 text-right space-x-3">
                  <button
                    onClick={handleAddSlot}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    ➕ Add Slot
                  </button>
                  <button
                    onClick={handleDeleteSlot}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    🗑️ Delete Slot
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
