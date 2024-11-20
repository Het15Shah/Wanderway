const express = require("express");
const router = express.Router();
const {
  addReview,
  getAllReview,
  deleteReviewById,
} = require("../controllers/reviews");
const { checkForAuthentication } = require("../middlewares/auth");
const ensureAdmin = require("../middlewares/ensureAdmin");

// 1. Create a Review
router.post("/", checkForAuthentication, addReview);

// 2. Get All Reviews for a Trip
router.get("/", getAllReview);

// 3. Delete a Review by ID
router.post("/delete/:reviewId", ensureAdmin, deleteReviewById);

module.exports = router;
