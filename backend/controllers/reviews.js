
const Review = require('../model/review');
const Trip = require('../model/trip');
const User = require('../Clone Project/Wanderway/backend/models/user');


async function addReview (req, res){
    const { tripId } = req.params;
    const { userId, rating, comment } = req.body;
  
    try {
  
      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new review
      const review = new Review({
        trip: tripId,
        user: userId,  // Store the user's ID in the review
        rating,
        comment,
      });
  
      await review.save();
      res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

async function getAllReviewByTripId (req, res){
    const { tripId } = req.params;
  
    try {
      const reviews = await Review.find({ trip: tripId }).populate('user', 'name email');  // Populate user data (optional)
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

async function deleteReviewById(req, res){
    const { reviewId } = req.params;
  
    try {
      // Find and delete the review by ID
      const review = await Review.findByIdAndDelete(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

module.exports = {
    addReview,
    getAllReviewByTripId,
    deleteReviewById
}
