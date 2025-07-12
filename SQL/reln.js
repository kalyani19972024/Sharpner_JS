
const express=require('express');
const db=require('./utils/db-connection1');
const student1Routes=require('./routes/student1Routes');
const courseRoutes=require('./routes/courseRoutes');
const app=express() ;

require('./models/students1');
require('./models/identitycard');
require('./models/department');
require('./models/index1'); 

app.use(express.json());
app.use('/students',student1Routes);
app.use('/courses',courseRoutes);

db.sync({force:true}).then(()=>{
    app.listen(3600,() => {
    console.log('server is listening');
    })
}).catch((err)=>{
     console.log(err);
})

