const mongoose = require('mongoose')
const activitySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['adventure', 'sightseeing', 'relaxation', 'cultural', 'historical'],
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number, // Duration in hours
    },
    cost: {
      type: Number, // Cost in preferred currency
    },
    location: {
      type: String, // Specific location within the destination
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination', // Reference to the destination where this activity is available
      required: true,
    },
  });
  
  const Activity = mongoose.model('Activity', activitySchema);
  module.exports = Activity;
  