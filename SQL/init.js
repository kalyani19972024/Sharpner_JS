
const sequelize = require('./utils/db');
const User = require('./models/User');
const Bus = require('./models/Bus');

(async () => {
  try {
    await sequelize.sync({ force: true });

    // await User.bulkCreate([
    //   { name: 'Alice', email: 'alice@example.com', age: 25 },
    //   { name: 'Bob', email: 'bob@example.com', age: 30 },
    //   { name: 'Charlie', email: 'charlie@example.com', age: 28 },
    // ]);

    // await Bus.bulkCreate([
    //   { busNumber: 'MH12AB1234', route: 'Mumbai-Pune', availableSeats: 15 },
    //   { busNumber: 'DL8CAF4321', route: 'Delhi-Agra', availableSeats: 8 },
    // ]);

    console.log('Sample data inserted!');
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
})();
