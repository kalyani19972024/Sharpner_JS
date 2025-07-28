
const express = require('express');
const app = express();

 // keep this if you're using POST

app.get('/products', (req, res) => {
  res.send('Here is the list of all products.');
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
