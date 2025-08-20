require("dotenv").config();
const express=require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app=express();
const cors = require("cors");
app.use(bodyParser.json());
const sequelize=require('./utils/db');
require("./models/User1");
require("./models/message"); 

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRoute");
const messageRoutes = require("./routes/messageRoute");
const chatRoutes = require("./routes/chatRoute");
const userRoutes = require("./routes/userRoute");


app.use("/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/", userRoutes);

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

