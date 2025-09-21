
// models/JobApplication.js
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const User = require("./User");
const Company = require("./Company");

const JobApplication = sequelize.define("JobApplication", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },

  // Keep companyName snapshot (for history / reporting)
  companyName: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  jobTitle: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  applicationDate: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },

  status: { 
    type: DataTypes.ENUM("Applied", "Interviewed", "Offered", "Rejected"), 
    defaultValue: "Applied" 
  },

  notes: { 
    type: DataTypes.TEXT 
  },

  attachment: { 
    type: DataTypes.STRING // file path or URL
  }
}, {
  timestamps: true
});

// Associations
User.hasMany(JobApplication, { foreignKey: "userId"});
JobApplication.belongsTo(User, { foreignKey: "userId" });

Company.hasMany(JobApplication, { foreignKey: "companyId" });
JobApplication.belongsTo(Company, { foreignKey: "companyId" });
// // Sequelize will automatically create `userId` and `companyId` columns
// User.hasMany(JobApplication, { foreignKey: "userId", onDelete: "CASCADE" });
// JobApplication.belongsTo(User, { foreignKey: "userId" });

// Company.hasMany(JobApplication, { foreignKey: "companyId", onDelete: "CASCADE" });
// JobApplication.belongsTo(Company, { foreignKey: "companyId" });

module.exports = JobApplication;
