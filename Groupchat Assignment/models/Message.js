
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");

const Message = sequelize.define("Message", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});


// Association
User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });

module.exports = Message;