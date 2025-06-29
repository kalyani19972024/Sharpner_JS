
const http=require('http')

const express=require('express');
const app=express()

app.use((req,res,next) => {
    console.log("Server is up and running on port 3000! Ready to handle requests.");
})
const server=http.createServer(app)

server.listen(3000);