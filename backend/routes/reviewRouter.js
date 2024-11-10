const express = require('express');
const router = express.Router();
const ensureAdmin = require('../middlewares/ensureAdmin');
const {addReview,
  getAllReviewByTripId,
  deleteReviewById
} = require('../controllers/reviews');

// 1. Create a Review
router.post('/:tripId', addReview);

// 2. **Get All Reviews for a Trip**
router.get('/:tripId', getAllReviewByTripId);

router.delete('/:reviewId',ensureAdmin ,deleteReviewById);
  
module.exports = router;