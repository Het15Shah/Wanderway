const { GoogleGenerativeAI } = require("@google/generative-ai");
const Activity = require("../models/activities");
const config = require("../config");
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.json();
  } catch (error) {
    return error;
  }
}

const destination = "Paris";
const activity = ["Effile Tower", "Museum"];
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

// const Groq = require("groq-sdk");
// const Activity = require("../models/activities");
// const config = require("../config");

// // Initialize Groq SDK with your API key
// const groq = new Groq({
//   apiKey: config.GROQ_API_KEY, // Pass Groq API key
// });

// async function generateResponse(prompt) {
//   try {
//     // Send a request to Groq's API for chat completions
//     const chatCompletion = await groq.chat.completions.create({
//       "messages": [{ "role": "user", "content": prompt }],
//       "model": "llama3-8b-8192",  // Replace with appropriate Groq model
//       "temperature": 1,
//       "max_tokens": 1024,
//       "top_p": 1,
//       "stream": false,
//       "stop": null,
//     });

//     // Assuming the response contains chat choices (similar to OpenAI)
//     const responseContent = chatCompletion.choices[0]?.message?.content;

//     if (!responseContent) {
//       throw new Error('No content returned in the response.');
//     }

//     // Extract the JSON content enclosed in ```json .... ``` blocks
//     const jsonMatch = responseContent.match(/```json([\s\S]*?)```/);
//     if (!jsonMatch || jsonMatch.length < 2) {
//       throw new Error('JSON block not found in the response.');
//     }

//     // Clean and parse the JSON block
//     const cleanJson = jsonMatch[1].trim();
//     let parsedResponse;
//     try {
//       parsedResponse = JSON.parse(cleanJson);
//     } catch (parseError) {
//       console.error('Failed to parse JSON:', parseError);
//       return;
//     }

//     // Create a new Activity instance based on parsed response
//     const newTrip = new Activity({
//       title: parsedResponse.title,
//       destination: parsedResponse.destination,
//       startDate: parsedResponse.startDate,
//       endDate: parsedResponse.endDate,
//       itinerary: parsedResponse.itinerary.map((day) => ({
//         day: day.day,
//         modeOfTransportation: day.modeOfTransportation,
//         hotel: day.hotel,
//         activities: day.activities,
//       })),
//       budget: parsedResponse.budget,
//       highlights: parsedResponse.highlights,
//       includedServices: parsedResponse.includedServices,
//       imageURL: parsedResponse?.imageURL,
//       created_at: parsedResponse.created_at || new Date(),
//     });

//     // Save the trip to the database
//     await newTrip.save();
//     console.log("New trip saved to database:", newTrip);
//     return newTrip;

//   } catch (error) {
//     console.error('Error generating content:', error);
//     return null;
//   }
// }

// // Example usage
// const destination = "Paris";
// const activity = ["Eiffel Tower", "Museum"];
// generateResponse(`Create a custom itinerary for ${destination} which involves following activities ${activity}. Give day wise brief description with hotel stay and mode of transportation for each day and small description of activity as well. The trip should involve activities mentioned in ${activity} only, no other activities. Response should be according to the following mongoose Schema:
// const tripSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   destination: {
//     type: String,
//     required: true,
//   },
//   startDate: {
//     type: Date,
//     required: true,
//   },
//   endDate: {
//     type: Date,
//     required: true,
//   },
//   itinerary: [
//     {
//       day: Number,
//       modeOfTransportation: {
//         type: String,
//         enum: ['car', 'bus', 'train', 'plane', 'boat', 'walking', 'other'],
//         required: true,
//       },
//       hotel: {
//         name: String,
//         location: String,
//       },
//       activities: [
//         {
//           time: String,
//           description: String,
//           location: String,
//         },
//       ],
//     },
//   ],
//   budget: {
//     type: Number,
//     required: true,
//   },
//   highlights: {
//     type: [String], // Array of strings for highlights
//   },
//   includedServices: {
//     type: [String], // Array of strings for services included
//   },
//   imageURL: {
//     type: String, // URL string to store an image link
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
// });`);

// module.exports = {
//   generateResponse,
// };
