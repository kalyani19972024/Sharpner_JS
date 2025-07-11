
const express=require('express');
const db=require('./utils/db-connection1');
const student1Routes=require('./routes/student1Routes');
const app=express() ;

require('./models');

app.use(express.json());
app.use('/students',student1Routes);

db.sync({force:false}).then(()=>{
    app.listen(3000,() => {
    console.log('server is listening');
    })
}).catch((err)=>{
     console.log(err);
})

