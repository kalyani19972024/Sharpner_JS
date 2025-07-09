
const express=require('express');
const db=require('./utils/db-connection1');
const student1Routes=require('./routes/student1Routes');
const app=express() ;

const studentModel=require('./models/students1');

app.use(express.json());
app.use('/students',student1Routes);

db.sync({force:true}).then(()=>{
    app.listen(3000,() => {
    console.log('server is listening');
    })
}).catch((err)=>{
     console.log(err);
})

