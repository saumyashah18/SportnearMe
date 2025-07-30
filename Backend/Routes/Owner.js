const express = require("express");
const router = express.Router();
const TurfOwner = require("../models/TurfOwner"); // Make sure this path is correct

// ✅ Create or Update Full TurfOwner Profile
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

  if (!firebaseUid) {
    return res.status(400).json({ error: "Firebase UID is required" });
  }

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

// ✅ Create TurfOwner for OTP step (firebaseUid + phone only)
router.post("/create", async (req, res) => {
  const { firebaseUid, phone } = req.body;

  if (!firebaseUid || !phone) {
    return res.status(400).json({ error: "UID and phone required." });
  }

  try {
    const existingOwner = await TurfOwner.findOne({ firebaseUid });
    if (existingOwner) {
      return res.status(200).json({ exists: true, owner: existingOwner });
    }

    const newOwner = new TurfOwner({ firebaseUid, phone });
    await newOwner.save();

    return res.status(201).json({ message: "Owner created", owner: newOwner });
  } catch (err) {
    console.error("Error creating owner:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ✅ Check if TurfOwner exists by Firebase UID
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

// ✅ Get full profile by Firebase UID
router.get("/profile/:firebaseUid", async (req, res) => {
  const { firebaseUid } = req.params;
  console.log("🔍 Received Firebase UID:", firebaseUid);

  try {
    const owner = await TurfOwner.findOne({ firebaseUid });

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    res.status(200).json(owner);
  } catch (error) {
    console.error("Error fetching owner profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
