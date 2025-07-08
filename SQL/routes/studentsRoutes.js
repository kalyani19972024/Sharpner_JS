
const express=require('express');
const studentController=require('../controller/studentController');
const router=express.Router();

router.post("/",studentController.addStudents);
router.get("/",studentController.getStudents);
router.get("/:id",studentController.getStudentsbyID);
router.put("/:id",studentController.updateStudents);
router.delete("/:id",studentController.deleteStudents);


module.exports=router ;