<div
  key={index}
  className="grid md:grid-cols-2 gap-4 border rounded p-4 relative bg-gray-50"
>
  {/* Sport dropdown */}
  <select
    value={sport.sport}
    onChange={(e) => handleInputChange(index, "sport", e.target.value)}
    className="border p-2 rounded cursor-pointer"
  >
    <option value="">Select Sport</option>
    <option>Badminton</option>
    <option>Pickleball</option>
    <option>Cricket</option>
    <option>Tennis</option>
    <option>Football</option>
  </select>

  {/* Number of courts */}
  <input
    type="number"
    placeholder="No. of Courts/Turfs"
    value={sport.courts}
    onChange={(e) => handleInputChange(index, "courts", e.target.value)}
    className="border p-2 rounded"
  />

  {/* Slot duration */}
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

  {/* Advance amount */}
  <input
    type="number"
    placeholder="Advance Payable Amount (₹)"
    value={sport.advanceAmount}
    onChange={(e) => handleInputChange(index, "advanceAmount", e.target.value)}
    className="border p-2 rounded"
  />

  {/* 🆕 Price amount */}
  <input
    type="number"
    placeholder="Price Amount (₹)"
    value={sport.priceAmount || ""}
    onChange={(e) => handleInputChange(index, "priceAmount", e.target.value)}
    className="border p-2 rounded"
  />

  {/* Weekly Availability */}
  <div className="mb-4 col-span-2">
    <label className="font-semibold block mb-2">Weekly Availability</label>
    <label className="flex items-center gap-2 mb-2 cursor-pointer">
      <input
        type="checkbox"
        checked={availability.sameForAll}
        onChange={(e) =>
          setAvailability((prev) => ({
            ...prev,
            sameForAll: e.target.checked,
          }))
        }
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
      <div className="grid grid-cols-1 gap-4">
        {Object.keys(availability.days).map((day) => (
          <div key={day} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={availability.days[day].open}
              onChange={() => toggleDayOpen(day)}
              className="cursor-pointer"
            />
            <label className="w-24 cursor-pointer">{day}</label>
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

  {/* Remove Button */}
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
