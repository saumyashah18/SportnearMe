const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true },
  phone: { type: String, required: true },
  firstName: String,
  lastName: String,
  gender: String,
  gmail: String,
  selectedSports: [String],
  profileImageUrl: String,
});

module.exports = mongoose.model("User", userSchema);
