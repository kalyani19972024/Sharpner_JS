
const express=require('express');
const studentRoutes=require('./routes/studentsRoutes');
const app=express() ;

app.use(express.json());
app.use('/students',studentRoutes);

app.listen(3200,() => {
    console.log('server is listening');
})