const http = require('http');
const routes=require("./routes");
routes.anotherfunction();

const server = http.createServer(routes);

server.listen(6000, () => {
  console.log('Server is running on http://localhost:6000');
});
