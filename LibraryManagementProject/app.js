
const express=require('express');
const cors=require('cors');
const app=express();
const sequelize=require('./utils/db');
const routes=require('./routes/bookRoute');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/api',routes);


sequelize.sync().then(()=> {
     app.listen(3000,()=> {
    console.log("server is running");
});
}).catch((err)=> {
    console.error('Database sync failed',err);
})