
const express = require('express');
const path = require('path');
const app = express();

const productRoutes = require('./Routes/productRoutes');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'product', 'product.html'));
});

app.use('/api/products', productRoutes);

app.listen(3700, () => {
  console.log("server is running");
});

