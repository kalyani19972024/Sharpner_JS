
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // adjust path if needed

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Order;
