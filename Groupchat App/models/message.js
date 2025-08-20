

const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User1 = require("./User1");

const Message = sequelize.define("Message", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});


// Association
User1.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User1, { foreignKey: "userId" });

module.exports = Message;
