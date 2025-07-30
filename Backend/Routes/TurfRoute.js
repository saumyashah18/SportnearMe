const express = require("express");
const router = express.Router();
const { createTurf } = require("../Controllers/TurfController");

router.post("/setup", createTurf);

module.exports = router;
