const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");
const ensureAdmin = require("../middlewares/ensureAdmin");

const {
  addNewTrip,
  deleteTripById,
  getAllTrip,
  getTripById,
} = require("../controllers/trip");
// Create a new trip (Only Admin Will Be Able to Add New Trips)
router.post("/", addNewTrip);

// Get all trips
router.get("/", getAllTrip);

// Get a specific trip by ID
router.get("/:id", getTripById);

// Delete a trip by ID
router.delete("/:id", ensureAdmin, deleteTripById);

module.exports = router;
