const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const routePlanner = require("./routes/routePlanner");
const authRoutes = require("./routes/authRoutes");
const commuteRoutes = require("./routes/commuteRoutes");

// Load .env from the main folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Initialize Express App
const app = express();

// Define PORT
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit if connection fails
  });

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.json()); // Ensures JSON parsing in requests

// API Routes
app.use("/api/planner", routePlanner); // Route planner API
app.use("/api/auth", authRoutes); // Auth API (JWT)

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Daily Commute API!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`⚠️ Error: ${err.message}`);
  res.status(500).json({ message: "⚠️ Internal Server Error!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
app.use("/api/commute", commuteRoutes);