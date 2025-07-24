const express = require("express");
const router = express.Router();
const TurfOwner = require("../models/TurfOwner"); // Adjust path as needed

// ✅ Create or Update TurfOwner Profile
router.post("/profile", async (req, res) => {
  const {
    firebaseUid,
    phone,
    name,
    dob,
    email,
    gender,
    turfName,
    turfAddress,
    turfDescription,
    turfLocationUrl,
  } = req.body;

  try {
    let owner = await TurfOwner.findOne({ firebaseUid });

    if (owner) {
      // Update existing owner
      owner.phone = phone;
      owner.name = name;
      owner.dob = dob;
      owner.email = email;
      owner.gender = gender;
      owner.turfName = turfName;
      owner.turfAddress = turfAddress;
      owner.turfDescription = turfDescription;
      owner.turfLocationUrl = turfLocationUrl;

      await owner.save();
      return res.status(200).json({ message: "Profile updated", owner });
    }

    // Create new owner
    const newOwner = new TurfOwner({
      firebaseUid,
      phone,
      name,
      dob,
      email,
      gender,
      turfName,
      turfAddress,
      turfDescription,
      turfLocationUrl,
    });

    await newOwner.save();
    return res.status(201).json({ message: "Profile created", owner: newOwner });

  } catch (error) {
    console.error("Error saving owner profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Check if TurfOwner exists by Firebase UID
router.get("/check/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const owner = await TurfOwner.findOne({ firebaseUid: uid });

    if (owner) {
      return res.status(200).json({ exists: true, owner });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking owner existence:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/check/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const owner = await TurfOwner.findOne({ firebaseUid: uid });

    if (owner) {
      return res.status(200).json({ exists: true, owner });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking owner:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
