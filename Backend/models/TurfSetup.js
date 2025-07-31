const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  day: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
  startTime: { type: String },
  endTime: { type: String },
}, { _id: false });

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courtCount: { type: Number, required: true },
  minSlotDuration: {
    type: String,
    enum: ["30min", "45min", "1hr", "1.5hr", "2hr"],
    required: true,
  },
  amountPerSlot: { type: Number, required: true },
  advanceAmount: { type: Number, default: 0 },
  availability: {
    sameForAll: { type: Boolean, required: true },
    defaultStart: { type: String },
    defaultEnd: { type: String },
    customDays: [availabilitySchema]
  }
}, { _id: false });

const turfSetupSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TurfOwner",
    required: true,
  },
  sports: [sportSchema],
  amenities: [String],
  primaryImage: { type: String },
  galleryImages: [String],
}, { timestamps: true });

module.exports = mongoose.model("TurfSetup", turfSetupSchema);
