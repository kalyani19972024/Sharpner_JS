const express = require('express');
const app = express();
const sequelize = require('./utils/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const expenseRoutes = require('./routes/expenseRoute');
const authRoutes = require('./routes/authRoute');
const purchaseRoutes = require('./routes/purchaseRoute');
const premiumRoutes = require('./routes/premiumRoute');
const User = require('./models/User');
const Expense = require('./models/Expense');
const Order = require('./models/Order');
require('dotenv').config();


app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));


// API routes
app.use('/api/user', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api', authRoutes);
// app.use('/api/purchase', purchaseRoutes);
app.use('/api/premium', premiumRoutes);


// Apply associations BEFORE syncing
User.hasMany(Expense);
Expense.belongsTo(User);

// associations
User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync({alter:true}).then(() => {
  app.listen(3600, () => {
    console.log('Server is running on http://localhost:3600');
  });
}).catch(err => {
  console.error(' Database sync failed:', err);
});
