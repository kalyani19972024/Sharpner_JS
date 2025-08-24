
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
    notEmpty: { msg: "Phone number cannot be empty" }
     }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
