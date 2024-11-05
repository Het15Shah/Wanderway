require("dotenv").config();

const config = {
  PORT: process.env.PORT || 8000,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  MONGO_URL: process.env.MONGO_URL || "",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "",
};

module.exports = config;
