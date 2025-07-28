// app.js ✅
const express = require('express');
const cors = require('cors');
const app = express();

const sequelize = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);       // ✅ correct
app.use('/api/expenses', expenseRoutes); // ✅ correct

sequelize.sync().then(() => {
  app.listen(3500, () => console.log('Server running on http://localhost:3500'));
});
