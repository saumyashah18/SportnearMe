const express = require("express");
const router = express.Router();

router.post("/check-owner", async (req, res) => {
    const { phone } = req.body;
    // Logic to check owner in DB
    // Example:
    const owner = await TurfOwner.findOne({ phone });
    if (owner) {
        res.json({ exists: true });
    } else {
        res.json({ exists: false });
    }
});

module.exports = router;
