const express = require("express");
const router = express.Router();

const TurfOwner = require("../models/TurfOwner");
const TurfSetup = require("../models/TurfSetup");

router.post("/setup", async (req, res) => {
  try {
    const { uid, sports, amenities, primaryImage, galleryImages } = req.body;

    console.log("Received data from frontend:", req.body);

    const owner = await TurfOwner.findOne({ uid });
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

  
    const turfSetup = new TurfSetup({
      owner: owner._id,
      sports,
      amenities,
      primaryImage,
      galleryImages,
    });

    
    await turfSetup.save();

    res.status(201).json({ message: "Turf setup saved successfully", turfSetup });
  } catch (error) {
    console.error("Error saving turf setup:", error);
    res.status(500).json({ error: "Server error while saving turf setup" });
  }
});

module.exports = router;
