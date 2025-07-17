
const express = require('express');
//const bodyParser = require('body-parser');
//const cors = require('cors');
const sequelize = require('./utils/db');
const reviewRoutes = require('./routes/reviewRoute');
const Review = require('./models/review');

const app = express();
//app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/reviews', reviewRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running at http://localhost:3000'));
});
