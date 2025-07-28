

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Company;
