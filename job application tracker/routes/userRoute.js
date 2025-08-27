
// routes/userRoute.js
const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authmiddleware");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
