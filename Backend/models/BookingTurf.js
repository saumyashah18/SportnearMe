const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf", required: true },
  sport: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  bookingTime: { type: Date, default: Date.now },
  // The insertion of the QR code is in the process
  qrCodeUrl: { type: String },
  bookingId: { type: String, unique: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
});

mongoose.model("Booking", bookingSchema);
module.exports = mongoose.model("Booking", bookingSchema);
