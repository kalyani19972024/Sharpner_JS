const { Op } = require('sequelize');
const { Group } = require('../models/Group');
const { GroupMember } = require('../models/GroupMember');
const {  message } = require('../models/message');
const { User1 } = require('../models/User1');
const { GroupReadState } = require('../models/GroupReadState');
const { v4: uuidv4 } = require('uuid');


// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const group = await Group.create({ name, createdBy: userId });
    await GroupMember.create({ groupId: group.id, userId });

    res.status(201).json(group);
  } catch (err) {
    console.error("Error creating group", err);
    res.status(500).json({ error: "Failed to create group" });
  }
};

// Get groups for the logged-in user
exports.getGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await Group.findAll({
      include: [
        {
          model: GroupMember,
          where: { userId },
          attributes: []
        }
      ]
    });

    res.json(groups);
  } catch (err) {
    console.error("Error fetching groups", err);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

// Invite a user by email
exports.inviteUser = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { email } = req.body;

    const group = await Group.findByPk(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    // check if requester is member
    const isMember = await GroupMember.findOne({ where: { groupId, userId: req.user.id } });
    if (!isMember) return res.status(403).json({ error: "Not a group member" });

    const inviteToken = uuidv4();
    const invite = await GroupInvite.create({ groupId, email, token: inviteToken });

    res.json({ message: "Invite created", invite });
  } catch (err) {
    console.error("Error inviting user", err);
    res.status(500).json({ error: "Failed to invite user" });
  }
};

// Accept invite
exports.acceptInvite = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id;

    const invite = await GroupInvite.findOne({ where: { token, accepted: false } });
    if (!invite) return res.status(400).json({ error: "Invalid invite" });

    // check if user email matches
    if (invite.email !== req.user.email) {
      return res.status(403).json({ error: "Invite email mismatch" });
    }

    await GroupMember.findOrCreate({ where: { groupId: invite.groupId, userId } });
    invite.accepted = true;
    await invite.save();

    res.json({ message: "Joined group successfully" });
  } catch (err) {
    console.error("Error accepting invite", err);
    res.status(500).json({ error: "Failed to accept invite" });
  }
};

// Get messages for a group with cursor pagination
exports.getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { afterId, beforeId, limit = 20 } = req.query;
    const userId = req.user.id;

    const isMember = await GroupMember.findOne({ where: { groupId, userId } });
    if (!isMember) return res.status(403).json({ error: "Not a member" });

    let where = { groupId };
    if (afterId) where.id = { $gt: afterId };
    if (beforeId) where.id = { $lt: beforeId };

    const messages = await Message.findAll({
      where,
      order: [["id", "DESC"]],
      limit: parseInt(limit),
      include: [{ model: User, attributes: ["id", "name"] }]
    });

    res.json(messages.reverse());
  } catch (err) {
    console.error("Error fetching messages", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Send a message to a group
exports.sendMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const isMember = await GroupMember.findOne({ where: { groupId, userId } });
    if (!isMember) return res.status(403).json({ error: "Not a member" });

    const message = await Message.create({ groupId, userId, text });
    const fullMessage = await Message.findByPk(message.id, {
      include: [{ model: User, attributes: ["id", "name"] }]
    });

    res.status(201).json(fullMessage);
  } catch (err) {
    console.error("Error sending message", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Update read state (last seen message)
exports.updateReadState = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { lastReadMessageId } = req.body;
    const userId = req.user.id;

    const [readState, created] = await GroupReadState.findOrCreate({
      where: { groupId, userId },
      defaults: { lastReadMessageId }
    });

    if (!created) {
      readState.lastReadMessageId = lastReadMessageId;
      await readState.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error updating read state", err);
    res.status(500).json({ error: "Failed to update read state" });
  }
};



