const TurfOwner = require("../models/TurfOwner");

exports.checkOwnerExists = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone is required" });
  }
  try {
    const owner = await TurfOwner.findOne({ phone });
    res.json({ exists: !!owner });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
