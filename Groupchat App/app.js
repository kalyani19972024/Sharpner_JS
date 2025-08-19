
const express=require('express');
const bodyParser = require("body-parser");
const path = require("path");
const app=express();
app.use(bodyParser.json());
const sequelize=require('./utils/db');

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRoute");
app.use("/api/auth", authRoutes);


sequelize.sync({alter:true}).then(() => {
    app.listen(3000,() => {
        console.log('server is running');
    });
}).catch(err => {
    console.error('Database sync failed',err);
});

