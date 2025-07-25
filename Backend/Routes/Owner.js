const express = require("express");
const router = express.Router();
const TurfOwner = require("../models/TurfOwner"); // Adjust path if needed

// ✅ Create or Update Full TurfOwner Profile (from form)
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

// ✅ Basic Create for OTP step (just firebaseUid and phone)
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
    turfLocationUrl
  } = req.body;

  if (!firebaseUid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const updatedOwner = await Owner.findOneAndUpdate(
      { firebaseUid },
      {
        phone,
        name,
        dob,
        email,
        gender,
        turfName,
        turfAddress,
        turfDescription,
        turfLocationUrl,
      },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedOwner);
  } catch (err) {
    console.error("Error updating owner profile:", err);
    res.status(500).json({ message: "Server error" });
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

// ✅ Get profile by Firebase UID
router.get("/profile/:firebaseUid", async (req, res) => {
  const { firebaseUid } = req.params;

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
