
const express = require('express');
const router = express.Router();
const busController = require('../controller/busController');


router.post('/', busController.addBus);


router.get('/:id/bookings',busController.getBusBookings);

module.exports = router;
