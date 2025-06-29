const express = require('express');
const app = express();


const setUser = (req,res,next) => {
  req.user = 'Guest';
  next();
};

app.get('/welcome', setUser, (req, res) => {
  res.send(`<h1>Welcome, ${req.user}!</h1>`);
});


app.listen(8000, () => {
  console.log('Server is running ');
});


