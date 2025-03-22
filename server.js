const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routePlanner = require("./api/routes/routePlanner");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Ensures JSON parsing in requests

// API Routes
app.use("/api/planner", routePlanner);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to TracNgo API!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Server Error!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
