
const express = require('express');
const router = express.Router();
const Trip = require('../model/trip');
const ensureAdmin = require('../middleware/ensureAdmin')

const {addNewTrip,
  searchTrip,
  deleteTripById,
  getAllTrip,
  getTripById} = require('../controller/router')
// Create a new trip
router.post('/',ensureAdmin ,addNewTrip);

// Get all trips
router.get('/', getAllTrip);


// Get a specific trip by ID
router.get('/:id', getTripById);


router.get('/', searchTrip);


// Delete a trip by ID
router.delete('/:id', ensureAdmin ,deleteTripById);


module.exports = router;

