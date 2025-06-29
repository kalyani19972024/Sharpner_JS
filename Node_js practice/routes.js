
const express = require('express');
const app = express();


app.use(express.json());

// GET /orders
app.get('/orders', (req, res) => {
  res.send('Here is the list of all orders.');
});

// POST /orders
app.post('/orders', (req, res) => {
  res.send('A new order has been created.');
});

// GET /users
app.get('/users', (req, res) => {
  res.send('Here is the list of all users.');
});

// POST /users
app.post('/users', (req, res) => {
  res.send('A new user has been added.');
});

// Start the server
app.listen(6500, () => {
  console.log('Server is running.');
});
