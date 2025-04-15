const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  saveCommute,
  getCommuteHistory,
  estimateFare, 
  getCommuteStats
} = require("../controllers/commuteController");

const router = express.Router();

// POST: Save commute data
router.post("/", protect, saveCommute);

// GET: Get user's commute history
router.get("/", protect, getCommuteHistory);

// POST: Estimate fare based on distance and mode
router.post("/fare", protect, estimateFare); // Add `protect` middleware here for JWT validation

// GET: Get commute statistics
router.get("/stats", protect, getCommuteStats);

module.exports = router;
