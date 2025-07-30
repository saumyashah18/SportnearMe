const Turf = require("../models/TurfSetup");

const createTurf = async (req, res) => {
  try {
    console.log("📥 Incoming Turf Data:", req.body);

    const {
      uid,
      name,
      address,
      city,
      location,
      primaryImage,
      galleryImages,
      sports,
      amenities,
    } = req.body;

    if (!uid || !name || !sports || !Array.isArray(sports) || sports.length === 0) {
      console.warn("⚠️ Missing or invalid fields:", {
        uidType: typeof uid,
  nameType: typeof name,
  sportsType: typeof sports,
  sportsLength: sports?.length,
      });
      return res.status(400).json({ error: "Required fields missing or malformed" });
    }

    const newTurf = new Turf({
      uid,
      name,
      address,
      city,
      location,
      primaryImage,
      galleryImages,
      sports,
      amenities,
    });

    await newTurf.save();
    console.log("✅ Turf saved successfully:", newTurf);

    res.status(201).json({ message: "Turf created successfully", turf: newTurf });
  } catch (error) {
    console.error("❌ Error creating turf:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createTurf };
