
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const auth = require("../middleware/auth"); // if you want JWT protection

// save a message
router.post("/messages", auth, chatController.sendMessage);

// get all messages
router.get("/messages", auth, chatController.getMessages);

module.exports = router;