import React, { useState, useEffect } from "react";

export default function TurfBooking() {
  const [selectedSport, setSelectedSport] = useState("Pickleball");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const slotTimes = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
  ];

  const toggleSlot = (slot) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const confirmBooking = () => {
    setIsConfirmModalOpen(false);
    alert("✅ Booking Confirmed!");
    setSelectedSlots([]);
  };

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

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-blue-400 mt-6">
        Super Smash Court Booking
      </h1>

      {/* Sport Selection */}
      <div className="flex gap-4 mt-6 px-4 mb-4">
        {[
          { name: "Pickleball", img: "https://img.icons8.com/ios-filled/50/ffffff/badminton.png" },
          { name: "Box Cricket", img: "https://img.icons8.com/ios-filled/50/ffffff/cricket.png" },
          { name: "Football", img: "/images/soccer.svg" }
        ].map((sport) => (
          <button
            key={sport.name}
            className={`sport-btn min-w-[100px] p-4 rounded-lg flex flex-col items-center cursor-pointer ${
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
            className={`date-btn flex flex-col items-center px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer ${
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

      {/* Slot Table */}
      <div className="w-full max-w-5xl px-4 pb-28">
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-[#334155] text-white">
              <tr>
                <th className="p-3 text-sm">Time</th>
                <th className="p-3 text-sm">Court 1</th>
                <th className="p-3 text-sm">Court 2</th>
                <th className="p-3 text-sm">Court 3</th>
              </tr>
            </thead>
            <tbody>
              {slotTimes.map((time, idx) => (
                <tr key={idx}>
                  <td className="p-3">
                    <div className="bg-[#1e293b] text-white rounded-lg py-3">
                      {time}
                    </div>
                  </td>
                  {[1, 2, 3].map((court) => {
                    const slotId = `${time}-Court${court}`;
                    const isSelected = selectedSlots.includes(slotId);
                    return (
                      <td key={court} className="p-3">
                        <button
                          onClick={() => toggleSlot(slotId)}
                          className={`w-full py-4 rounded-lg text-sm cursor-pointer ${
                            isSelected ? "bg-green-600" : "bg-[#334155] hover:bg-blue-600"
                          }`}
                        >
                          ₹300
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#334155] text-white px-6 py-4 flex justify-between items-center shadow z-50">
        <div className="flex items-center gap-4 text-sm font-medium">
          <span>Slots: {selectedSlots.length}</span>
          <div className="w-px h-5 bg-gray-400"></div>
          <span>Amount: ₹{selectedSlots.length * 300}</span>
        </div>
        <button
          onClick={() => selectedSlots.length > 0 && setIsConfirmModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-6 py-2 font-semibold cursor-pointer"
        >
          Confirm Booking
        </button>
      </div>

      {/* Confirm Booking Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-xl text-center max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Your Booking</h2>
            <p className="mb-6">
              Are you sure you want to confirm {selectedSlots.length} slot(s) for ₹
              {selectedSlots.length * 300}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
