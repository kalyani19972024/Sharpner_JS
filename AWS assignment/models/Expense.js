
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
  type: DataTypes.INTEGER,
  allowNull: false
}
});

module.exports = Expense;
