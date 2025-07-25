
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); 

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  }

});

module.exports = User;
