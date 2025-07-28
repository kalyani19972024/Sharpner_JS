

const { Op } = require('sequelize');
const Company = require('../models/Company');
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const { companyName, pros, cons, rating } = req.body;
  try {
    const [company] = await Company.findOrCreate({
      where: { name: companyName }
    });
      const review = await Review.create({
      pros,
      cons,
      rating,
      CompanyId: company.id   
    });


    res.status(201).json(review);
  } catch (error) {
    console.error('Error in addReview:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByCompany = async (req, res) => {
  const { name } = req.query;
  console.log("****", name);
  
  try {
    const company = await Company.findOne({
      where: { name },
      include: [Review]
    });

    console.log("company ****", company);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const reviews = company.Reviews || [];

    console.log("Review &&&&", reviews);

    const avgRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
      : 0;

    console.log("avgRating ^^^^^^^", avgRating);

    res.json({ companyName: company.name, reviews, avgRating });

  } catch (error) {
    console.error('Error in getReviewsByCompany:', error);
    res.status(500).json({ error: error.message });
  }
};
