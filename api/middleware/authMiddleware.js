const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header contains 'Bearer <token>'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the decoded token and exclude password
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token, return unauthorized
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
    
module.exports = { protect };
