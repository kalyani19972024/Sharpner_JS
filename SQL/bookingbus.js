
const express= require('express');
const db=require('./utils/booking');
const UserRoutes=require('./routes/busbookingRoutes');
const app=express();

app.use(express.json());

app.use('/',UserRoutes);

 app.listen(3000,() => {
    console.log('server is listening');
})