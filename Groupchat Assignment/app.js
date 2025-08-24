require("dotenv").config();
const express=require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sequelize=require('./utils/db');
const cors = require("cors");
app.use(bodyParser.json());
 require("./models/User"); 
 require("./models/Message"); 



// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRoute");
const chatRoutes = require("./routes/chatRoute");
const userRoutes = require("./routes/userRoute");
app.use("/api/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/", userRoutes);
app.use(cors());



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

