const Job = require("../models/jobApplication");
const { Op } = require("sequelize");

// Create job
exports.createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status, notes } = req.body;
    const userId = req.user.id; // comes from auth middleware

    const job = await Job.create({
      companyName,
      jobTitle,
      applicationDate,
      status,
      notes,
      attachment: req.file ? req.file.filename : null,
      userId
    });
    res.json(job);
  } catch (err) {
    console.error("Error creating job:", err);  // ✅ log exact error
    res.status(500).json({ error: "Failed to create job application" });
  }
};

// Get all jobs (with optional filters)
exports.getJobs = async (req, res) => {
  try {
    const { status, company } = req.query; // read filters from query params

    let whereClause = { userId: req.user.id };

    if (status) {
      whereClause.status = status;
    }

    if (company) {
      whereClause.companyName = { [Op.like]: `%${company}%` };
    }

    const jobs = await Job.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ where: { id, userId: req.user.id } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    job.companyName = req.body.companyName || job.companyName;
    job.jobTitle = req.body.jobTitle || job.jobTitle;
    job.applicationDate = req.body.applicationDate || job.applicationDate;
    job.status = req.body.status || job.status;
    job.notes = req.body.notes || job.notes;
    if (req.file) job.attachment = req.file.filename;

    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job application" });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findOne({ where: { id, userId: req.user.id } });
    if (!job) return res.status(404).json({ error: "Job not found" });

    await job.destroy();
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job application" });
  }
};
