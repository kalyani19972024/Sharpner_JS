
const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./router/userRoutes');
const sequelize = require('./utils/db');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve form at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

// Mount user routes
app.use('/users', userRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('connected to DB.');

    app.listen(3600, () => {
      console.log('server is running on port 3600.');
    });
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
})();
