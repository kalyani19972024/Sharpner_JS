
const express=require('express');
const router=express.Router();
const busbookingController=require('../controller/busbookingController');

router.post('/user',busbookingController.addUsers);
router.get('/users',busbookingController.getUsers);

router.post('/buses',busbookingController.addBuses);
router.get('/buses/available/:seats',busbookingController.getBuses);

module.exports=router ;