
// models/borrowedbook.js
module.exports = (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define("BorrowedBook", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    currentFine: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return BorrowedBook;
};

