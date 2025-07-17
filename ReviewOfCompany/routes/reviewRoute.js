
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewcontroller');

router.post('/add', reviewController.addReview);
router.get('/search', reviewController.getReviewsByCompany);

module.exports = router;
