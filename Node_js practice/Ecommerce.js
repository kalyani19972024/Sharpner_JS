
const express = require('express');
const app = express();


app.use(express.json());


const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');


app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


app.get('/', (req, res) => {
    res.send("Welcome to the API");
});


app.use((req, res) => {
    res.status(404).send("Route not found");
});


app.listen(3000, () => {
    console.log(`Server is running `);
});

