
// middleware/authmiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    console.log("Auth header:", req.header("Authorization"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = { id: user.id, email: user.email }; // ✅ attach user info
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};


