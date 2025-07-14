
const Booking = require('../models/Booking');

const addBooking = async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;
    const booking = await Booking.create({ userId, busId, seatNumber });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBooking
};
