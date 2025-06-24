
const fs = require('fs');

const requestHandler= (req,res)=> {
     const url = req.url;
       const method = req.method;
     
       if (url === '/') {
         res.setHeader('Content-Type', 'text/html');
         res.end(`
           <form action="/message" method="POST">
             <label>Name:</label>
             <input type="text" name="username">
             <button type="submit">Add</button>
           </form>
           <a href="/read">Read Messages</a>
         `);
       } else if (url === '/message' && method === 'POST') {
         let body = [];
     
         req.on('data', (chunk) => {
           body.push(chunk);
         });
     
         req.on('end', () => {
           const buffer = Buffer.concat(body);
           const formData = buffer.toString();
           const formValue = formData.split('=')[1];
     
           fs.writeFile('formValues.txt', formValue, (err) => {
             res.statusCode = 302;
             res.setHeader('Location', '/');
             res.end();
           });
         });
       } else if (url === '/read') {
         fs.readFile('formValues.txt', (err, data) => {
           res.setHeader('Content-Type', 'text/html');
           if (err) {
             res.end('<h1>No data found</h1>');
           } else {
             res.end(`<h1>${data.toString()}</h1>`);
           }
         });
       } else {
         res.statusCode = 404;
         res.setHeader('Content-Type', 'text/html');
         res.end('<h1>Page not found</h1>');
       }
}

const anotherfunction=()=> {
    console.log("This is another function");
}

module.exports={requestHandler,anotherfunction} ;