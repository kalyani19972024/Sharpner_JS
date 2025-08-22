

const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authMiddleware = require("../middleware/auth"); 

// Create a new group
router.post("/", authMiddleware, groupController.createGroup);

// Invite a user to group
router.post("/:groupId/invite", authMiddleware, groupController.inviteUser);

// Accept invite
router.post("/accept/:inviteId", authMiddleware, groupController.acceptInvite);

// List groups user belongs to
router.get("/", authMiddleware, groupController.getGroups);

// Send a message
router.post("/:groupId/messages", authMiddleware, groupController.sendMessage);

// Fetch messages with pagination (afterId or beforeId query params)
router.get("/:groupId/messages", authMiddleware, groupController.getMessages);

// Mark messages as read
//router.post("/:groupId/read", authMiddleware, groupController.markRead);

module.exports = router;
