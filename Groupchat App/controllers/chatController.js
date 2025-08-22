
const Message = require("../models/message");
const User1 = require("../models/User1");
const { Op } = require("sequelize");



exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id; // from auth middleware

    const message = await Message.create({ text, userId });
    res.status(201).json(message);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: { model: User1, attributes: ["id", "name"] },
      order: [["createdAt", "ASC"]],
    });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User1.findAll({
      attributes: ["id", "name", "email"]
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to load users" });
  }
};

exports.getNewMessages = async (req, res) => {
  try {
    const lastMsgId = req.query.lastMsgId || 0;

    const messages = await Message.findAll({
      where: { id: { [Op.gt]: lastMsgId }}, // only fetch messages newer than last seen},
      include: [{ model: User1, attributes: ["id","name"] }],
    });
     res.json(messages.map(m => ({
      id: m.id,
      text: m.text,
      name: m.User1 ? m.User1.name : "Unknown"
    })));

  } catch (err) {
    console.error("Error fetching new messages", err);
    res.status(500).json({ message: "Failed to fetch new messages" });
  }
};

