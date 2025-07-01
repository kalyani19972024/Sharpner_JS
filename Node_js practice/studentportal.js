
const express=require('express');
const app=express();
const studentrouter=require('./Routes/students');
const courserouter=require('./Routes/courses');

app.get('/',(req,res)=> {
     res.send('Welcome to the Student & Course Portal API!');
});

app.use('/students',studentrouter);
app.use('/courses',courserouter);

app.use((req,res) => {
    res.status(404).send("page not found");
})


app.listen(3300,() => {
    console.log("server is listening");

})