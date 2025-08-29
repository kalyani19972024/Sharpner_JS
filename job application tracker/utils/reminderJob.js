// utils/reminderJob.js
const cron = require("node-cron");
const Reminder = require("../models/Reminder");
const JobApplication = require("../models/jobApplication");
const User = require("../models/User");
const sendEmail = require("./mailer");
const { Op } = require("sequelize");
const jobApplication = require("../models/jobApplication");

cron.schedule("*/2 * * * *", async () => {
  try {
    console.log("🔍 Checking for upcoming reminders...");

    const now = new Date();
    const in15min = new Date(now.getTime() + 15 * 60000);

    const reminders = await Reminder.findAll({
      where: { reminderDate: { [Op.between]: [now, in15min] }, isNotified: false }, // 👈 prevents duplicates
      include: [
        { model: jobApplication, attributes: ["companyName", "jobTitle"] },
        { model: User, attributes: ["email", "name"] }
      ]
    });

    console.log("reminders **********", reminders);
    for (const r of reminders) {
      const subject = `⏰ Reminder: ${r.jobApplication.jobTitle} at ${r.jobApplication.companyName}`;
      const text = `Hi ${r.User.name},\n\nYou have a reminder for your job application at ${r.jobApplication.companyName}.\n\nNote: ${r.note || "No note"}\nScheduled at: ${r.reminderDate}\n\nGood luck!`;

      await sendEmail(r.User.email, subject, text);

      // ✅ mark as notified so it doesn’t resend
      r.isNotified = true;
      await r.save();
    }
  } catch (err) {
    console.error("Reminder job error:", err);
  }
});
