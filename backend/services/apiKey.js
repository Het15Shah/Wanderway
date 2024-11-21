const { GoogleGenerativeAI } = require('@google/generative-ai');
const Activity = require('../models/activities');
const  config  = require('../config');
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generateResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.json();
  } catch (error) {
    return error;
  }
}

const destination = "Paris";
const activity = ['Effile Tower', 'Museum'];
generateResponse(`Create a custom itinerary for ${destination} which involves following activities ${activity}. Give day wise brief description with hotel stay and mode of transportation for each day and small description of activity as well. The trip should involve activities mentioned in ${activity} only, no other activities.
Response should be according to the following mongoose Schema:
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
`);

module.exports = {
  generateResponse,
};