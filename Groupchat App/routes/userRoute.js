
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/User1");
const authenticate = require("../middleware/auth");
const chatController = require("../controllers/chatController");

router.get("/users", authenticate, chatController.getUsers);


module.exports = router;
