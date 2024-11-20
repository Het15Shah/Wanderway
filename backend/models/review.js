
const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,  // Minimum rating is 1
    max: 5,  // Maximum rating is 5
  },
  comment: {
    type: String,
    required: false,
    maxlength: 500,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
