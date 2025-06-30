
const express=require('express');
const app=express();

app.get("/welcome/:username",(req,res)=> {
    const name=req.params.username ;
    const rolename=req.query.role  || 'Admin' ;
    res.send(`Welcome,${name}!,Your role is ${rolename}`);
})

app.use((req,res)=> {
    res.status(404).send('<h1>404-page not found</h1>')
})

app.listen(3500,()=> {
    console.log("server is running");
})