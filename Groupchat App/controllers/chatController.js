
const Message = require("../models/message");
const User1 = require("../models/User1");


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
