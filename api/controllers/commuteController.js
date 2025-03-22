const Commute = require("../models/Commute");

// Save Commute
const saveCommute = async (req, res) => {
  const { start, destination, date, distance } = req.body;

  try {
    const commute = new Commute({
      user: req.user.id, // From authMiddleware
      start,
      destination,
      date,
      distance,
    });

    await commute.save();
    res.status(201).json({ message: "✅ Commute saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("⚠️ Server Error");
  }
};

// Get Commute History
const getCommuteHistory = async (req, res) => {
  try {
    const commutes = await Commute.find({ user: req.user.id }).sort("-date");
    res.json(commutes);
  } catch (error) {
    console.error(error);
    res.status(500).send("⚠️ Server Error");
  }
};
// @desc Estimate fare based on distance and mode
// @route POST /api/commute/fare
const estimateFare = (req, res) => {
    const { distance, mode } = req.body;
  
    if (!distance || !mode) {
      return res.status(400).json({ message: "Distance and mode are required!" });
    }
  
    let fare = 0;
  
    // Define fare calculation logic
    switch (mode.toLowerCase()) {
      case "bus":
        fare = distance * 5; // ₹5 per km for bus
        break;
      case "train":
        fare = distance * 3; // ₹3 per km for train
        break;
      case "cab":
        fare = distance * 10; // ₹10 per km for cab
        break;
      default:
        return res.status(400).json({ message: "Invalid transport mode!" });
    }
  
    res.status(200).json({
      distance: `${distance} km`,
      mode,
      estimatedFare: `₹${fare.toFixed(2)}`,
    });
  };

  // Get Commute Stats for Dashboard
const getCommuteStats = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const commutes = await Commute.find({ user: userId });
  
      if (commutes.length === 0) {
        return res.status(200).json({ message: "No commute data found!" });
      }
  
      // Calculate stats
      const totalDistance = commutes.reduce((sum, commute) => sum + commute.distance, 0);
      const avgTime = (commutes.reduce((sum, commute) => sum + commute.duration, 0) / commutes.length).toFixed(2);
  
      res.status(200).json({
        totalDistance: totalDistance.toFixed(2),
        avgTime: avgTime,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "⚠️ Failed to get commute stats" });
    }
  };
  
  module.exports = {
    saveCommute,
    getCommuteHistory,
    estimateFare,
    getCommuteStats,
  };
  
// module.exports = { saveCommute, getCommuteHistory };
