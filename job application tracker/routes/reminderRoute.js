// routes/reminderRoute.js
const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/", authMiddleware, reminderController.createReminder);
router.get("/", authMiddleware, reminderController.getReminders);
router.put("/:id", authMiddleware, reminderController.updateReminder);
router.delete("/:id", authMiddleware, reminderController.deleteReminder);

module.exports = router;
