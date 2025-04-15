const jwt = require('jsonwebtoken');

// Protect middleware to check if the user is authenticated
const protect = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" }); // Sends response and returns here
  }

  try {
    // Remove 'Bearer ' prefix and verify the token
    token = token.split(' ')[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Your JWT secret
    req.user = decoded.user; // Add decoded user to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" }); // Sends response and returns here
  }
};

module.exports = { protect };
