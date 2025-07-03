
const express=require('express');
const app=express() ;
const userRoutes=require('./routes/userRoutes');

//use the routes
app.use(userRoutes);
app.use(express.json());

app.listen(3000,() => {
    console.log("server is listening");
})