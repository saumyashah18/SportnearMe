const express = require("express");
const User = require("../models/User");
const { generateToken, verifyToken } = require("../middleware/auth");

const router = express.Router();

// 🔷 loginOrRegister
router.post("/loginOrRegister", async (req, res) => {
  const { firebaseUid, phone } = req.body;
  console.log("📩 Incoming login request", { firebaseUid, phone }); 

  if (!firebaseUid || !phone) {
    console.warn("⚠️ Missing firebaseUid or phone in request body");
    return res
      .status(400)
      .json({ message: "firebaseUid and phone are required" });
  }

  try {
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // 🔷 If no user found with firebaseUid, check by phone
      console.log("ℹ️ No user found by firebaseUid, checking phone...");
      user = await User.findOne({ phone });

      if (user) {
        // 🔷 If phone exists but firebaseUid mismatches, update firebaseUid
        user.firebaseUid = firebaseUid;
        await user.save();
      } else {
         console.log("🆕 Creating new user");
        // 🔷 Neither firebaseUid nor phone found — create new user
        user = new User({ firebaseUid, phone });
        await user.save();
      }
    }

    const token = generateToken({ id: user._id });
    console.log("Generated JWT:", token);


    // 🔷 Check if profile is incomplete
    const needsProfile = !user.firstName || !user.gmail;

    res.status(200).json({
      message: "✅ User logged in or registered",
      user,
      needsProfile,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// 🔷 completeProfile
router.post("/completeProfile", verifyToken, async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    gmail,
    selectedSports,
    profileImageUrl,
  } = req.body;

  if (!profileImageUrl) {
    return res
      .status(400)
      .json({ message: "profileImageUrl is required. Upload your image to Firebase first." });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.gender = gender;
    user.gmail = gmail;

    if (Array.isArray(selectedSports)) {
      user.selectedSports = selectedSports;
    } else if (typeof selectedSports === "string") {
      // just in case frontend sent JSON string
      user.selectedSports = JSON.parse(selectedSports);
    }

    user.profileImageUrl = profileImageUrl;

    await user.save();
    res
      .status(200)
      .json({ message: "✅ Profile completed", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// 🔷 get current user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
