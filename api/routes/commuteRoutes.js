const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  saveCommute,
  getCommuteHistory,
  estimateFare, // Add this
} = require("../controllers/commuteController");
const { getCommuteStats } = require("../controllers/commuteController");

// POST: Save commute data
router.post("/", protect, saveCommute);

// GET: Get user's commute history
router.get("/", protect, getCommuteHistory);

// POST: Estimate fare based on distance and mode
router.post("/fare", estimateFare);
router.get("/stats", protect, getCommuteStats);
module.exports = router;
