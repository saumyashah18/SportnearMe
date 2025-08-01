const express = require("express");
const router = express.Router();
const {
  createSlots,
  getSlotsByTurf,
  updateSlotStatus,
  deleteSlot,
} = require("../controllers/slotController.js");

/**
 * @route   POST /api/slots/create
 * @desc    Create slots for a turf, sport, and court
 * @body    { turfId, sportName, courtNumber, date, startTime, endTime, slotDuration }
 * @access  Private (Host)
 */
router.post("/create", createSlots);

/**
 * @route   GET /api/slots/fetch
 * @desc    Fetch slots by turfId, sportName, and date
 * @query   ?turfId=...&sportName=...&date=...
 * @access  Private (Host or Admin)
 */
router.get("/fetch", getSlotsByTurf);

/**
 * @route   PATCH /api/slots/status/:slotId
 * @desc    Block or unblock a slot
 * @body    { status: "blocked" | "available" }
 * @access  Private (Host)
 */
router.patch("/status/:slotId", updateSlotStatus);

/**
 * @route   DELETE /api/slots/:slotId
 * @desc    Delete a specific slot (e.g., if court removed)
 * @access  Private (Host)
 */
router.delete("/:slotId", deleteSlot);

module.exports = router;
