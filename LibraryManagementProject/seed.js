

const { Book, BorrowedBook, sequelize } = require('./model');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Ensure tables exist

    // First insert books so they can be referenced
    const books = await Book.bulkCreate([
      { BookName: 'JavaScript Mastery' },
      {  BookName: 'Node.js in Depth' },
      {  BookName: 'Learn SQL' }
    ]);

    // Create borrowed book records using those book IDs
    const now = new Date();
    const future = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours later

    await BorrowedBook.bulkCreate([
      {
        bookId: books[0].id,
        borrowDate: now,
        returnDate: future,
        currentFine: 0,
        isReturned: false
      },
      {
        bookId: books[1].id,
        borrowDate: now,
        returnDate: new Date(now.getTime() + 2 * 60 * 60 * 1000),
        currentFine: 0,
        isReturned: false
      },
      {
        bookId: books[2].id,
        borrowDate: now,
        returnDate: new Date(now.getTime() + 4 * 60 * 60 * 1000),
        currentFine: 0,
        isReturned: false
      }
    ]);

    console.log("Seeded borrowed books successfully.");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
