
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get the Authorization header value
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Format: "Bearer <token>", so split by space
    const token = authHeader.split(' ')[1];

    console.log("token", token);

const user = jwt.verify(token, 'myHardCodedSecret123');
//req.user = { id: user.userId }; // ✅ sets id instead of userId


    if (!token || token === 'undefined') {
      return res.status(401).json({ message: 'Token missing or invalid' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'myHardCodedSecret123'); 

    req.user = { id: decoded.userId };

    
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
