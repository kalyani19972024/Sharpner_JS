// routes/jobRoute.js
const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/upload");

router.post("/", authMiddleware, upload.single("attachment"), jobController.createJob);
router.get("/", authMiddleware, jobController.getJobs);
router.put("/:id", authMiddleware, jobController.updateJob);
router.delete("/:id", authMiddleware, jobController.deleteJob);

module.exports = router;
