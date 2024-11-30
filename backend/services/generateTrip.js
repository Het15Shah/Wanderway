// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { response } = require("express");
// const config = require("../config");
// const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const Trip = require("../models/trip");

// async function generateResponse(prompt) {
//   // console.log(prompt);
//   try {
//     const result = await model.generateContent(prompt);
//     // console.log(result.response.text());
//     const jsonMatch = result.response.text().match(/```json([\s\S]*?)```/);
//     if (!jsonMatch || jsonMatch.length < 2) {
//       throw new Error("JSON block not found in the response.");
//     }

//     // Parse the JSON
//     const cleanJson = jsonMatch[1].trim();
//     let parsedResponse;
//     try {
//       parsedResponse = JSON.parse(cleanJson);
//       // console.log('Parsed Response ',parsedResponse)
//     } catch (parseError) {
//       // console.error('Failed to parse JSON:', parseError);
//       return;
//     }

//     // Create a new Trip instance with parsed response
//     const newTrip = await new Trip({
//       title: parsedResponse.title,
//       destination: parsedResponse.destination,
//       startDate: parsedResponse.startDate,
//       endDate: parsedResponse.endDate,
//       itinerary: parsedResponse.itinerary,
//       budget: parsedResponse.budget,
//       highlights: parsedResponse.highlights,
//       includedServices: parsedResponse.includedServices,
//       imageURL: parsedResponse?.imageURL,
//       created_at: parsedResponse.created_at || new Date(),
//     });

//     // Save to the database
//     await newTrip.save();
//     // console.log('New trip saved to database:', newTrip);
//     return newTrip;
//   } catch (error) {
//     console.error("Error generating content:", error);
//     return;
//   }
// }

// const destination = "Paris";
// const activity = ["Effile Tower", "Muesum"];
// module.exports = { generateResponse };

    // const Groq = require("groq-sdk");
    // const Trip = require("../models/trip");

    // const groq = new Groq(); // Initialize Groq client

    // async function generateResponse(prompt) {
    //   try {
    //     // Use Groq API to generate a response
    //     const chatCompletion = await groq.chat.completions.create({
    //       messages: [
    //         { role: "system", content: "You are an assistant that generates JSON responses strictly according to the given schema." },
    //         { role: "user", content: `${prompt}\nEnsure the output is wrapped in \`\`\`json ... \`\`\` for correct parsing.` },
    //       ],
    //       model: "llama3-8b-8192", // Replace with the desired Groq model
    //       temperature: 1,
    //       max_tokens: 1024,
    //       top_p: 1,
    //       stream: false,
    //     });

    //     const responseContent = chatCompletion.choices[0]?.message?.content;
    //     const jsonMatch = responseContent.match(/```json([\s\S]*?)```/);
    //     if (!jsonMatch || jsonMatch.length < 2) {
    //       throw new Error("JSON block not found in the response.");
    //     }

    //     // Parse the JSON
    //     const cleanJson = jsonMatch[1].trim();
    //     let parsedResponse;
    //     try {
    //       parsedResponse = JSON.parse(cleanJson);
    //     } catch (parseError) {
    //       console.error("Failed to parse JSON:", parseError);
    //       return;
    //     }

    //     // Create a new Trip instance with parsed response
    //     const newTrip = await new Trip({
    //       title: parsedResponse.title,
    //       destination: parsedResponse.destination,
    //       startDate: parsedResponse.startDate,
    //       endDate: parsedResponse.endDate,
    //       itinerary: parsedResponse.itinerary,
    //       budget: parsedResponse.budget,
    //       highlights: parsedResponse.highlights,
    //       includedServices: parsedResponse.includedServices,
    //       imageURL: parsedResponse?.imageURL,
    //       created_at: parsedResponse.created_at || new Date(),
    //     });

    //     // Save to the database
    //     await newTrip.save();
    //     return newTrip;
    //   } catch (error) {
    //     console.error("Error generating content:", error);
    //     return;
    //   }
    // }

    // const destination = "Paris";
    // const activity = ["Effile Tower", "Museum"];
    // module.exports = { generateResponse };


//     const Groq = require("groq-sdk");
// const Trip = require("../models/trip");

// const groq = new Groq();

// async function generateResponse(prompt) {
//   try {
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "You are an assistant that generates JSON responses strictly according to the given schema." },
//         { role: "user", content: `${prompt}\nEnsure the output is wrapped in \`\`\`json ... \`\`\` for correct parsing.` },
//       ],
//       model: "llama3-8b-8192",
//       temperature: 1,
//       max_tokens: 1024,
//       top_p: 1,
//       stream: false,
//     });

//     const responseContent = chatCompletion.choices[0]?.message?.content;
//     if (!responseContent) {
//       console.error("Empty response content.");
//       throw new Error("Groq response is empty.");
//     }
//     console.log("Response content:", responseContent);
//     // Extract JSON block
//     const jsonMatch = responseContent.match(/```json([\s\S]*?)```/);
//     if (!jsonMatch || jsonMatch.length < 2) {
//       console.error("JSON block not found:", responseContent);
//       throw new Error("JSON block not found in the response.");
//     }

//     // Parse JSON
//     const parsedResponse = JSON.parse(jsonMatch[1].trim());
//     const newTrip = new Trip({
//       title: parsedResponse.title,
//       destination: parsedResponse.destination,
//       startDate: parsedResponse.startDate,
//       endDate: parsedResponse.endDate,
//       itinerary: parsedResponse.itinerary,
//       budget: parsedResponse.budget,
//       highlights: parsedResponse.highlights,
//       includedServices: parsedResponse.includedServices,
//       imageURL: parsedResponse?.imageURL,
//       created_at: parsedResponse.created_at || new Date(),
//     });

//     await newTrip.save();
//     return newTrip;
//   } catch (error) {
//     console.error("Error generating content:", error);
//     throw new Error("Failed to generate trip.");
//   }
// }

// module.exports = { generateResponse };


const Groq = require("groq-sdk");
const Trip = require("../models/trip");

const groq = new Groq();

async function generateResponse(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an assistant that generates responses strictly according to a given schema." },
        { role: "user", content: prompt },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const responseContent = chatCompletion?.choices?.[0]?.message?.content;
    if (!responseContent) {
      throw new Error("Groq response is empty or invalid.");
    }

    // Add manual enforcement for JSON block extraction
    const jsonStartIndex = responseContent.indexOf("{");
    const jsonEndIndex = responseContent.lastIndexOf("}");
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Valid JSON block not found in the response.");
    }

    const jsonString = responseContent.substring(jsonStartIndex, jsonEndIndex + 1);

    // Parse JSON
    const parsedResponse = JSON.parse(jsonString);

    // Ensure required fields are present in the parsed JSON
    if (!parsedResponse.title || !parsedResponse.destination || !parsedResponse.startDate || !parsedResponse.endDate || !parsedResponse.budget) {
      throw new Error("Parsed response is missing required fields.");
    }

    const newTrip = new Trip({
      title: parsedResponse.title,
      destination: parsedResponse.destination,
      startDate: parsedResponse.startDate,
      endDate: parsedResponse.endDate,
      itinerary: parsedResponse.itinerary || [],
      budget: parsedResponse.budget,
      highlights: parsedResponse.highlights || [],
      includedServices: parsedResponse.includedServices || [],
      imageURL: parsedResponse.imageURL || "",
      created_at: parsedResponse.created_at || new Date(),
    });

    await newTrip.save();
    return newTrip;
  } catch (error) {
    console.error("Error generating content:", error.message);
    throw new Error("Failed to generate trip. Details: " + error.message);
  }
}

module.exports = { generateResponse };
