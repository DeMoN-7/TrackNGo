const mongoose = require("mongoose");

const CommuteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  start: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  distance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Commute", CommuteSchema);
