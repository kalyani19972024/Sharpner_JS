const  http=require('http');
const fs=require('fs')
const server=http.createServer((req,res)=> {
    
     

     if(req.url ==='/'){
         res.setHeader('Content-Type','text/html');

         res.end(
            `
            <form method="POST" action="/message">
            <label>Name:</label>
            <input type="text" name="username"></input>
            <button type="submit">Add</button>
            </form>
            `
         );

     }else{
        if(req.url =='/message'){

            res.setHeader('Content-Type','text/html');

            let  body=[];
            req.on('data',(chunks)=>{
                  body.push(chunks);
            });

            req.on('end',()=>{
                let buffer=Buffer.concat(body);

                //console.log(buffer);

                let formData=buffer.toString();
                //console.log(formData);

                const formValues=formData.split('=')[1];

                fs.writeFile('formValues.txt',formValues,(err)=>{
                       
                    res.statusCode=302 ;
                    res.setHeader('Location','/');
                    res.end();
                })
            })

        }else{
            if(req.url=='/read'){

                fs.readFile('formValues.txt',(err,data) => {
                     console.log(data.toString());
                     res.end(`<h1>${data.toString()}</h1>`);
                })
            }
        }
     }
})

server.listen(8000,() => {
    console.log("server is running");
});



