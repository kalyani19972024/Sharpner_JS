
const express=require('express');
const student1Controller=require('../controller/student1Controller');
const router=express.Router();

router.post("/add",student1Controller.addStudents);
router.put("/update/:id",student1Controller.updateStudents);
router.delete("/delete/:id",student1Controller.deleteStudents);

router.post("/addingStudentWithCard",student1Controller.addingValuesToStudentAndIdentityTable);


module.exports=router ;