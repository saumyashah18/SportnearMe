const express = require("express");
const router = express.Router();

const TurfOwner = require("../models/TurfOwner");
const TurfSetup = require("../models/TurfSetup");

// ✅ Main route for setting up turf
router.post("/setup", async (req, res) => {
  try {
    const { uid, sports, amenities, primaryImage, galleryImages } = req.body;

    console.log("📥 Received data from frontend:", req.body);

    // 🔒 Ensure UID is provided
    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }

    // 🔍 Corrected: Use 'firebaseUid' instead of 'uid'
    const owner = await TurfOwner.findOne({ firebaseUid: uid.trim() });

    if (!owner) {
      console.log("📛 No match found. Maybe field mismatch?");
      const all = await TurfOwner.find();
      console.log("📋 All owners:", all);
      return res.status(404).json({ error: "Owner not found for given UID" });
    }

    // 🧱 Create Turf Setup entry
    const turfSetup = new TurfSetup({
      owner: owner._id,
      sports: Array.isArray(sports) ? sports : [],
      amenities: Array.isArray(amenities) ? amenities : [],
      primaryImage: primaryImage || null,
      galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
    });

    await turfSetup.save();

    res.status(201).json({
      message: "✅ Turf setup saved successfully",
      turfSetup,
    });
  } catch (error) {
    console.error("❗ Error saving turf setup:", error);
    res.status(500).json({ error: "Server error while saving turf setup" });
  }
});

module.exports = router;
