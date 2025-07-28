

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Company = require('./Company');

const Review = sequelize.define('Review', {
  pros: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cons: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Company.hasMany(Review);       
Review.belongsTo(Company);     

module.exports = Review;
