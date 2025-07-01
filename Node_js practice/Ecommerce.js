
const express = require('express');
const app = express();
const port = 3700;

const productRoutes = require('./Routes/productRoutes');

app.use(express.json());

// Mount product routes
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
