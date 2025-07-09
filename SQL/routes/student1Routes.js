
const express=require('express');
const student1Controller=require('../controller/student1Controller');
const router=express.Router();

router.post("/",student1Controller.addStudents);
router.put("/:id",student1Controller.updateStudents);
router.delete("/:id",student1Controller.deleteStudents);


module.exports=router ;