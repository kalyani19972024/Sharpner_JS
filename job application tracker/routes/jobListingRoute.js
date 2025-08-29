const express = require("express");
const router = express.Router();
const jobListingController = require("../controllers/jobListingController");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/", authMiddleware, jobListingController.createListing);
router.get("/", authMiddleware, jobListingController.getListings);
router.put("/:id/apply", authMiddleware, jobListingController.applyListing);
router.delete("/:id", authMiddleware, jobListingController.deleteListing);

module.exports = router;
