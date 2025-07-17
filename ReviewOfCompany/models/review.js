
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Review = sequelize.define('Review', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pros: {
    type: DataTypes.TEXT,
  },
  cons: {
    type: DataTypes.TEXT,
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    }
  },
});

module.exports = Review;
