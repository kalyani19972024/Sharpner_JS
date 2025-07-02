
const express = require('express');
const app = express();

app.use(express.json());


const productRoutes = require('./routes/productRoutes');


app.use('/products', productRoutes);


app.get('/', (req, res) => {
    res.send("Welcome to the Ecommerce API");
});


app.use((req, res) => {
    res.status(404).send("Route not found");
});


app.listen(3300, () => {
    console.log(`Server is running `);
});

