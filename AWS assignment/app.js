const express = require('express');
const app = express();
const sequelize = require('./utils/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const expenseRoutes = require('./routes/expenseRoute');

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API routes
app.use('/api', userRoutes);
app.use('/api/expenses', expenseRoutes);

sequelize.sync().then(() => {
  app.listen(3400, () => {
    console.log('Server is running on http://localhost:3400');
  });
}).catch(err => {
  console.error(' Database sync failed:', err);
});
