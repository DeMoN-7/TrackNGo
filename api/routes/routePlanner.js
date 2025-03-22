const express = require("express");
const router = express.Router();
const { getRoute } = require("../../controllers/routeController");

// Route to fetch route
router.post("/", getRoute);

module.exports = router;
