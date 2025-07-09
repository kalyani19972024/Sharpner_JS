

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdb', 'root', 'Kalyani@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
