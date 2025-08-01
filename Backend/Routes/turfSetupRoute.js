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

router.get("/get/:id", async (req, res) => {
  try {
    const turf = await TurfSetup.findById(req.params.id); // Ensure it's TurfSetup, not Turf
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }
    res.json(turf);
  } catch (error) {
    console.error("Error fetching turf by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// PUT update turf setup by ID
router.put("/:_id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // 🧾 Optional: log incoming update data
    console.log("✏️ Update Request for Turf ID:", id);
    console.log("📦 Update Data:", updateData);

    const updatedTurf = await TurfSetup.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTurf) {
      return res.status(404).json({ error: "Turf setup not found" });
    }

    res.status(200).json({ message: "Turf setup updated", updatedTurf });
  } catch (error) {
    console.error("❗ Error updating turf setup:", error);
    res.status(500).json({ error: "Server error while updating turf setup" });
  }
});



module.exports = router;
