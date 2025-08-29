// controllers/reminderController.js
const Reminder = require("../models/Reminder");

exports.createReminder = async (req, res) => {
  try {
    const { jobId, reminderDate, note } = req.body;
     console.log("***********",jobId);
    if (!jobId || !reminderDate) {
      return res.status(400).json({ error: "Job ID and reminder date are required" });
    }

    // Ensure reminderDate is a proper Date object
    const parsedDate = new Date(reminderDate);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid reminder date" });
    }

    const reminder = await Reminder.create({
      jobId,
      userId: req.user.id,
      reminderDate: parsedDate,
      note: note || null,
      isNotified: false, 
    });

    res.json(reminder);
  } catch (err) {
    console.error("Create Reminder Error:", err);
    res.status(500).json({ error: "Failed to create reminder" });
  }
};


exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({ where: { userId: req.user.id } });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findOne({ where: { id, userId: req.user.id } });
    if (!reminder) return res.status(404).json({ error: "Reminder not found" });

    reminder.reminderDate = req.body.reminderDate || reminder.reminderDate;
    reminder.note = req.body.note || reminder.note;

    await reminder.save();
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: "Failed to update reminder" });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findOne({ where: { id, userId: req.user.id } });
    if (!reminder) return res.status(404).json({ error: "Reminder not found" });

    await reminder.destroy();
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};
