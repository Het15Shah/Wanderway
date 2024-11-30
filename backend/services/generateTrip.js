const { GoogleGenerativeAI } = require('@google/generative-ai');
const { response } = require('express');
const config = require('../config');
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const Trip = require('../models/trip');


async function generateResponse(prompt) {
    // console.log(prompt);
    try {
      const result = await model.generateContent(prompt);
      // console.log(result.response.text());
      const jsonMatch = result.response.text().match(/```json([\s\S]*?)```/);
        if (!jsonMatch || jsonMatch.length < 2) {
            throw new Error('JSON block not found in the response.');
        }

        // Parse the JSON
        const cleanJson = jsonMatch[1].trim();
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(cleanJson);
            // console.log('Parsed Response ',parsedResponse)
        } catch (parseError) {
            // console.error('Failed to parse JSON:', parseError);
            return;
        }

        // Create a new Trip instance with parsed response
        const newTrip = await new Trip({
          title: parsedResponse.title,
          destination: parsedResponse.destination,
          startDate: parsedResponse.startDate,
          endDate: parsedResponse.endDate,
          itinerary: parsedResponse.itinerary,
          budget: parsedResponse.budget,
          highlights: parsedResponse.highlights,
          includedServices: parsedResponse.includedServices,
          imageURL: parsedResponse?.imageURL,
          created_at: parsedResponse.created_at || new Date()
      });

      // Save to the database
      await newTrip.save();
      // console.log('New trip saved to database:', newTrip);
        return newTrip


    } catch (error) {
      console.error('Error generating content:', error);
      return;
    }
  }
  
const destination = "Paris";
const activity = ['Effile Tower','Muesum']
module.exports = {generateResponse}

// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const mongoose = require('mongoose');
// const Trip = require('../models/trip');  // Assuming your Trip schema is defined here
  // Replace with actual API key
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// async function generateResponseAndSaveToDB(prompt) {
//     // console.log('Prompt:', prompt);
//     try {
//         // Generate content from the model
//         const result = await model.generateContent(prompt);

//         // Extract the response text
//         const responseText = result.response.text();
//         console.log('Raw Response:', responseText);

//         // Parse the response as JSON
//         let parsedResponse;
//         try {
//             parsedResponse = JSON.parse(responseText);
//         } catch (parseError) {
//             console.error('Response is not in JSON format:', parseError);
//             return;
//         }

//         // Create a new Trip instance with parsed response
//         const newTrip = new Trip({
//             title: parsedResponse.title,
//             destination: parsedResponse.destination,
//             startDate: parsedResponse.startDate,
//             endDate: parsedResponse.endDate,
//             itinerary: parsedResponse.itinerary,
//             budget: parsedResponse.budget,
//             highlights: parsedResponse.highlights,
//             includedServices: parsedResponse.includedServices,
//             imageURL: parsedResponse.imageURL,
//             created_at: parsedResponse.created_at || new Date()
//         });

//         // Save to the database
//         await newTrip.save();
//         console.log('New trip saved to database:', newTrip);

//     } catch (error) {
//         console.error('Error generating content or saving to DB:', error);
//     }
// }

// // Example usage
// const destination = "Paris";
// const activities = ['Eiffel Tower', 'Museum'];

// // Updated prompt with JSON structure
// generateResponseAndSaveToDB(`
// Create a custom itinerary for ${destination} that includes only the following activities: ${activities.join(", ")}. 
// For each day, provide a brief description, including hotel stay, mode of transportation, and details of each activity. 
// Format the output in JSON according to the following schema:
// {
//   "title": "string",
//   "destination": "string",
//   "startDate": "Date",
//   "endDate": "Date",
//   "itinerary": [
//     {
//       "day": "number",
//       "modeOfTransportation": "string",
//       "hotel": {
//         "name": "string",
//         "location": "string"
//       },
//       "activities": [
//         {
//           "time": "string",
//           "description": "string",
//           "location": "string"
//         }
//       ]
//     }
//   ],
//   "budget": "number",
//   "highlights": ["string"],
//   "includedServices": ["string"],
//   "imageURL": "string",
//   "created_at": "Date"
// }.`);
