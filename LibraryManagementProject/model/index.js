
// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

// Initialize models using factory functions
const Book = require("./book")(sequelize, DataTypes);
const BorrowedBook = require("./borrowedbook")(sequelize, DataTypes);

// Set up associations
Book.hasMany(BorrowedBook);
BorrowedBook.belongsTo(Book);

// Export everything
module.exports = { Book, BorrowedBook, sequelize };
