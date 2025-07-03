
const express=require('express');
const getUser=require('../Controllers/userController');
const router=express.Router();


router.get('/user/:id',getUser);
router.post('/user',createUser);

module.exports=router ;
