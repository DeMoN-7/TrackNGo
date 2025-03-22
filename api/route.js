const express = require("express");
const { getRoute } = require("../controllers/routeController");

const router = express.Router();

// Route to get route data
router.post("/planner", getRoute);

module.exports = router;
