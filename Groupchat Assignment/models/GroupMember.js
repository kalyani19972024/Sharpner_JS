

const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");
const Group = require("./Group");

const GroupMember = sequelize.define("GroupMember", {
  role: { type: DataTypes.STRING, defaultValue: "member" } // "admin" / "member"
});



module.exports = GroupMember;
