
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const User1 = sequelize.define("User1", {
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
    notEmpty: { msg: "Phone number cannot be empty" },
     is: {
      args: /^[0-9]{10}$/, // 👈 only 10-digit numbers allowed
      msg: "Phone number must be 10 digits"
    }
  }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User1;
