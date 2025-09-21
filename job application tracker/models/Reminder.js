
// models/Reminder.js
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");
const jobApplication = require("./jobApplication");
const Company = require("./Company");
const JobListing = require("./JobListing");

const Reminder = sequelize.define("Reminder", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reminderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isNotified: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
}

});

User.hasMany(Reminder, { foreignKey: "userId" });
Reminder.belongsTo(User, { foreignKey: "userId" });

jobApplication.hasMany(Reminder, { foreignKey: "jobId" });
Reminder.belongsTo(jobApplication, { foreignKey: "jobId" });


Company.hasMany(JobListing);
JobListing.belongsTo(Company);


module.exports = Reminder;
