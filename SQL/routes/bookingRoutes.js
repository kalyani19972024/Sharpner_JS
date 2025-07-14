
const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');


router.post('/', bookingController.addBooking);

module.exports = router;
