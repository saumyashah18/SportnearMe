const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  turf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Turf",
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  date: {
    type: String,  
    required: true
  },
  startTime: {
    type: String,  
    required: true
  },
  endTime: {
    type: String,  
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'blocked'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Slot", slotSchema);
