
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Create user
router.post("/", userController.createUser);

// Get user by ID
router.get("/:id", userController.getUserById);

module.exports = router;
