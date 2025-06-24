const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];

    if (url === "/") {
        fs.readFile("formValues.txt", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log(err);
                data = ''; // fallback if file read fails
            }

            res.write("<html>");
            res.write("<head><title>Enter Message</title></head>");
            res.write(`<body><div>${data}</div>`);
            res.write(`<form action="/message" method="POST">
                         <input type="text" name="message"/>
                         <button type="submit">Send</button>
                       </form></body>`);
            res.write("</html>");
            return res.end();
        });
    } else if (url === "/message" && method === "POST") {
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];

            fs.writeFile("formValues.txt", message, (err) => {
                if (err) {
                    console.log("Error writing to file:", err);
                }
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    } else {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Hello From Node.js</h1></body>");
        res.write("</html>");
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
