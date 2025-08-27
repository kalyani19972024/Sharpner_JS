require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const sequelize = require("./utils/db"); // DB connection
const User = require("./models/User"); // load User model

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const jobRoutes = require("./routes/jobRoute");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for frontend HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Job Application Tracker API is running...");
});

// Sync database and start server
sequelize.sync().then(() => {
    console.log("Database connected and synced!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
