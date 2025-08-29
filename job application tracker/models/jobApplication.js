// models/JobApplication.js
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");

const jobApplication = sequelize.define("jobApplication", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  companyName: { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  applicationDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: { 
    type: DataTypes.ENUM("Applied", "Interviewed", "Offered", "Rejected"), 
    defaultValue: "Applied" 
  },
  notes: { type: DataTypes.TEXT },
  attachment: { type: DataTypes.STRING } // store file path or URL
}, {
  timestamps: true
});

// Association: one user has many job applications
User.hasMany(jobApplication, { foreignKey: "userId", onDelete: "CASCADE" });
jobApplication.belongsTo(User, { foreignKey: "userId" });

module.exports = jobApplication;
