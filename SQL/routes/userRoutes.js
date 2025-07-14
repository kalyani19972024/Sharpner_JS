
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.post('/', userController.adduser);

router.get('/:id/bookings',userController.getUserBookings);

module.exports = router;
