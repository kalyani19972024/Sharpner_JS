const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const JobListing = sequelize.define("JobListing", {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Saved"
  }
});

module.exports = JobListing;
