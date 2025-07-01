
const express=require('express');
const app=express();
const bookrouter=require('./Routes/books');

app.use('/books',bookrouter);

app.listen(3100,()=> {
    console.log("server is running");
});