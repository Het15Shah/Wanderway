require("dotenv").config();

const config = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

module.exports = config;
