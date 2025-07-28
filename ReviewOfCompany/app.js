

const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db');
const reviewRoutes = require('./routes/reviewRoute');

const Company = require('./models/Company');
const Review = require('./models/Review');




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/reviews', reviewRoutes);

sequelize.sync({ force:true }).then(() => {
  app.listen(3200, () => console.log('Server running on http://localhost:3200'));
});
