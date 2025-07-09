const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

const upload = multer({ dest: "uploads/" }); // Later: cloud storage integration

router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    const {
      firebaseUid,
      phone,
      firstName,
      lastName,
      gender,
      gmail,
      selectedSports,
    } = req.body;

    const user = new User({
      firebaseUid,
      phone,
      firstName,
      lastName,
      gender,
      gmail,
      selectedSports: JSON.parse(selectedSports),
      profileImageUrl: req.file?.path,
    });

    await user.save();
    res.status(201).json({ message: "✅ User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
