const express = require("express");
const { generateResponse } = require("../services/generateTrip");
const router = express.Router();

router.post("/", async (req, res) => {
  const { destination, activities, budget } = req.body;
  console.log("Destination ", destination);
  console.log("Activities ", activities);
  console.log("Budget ", budget);

  const prompt = `Create  a ${budget} custom itinary for ${destination} which involves follwing activities ${activities}. Give day wise brief description with hotel stay and mode of transportation for each day and small description of activities as well. The trip should involve activities mentioned in ${activities} only, no other activities,
Response shoule be according to following mongoose Schema 
const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  itinerary: [
    {
      day: Number,
      modeOfTransportation: {
        type: String,
        enum: ['car', 'bus', 'train', 'plane', 'boat', 'walking', 'other'],
        required: true,
      },
      hotel: {
        name: String,
        location: String,
      },
      activities: [
        {
          time: String,
          description: String,
          location: String,
        },
      ],
    },
  ],
  budget: {
    type: Number,
    required: true,
  },
  highlights: {
    type: [String], // Array of strings for highlights
  },
  includedServices: {
    type: [String], // Array of strings for services included
  },
  imageURL: {
    type: String, // URL string to store an image link
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
An return respone in json format
Ensure that if trip is cheap budget should not be greater than $2000, for affordbale it should be in between $2000 to $4000, expensive should be witin $10000 
`;
  const trip = await generateResponse(prompt);
  return res.status(200).json({ success: true, trip: trip });
});

module.exports = router;
