const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController"); // Correct path to authController
const { protect } = require("../middleware/authMiddleware"); // Correct path to authMiddleware

const router = express.Router();

// Correctly define the routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;
