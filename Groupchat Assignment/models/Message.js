
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");
const Group = require("./Group");

const Message = sequelize.define("Message", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  groupId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Message;


