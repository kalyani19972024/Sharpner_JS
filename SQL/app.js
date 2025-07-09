
const express = require('express');
const sequelize = require('./utils/db');
const User = require('./models/User');
const Bus = require('./models/Bus');

const app = express();
app.use(express.json());

// POST /users
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// POST /buses
app.post('/buses', async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /buses/available/:seats
app.get('/buses/available/:seats', async (req, res) => {
  const { seats } = req.params;
  const buses = await Bus.findAll({
    where: {
      availableSeats: {
        [require('sequelize').Op.gt]: parseInt(seats),
      },
    },
  });
  res.json(buses);
});

const PORT = 3200;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected and server running on port', PORT);
  } catch (err) {
    console.error('Failed to connect DB:', err);
  }
});
