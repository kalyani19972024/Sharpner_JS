
// models/book.js
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    BookName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Book;
};
