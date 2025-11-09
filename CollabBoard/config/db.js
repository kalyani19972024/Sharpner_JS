
// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://localhost:27017/collabboard_db";

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
