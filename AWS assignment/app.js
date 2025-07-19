
const express=require('express');
const app=express();
const sequelize=require('./utils/db');
const cors=require('cors');
const User=require('./models/User');
const userRoutes=require('./routes/userRoute');

app.use(cors());
app.use(express.json());

app.use('/api',userRoutes);

sequelize.sync().then(() => {
    app.listen(3000,()=> {
    console.log('server is running');
    });

}).catch(err => {
    console.error('Database sync failed',err);
}) ;
