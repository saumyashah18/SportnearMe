// controllers/slotController.js

const Slot = require("../models/Slot");
const Turf = require("../models/Turf");

// Utility: Convert minutes to HH:MM format
function minutesToTime(mins) {
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

// CREATE SLOTS
const createSlots = async (req, res) => {
  try {
    const { turfId, date } = req.body;

    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    const existing = await Slot.findOne({ turfId, date });
    if (existing) {
      return res.status(409).json({ message: "Slots already exist for this date" });
    }

    const slotsToCreate = [];

    turf.sports.forEach((sportObj) => {
      const { sport, courts, minSlotDuration, availability } = sportObj;
      const day = new Date(date).toLocaleString("en-IN", { weekday: "long" });
      const avail = availability[day];

      if (!avail) return;

      const start = parseInt(avail.startTime.split(":")[0]) * 60 + parseInt(avail.startTime.split(":")[1]);
      const end = parseInt(avail.endTime.split(":")[0]) * 60 + parseInt(avail.endTime.split(":")[1]);

      for (let c = 1; c <= courts; c++) {
        const courtId = `${sport.toLowerCase()}-${c}`;

        for (let t = start; t + minSlotDuration <= end; t += minSlotDuration) {
          const startTime = minutesToTime(t);
          const endTime = minutesToTime(t + minSlotDuration);

          slotsToCreate.push({
            turfId,
            courtId,
            sport,
            date,
            startTime,
            endTime,
            status: "available",
          });
        }
      }
    });

    const created = await Slot.insertMany(slotsToCreate);
    res.status(201).json({ message: "Slots created", slots: created });

  } catch (err) {
    console.error("❌ Error in createSlots:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SLOTS BY TURF AND DATE
const getSlotsByTurfAndDate = async (req, res) => {
  try {
    const { turfId, date } = req.params;
    const slots = await Slot.find({ turfId, date });

    if (!slots.length) {
      return res.status(404).json({ message: "No slots found" });
    }

    res.status(200).json(slots);
  } catch (err) {
    console.error("❌ Error in getSlotsByTurfAndDate:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// BLOCK OR UNBLOCK A SLOT
const updateSlotStatus = async (req, res) => {
  try {
    const { slotId } = req.params;
    const { status } = req.body;

    if (!["available", "blocked"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const slot = await Slot.findByIdAndUpdate(
      slotId,
      { status },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.status(200).json({ message: `Slot ${status}`, slot });
  } catch (err) {
    console.error("❌ Error in updateSlotStatus:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE A SLOT
const deleteSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const deleted = await Slot.findByIdAndDelete(slotId);

    if (!deleted) {
      return res.status(404).json({ message: "Slot not found or already deleted" });
    }

    res.status(200).json({ message: "Slot deleted", slot: deleted });
  } catch (err) {
    console.error("❌ Error in deleteSlot:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSlots,
  getSlotsByTurfAndDate,
  updateSlotStatus,
  deleteSlot,
};
