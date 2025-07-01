
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=> {
    res.send('Fetch all products');
});

router.post('/',(req,res)=> {
    res.send('Add a new product');
});

router.get('/:id',(req,res)=> {
    res.send(`Fetch a product by its ID:${req.params.id}`);
});

module.exports=router ;