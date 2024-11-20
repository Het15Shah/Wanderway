const Review = require("../models/review");
const Trip = require("../models/trip");
const User = require("../models/user");

async function addReview(req, res) {
  // console.log("asfd");
  const { rating, comment } = req.body;
  // console.log(req.body);
  const userId = req.user._id; // Get the user ID from the request
  try {
    // Fetch trip from Trip database by Id

    // Fetch user from
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new review
    const review = new Review({
      user: userId, // Store the user's ID in the review
      rating,
      comment,
    });

    await review.save();
    // console.log(`review`, review);
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    // console.log("error", error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllReview(req, res) {
  try {
    const reviews = await Review.find({}).populate("user", "fullName email"); // Populate user data (optional)
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteReviewById(req, res) {
  const { reviewId } = req.params;

  try {
    // Find and delete the review by ID
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addReview,
  getAllReview,
  deleteReviewById,
};
