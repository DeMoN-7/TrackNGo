const Commute = require("../models/Commute");

// =============================
// ✅ Save Commute
// =============================
const saveCommute = async (req, res) => {
  const { start, destination, date, distance } = req.body;

  try {
    const commute = new Commute({
      user: req.user.id,
      start,
      destination,
      date,
      distance,
    });

    await commute.save();
    res.status(201).json({ message: "✅ Commute saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "⚠️ Server Error" });
  }
};

// =============================
// 📜 Get Commute History
// =============================
const getCommuteHistory = async (req, res) => {
  try {
    const commutes = await Commute.find({ user: req.user.id }).sort("-date");
    res.status(200).json(commutes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "⚠️ Server Error" });
  }
};

// =============================
// 💸 Estimate Fare (multi-mode)
// =============================
const estimateFare = (req, res) => {
  const { distance } = req.body;

  if (!distance || isNaN(distance)) {
    return res.status(400).json({ message: "Distance is required and must be a number!" });
  }

  const fares = {
    bike: Math.round(distance * 6),          // ₹6 per km
    auto: Math.round(distance * 8),          // ₹8 per km
    cab: Math.round(distance * 12),          // ₹12 per km
    premium_cab: Math.round(distance * 18),  // ₹18 per km
  };

  // Send the calculated fares back as a response
  res.status(200).json({
    distance: parseFloat(distance),
    fare: fares,  // Fare breakdown for each transport mode
  });
};


// =============================
// 📈 Get Commute Stats
// =============================
const getCommuteStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const commutes = await Commute.find({ user: userId });

    if (commutes.length === 0) {
      return res.status(200).json({ message: "No commute data found!" });
    }

    const totalDistance = commutes.reduce((sum, commute) => sum + commute.distance, 0);
    const avgTime = (
      commutes.reduce((sum, commute) => sum + (commute.duration || 0), 0) /
      commutes.length
    ).toFixed(2);

    res.status(200).json({
      totalDistance: totalDistance.toFixed(2),
      avgTime,
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
