// models/Note.js
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const JobApplication = require("./jobApplication");

const Note = sequelize.define("Note", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Associations
JobApplication.hasMany(Note, { foreignKey: "jobApplicationId", onDelete: "CASCADE" });
Note.belongsTo(JobApplication, { foreignKey: "jobApplicationId" });

module.exports = Note;
