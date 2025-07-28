// middleware/authMiddleware.js ✅
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware; // ✅ MUST be direct export of the function
