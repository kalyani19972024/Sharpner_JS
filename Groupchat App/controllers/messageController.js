
// controllers/messageController.js
const Message = require("../models/message");
const User = require("../models/User1");

// Store new message
exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Message text required" });

    const msg = await Message.create({
      text,
      userId: req.user.id
    });

    res.status(201).json({ message: "Message saved", data: msg });
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
};

// Get all messages with user info
exports.getMessages = async (req, res) => {
  try {
    const msgs = await Message.findAll({
      include: { model: User, attributes: ["id", "name"] },
      order: [["createdAt", "ASC"]]
    });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
