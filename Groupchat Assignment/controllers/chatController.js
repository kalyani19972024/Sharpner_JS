const Message = require("../models/Message");
const User = require("../models/User");

exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id; // from auth middleware

    const message = await Message.create({ text, userId: req.user.id });
    // Include User in response
    const fullMessage = await Message.findOne({
      where: { id: message.id },
      include: { model: User, attributes: ["id", "name"] }
    });

    res.status(201).json(fullMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: { model: User, attributes: ["id", "name"] },
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
    const users = await User.findAll({
      attributes: ["id", "name", "email"]
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to load users" });
  }
};
