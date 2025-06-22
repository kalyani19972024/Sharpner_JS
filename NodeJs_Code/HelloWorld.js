const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  let responseHtml = '';

  switch (req.url) {
    case '/home':
      responseHtml = '<h1>Welcome home</h1>';
      break;
    case '/about':
      responseHtml = '<h1>Welcome to About Us</h1>';
      break;
    case '/node':
      responseHtml = '<h1>Welcome to my Node Js project</h1>';
      break;
    default:
      res.statusCode = 404;
      responseHtml = '<h1>Page Not Found</h1>';
  }

  res.end(responseHtml);
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
