
const Bus = require('../models/Bus');

const addBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;
    const bus = await Bus.create({ busNumber, totalSeats, availableSeats });
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBusBookings = async (req, res) => {
  try {
    const { Booking, User } = require('../models');
    const bookings = await Booking.findAll({
      where: { busId: req.params.id },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBus,
  getBusBookings
};
