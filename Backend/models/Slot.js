const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    turf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf",
      required: true,
    },
    sportName: {
      type: String,
      required: true,
    },
    courtId: {
      type: String,
      required: true, // Eg. "court-1", "court-2"
    },
    date: {
      type: String, // Format: 'YYYY-MM-DD'
      required: true,
    },
    startTime: {
      type: String, // Format: 'HH:mm'
      required: true,
    },
    endTime: {
      type: String, // Format: 'HH:mm'
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "blocked", "booked"],
      default: "available",
    },
    bookingDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", // Future support
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
slotSchema.index({ turfId: 1, courtId: 1, date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model("Slot", slotSchema);
