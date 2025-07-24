const mongoose = require("mongoose");

const turfOwnerSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },

  // Owner Info
  name: { type: String },
  dob: { type: String },
  email: { type: String },
  gender: { type: String },

  // Turf Info
  turfName: { type: String },
  turfAddress: { type: String },
  turfDescription: { type: String },
  turfLocationUrl: { type: String },

  // Future use — allow multiple turfs
  turfs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Turf" }],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TurfOwner", turfOwnerSchema);
