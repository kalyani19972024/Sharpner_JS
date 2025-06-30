
const express =require('express');
const app =express();
const orderRouter=require('./Routes/orders');
const userRouter=require('./Routes/users');

 app.use('/orders',orderRouter);
 app.use('/users',userRouter);

app.listen(3200, () => {
    console.log('Server is running');
});

