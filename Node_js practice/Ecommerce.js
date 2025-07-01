
const express=require('express');
const app=express();
const userRoutes=require('./Routes/userRoutes');
const productRoutes=require('./Routes/productRoutes');
const cartRoutes=require('./Routes/cartRoutes');

app.use(express.json());

app.use('/users',userRoutes);
app.use('/products',productRoutes);
app.use('/cart',cartRoutes);


app.listen(3400,() => {
    console.log("server is running");
})