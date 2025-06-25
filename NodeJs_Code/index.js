
const http=require("http");
const server=http.createServer((req,res)=> {
        if(req.url ==='/'){
             
             res.end(`
                <h1>Hello from Sharpener</h1>
                <h2>This is my Homepage</h2>
                <h3>This is pageno 1</h3>`)
        }
})

server.listen(2000,() => {
     console.log("server is running");
})