
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'product.html'));
});

// Handle POST request from form (via Axios)
app.post('/add-product', (req, res) => {
  const product = req.body;
  console.log('Product received:', product); 
  res.json({ message: 'Product received successfully!', product });
});


app.listen(3700, () => {
  console.log(`Server running`);
});
