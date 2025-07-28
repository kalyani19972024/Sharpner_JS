
const express=require('express');
const router=express.Router();
const bookcontroller = require('../controllers/bookController');

router.post('/borrow',bookcontroller.borrowBook);
router.get("/borrowed", bookcontroller.getBorrowedBooks);
router.post("/return/:id", bookcontroller.returnBook);
router.post("/payfine/:id", bookcontroller.payFineAndReturn);


module.exports=router ;