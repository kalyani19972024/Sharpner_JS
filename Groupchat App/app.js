
const express=require('express');
const path = require("path");
const app=express();
const sequelize=require('./utils/db');

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));


sequelize.sync({alter:true}).then(() => {
    app.listen(3000,() => {
        console.log('server is running');
    });
}).catch(err => {
    console.error('Database sync failed',err);
});

