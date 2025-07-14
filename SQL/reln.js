
const express=require('express');
const db=require('./utils/db');
// const student1Routes=require('./routes/student1Routes');
// const courseRoutes=require('./routes/courseRoutes');
const app=express() ;

// require('./models/students1');
// require('./models/identitycard');
// require('./models/department');
// require('./models/index1'); 

require('./models/User');
require('./models/Booking');
require('./models/Bus');

app.use(express.json());
// app.use('/students',student1Routes);
// app.use('/courses',courseRoutes);

app.use('/users', require('./routes/userRoutes'));
app.use('/buses', require('./routes/busRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));

db.sync({force:true}).then(()=>{
    app.listen(3600,() => {
    console.log('server is listening');
    })
}).catch((err)=>{
     console.log(err);
})

