
const  express=require('express');
const path=require('path');
const app=express();

app.get('/api/products',(req,res)=> {
    res.sendFile(path.join(__dirname,"view","product.html"));
})



app.listen(3300,() => {
    console.log("server is listening");
})