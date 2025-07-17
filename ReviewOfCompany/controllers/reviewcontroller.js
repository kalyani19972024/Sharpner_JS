
const Review = require('../models/review');
const { Op } = require('sequelize');

exports.addReview = async (req, res) => {
  const { companyName, pros, cons, rating } = req.body;
  try {
    const review = await Review.create({ companyName, pros, cons, rating });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByCompany = async (req, res) => {
  const { name } = req.query;
  try {
    const reviews = await Review.findAll({
      where: {
        companyName: {
          [Op.like]: `%${name}%`
        }
      }
    });

    const avgRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
      : 0;

    res.json({ reviews, avgRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
