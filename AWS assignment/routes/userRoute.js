
const express=require('express');
const router=express.Router();
const User=require('../models/User');

router.post('/signup', async(req,res)=> {
    const {name,email,password}=req.body ;

    try{
        const existingUser= await User.findOne({ where:{email} });
        if(existingUser){
            return res.status(400).json({message:"Email already registered"});
        }

        const user=await User.create({name,email,password});
        res.status(201).json({message:"user registered successfully"});

    }catch(err){
        res.status(500).json({message:'signup failed', error:err.message});
    }
})

module.exports=router ;