const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  country: {
    type: String,
  },
//   recommendedDuration: {
//     type: Number, // Suggested stay duration in days
//   },
  highlights: [String], // Highlights specific to this destination
  imageURL: {
    type: String,
  },
});


const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
