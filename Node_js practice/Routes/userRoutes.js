
const express=require('express');
const router=express.Router();

router.get('/',(req,res) => {
    res.send('Fetch all users');
})

router.post('/',(req,res) => {
    res.send('Add a new user');
})

router.get('/:id',(req,res) => {
    const userId=req.params.id
    res.send(`Fetch a user by their Id: ${userId}`);
});

module.exports=router ;