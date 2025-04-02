
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.body.token, '888');
  
  const authHeader = req.body.token; // Get token from header

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({ msg: "Access denied. No token provided!" });
  // }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to request
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token!" });
  }
};
