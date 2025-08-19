
const express=require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app=express();
const cors = require("cors");
app.use(bodyParser.json());
const sequelize=require('./utils/db');

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRoute");
app.use("/api/auth", authRoutes);

// ✅ CORS setup (production-ready)
const corsOptions = {
  origin: "http://localhost:5500", // frontend URL (change in production)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));


sequelize.sync({alter:true}).then(() => {
    app.listen(3000,() => {
        console.log('server is running');
    });
}).catch(err => {
    console.error('Database sync failed',err);
});

