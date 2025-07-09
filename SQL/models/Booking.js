
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Booking = sequelize.define('Booking', {
  userId: DataTypes.INTEGER,
  busId: DataTypes.INTEGER,
  seatsBooked: DataTypes.INTEGER,
});

module.exports = Booking;
