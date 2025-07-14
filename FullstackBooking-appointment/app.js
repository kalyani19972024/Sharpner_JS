const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./utils/db');
const expenseRoutes = require('./router/expenseRoutes');

const app = express();


app.use(cors());


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', expenseRoutes);


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});


