const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routePlanner = require("./routes/routePlanner");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route for route planner
app.use("/api/planner", routePlanner);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
