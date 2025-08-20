

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { sendMessage, getMessages } = require("../controllers/messageController");

router.post("/", auth, sendMessage);  // send message
router.get("/", auth, getMessages);   // fetch all messages

module.exports = router;
