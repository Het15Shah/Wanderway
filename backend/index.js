// Shree Ganeshay Namh

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/user");
const tripRouter = require("./routes/tripRouter");
const reviewRouter = require("./routes/reviewRouter");
const config = require("./config");
const bodyParser = require("body-parser");

const customTripRouter = require("./routes/customTrip");
const searchTripRouter = require("./routes/searchTrip");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const myTripRouter = require("./routes/myTripRoute");

const { checkForAuthentication } = require("./middlewares/auth");
const PORT = 8000;

const app = express();
// app.use(
//   cors({
//     origin: config.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: config.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["content-type", "authorization", "token"],
//     credentials: true,
//   })
// );

// app.options("*", cors({ origin: config.FRONTEND_URL }));

const corsOptions = {
  origin: "*", // Your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "Token"], // Allowed headers
  // credentials: true, // Allow cookies/authentication
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "https://wanderways-travel.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Token");
    return res.status(200).json({});
  }
  next();
});


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// Connection
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// app.use(checkForAuthentication('token'));
app.use(express.static(path.resolve("./public")));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({extended: true}));

// Router Specification

app.use("/api/user", userRoute);
app.use("/api/trip", tripRouter);
app.use("/api/review", reviewRouter);
app.use("/api/myTrip", myTripRouter);
app.use("/api/customTrip", customTripRouter);
app.use("/api/searchTrip", searchTripRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Logout Functionality

app.get("/api/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(201).json({ success: true });
});
app.listen(PORT, () => {
  console.log("Server Started at PORT: ", PORT);
});
