
const{DataTypes}=require('sequelize');
const sequelize=require('../utils/db');

const User=sequelize.define('User',{
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  age: DataTypes.INTEGER,
});

module.exports=User ;