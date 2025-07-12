
const express=require('express');
const courseController=require('../controller/courseController');
const router=express.Router();

router.post('/addcourse',courseController.addCourse);


module.exports=router ;