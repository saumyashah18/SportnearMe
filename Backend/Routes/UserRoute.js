const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const { generateToken, verifyToken } = require("../middleware/auth");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); 

// 🔷 loginOrRegister
router.post("/loginOrRegister", async (req, res) => {
  const { firebaseUid, phone } = req.body;

  if (!firebaseUid || !phone) {
    return res.status(400).json({ message: "firebaseUid and phone are required" });
  }

  try {
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = new User({ firebaseUid, phone });
      await user.save();
      const token = generateToken({ id: user._id });
      return res.status(201).json({
        message: "✅ New user created",
        user,
        needsProfile: true,
        token,
      });
    }

    const token = generateToken({ id: user._id });
    res.status(200).json({
      message: "✅ Existing user",
      user,
      needsProfile: false,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// 🔷 completeProfile
router.post("/completeProfile", verifyToken, upload.single("profileImage"), async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    gmail,
    selectedSports,
  } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.gender = gender;
    user.gmail = gmail;
    user.selectedSports = JSON.parse(selectedSports);
    if (req.file) {
      user.profileImageUrl = req.file.path;
    }

    await user.save();
    res.status(200).json({ message: "✅ Profile completed", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// backend/Routes/UserRoute.js
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
