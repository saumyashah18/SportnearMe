const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  turfs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Turf" }],
  createdAt: { type: Date, default: Date.now }
});

mongoose.model("Owner", ownerSchema);
module.exports = mongoose.model("Owner", ownerSchema);