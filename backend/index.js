// Shree Ganeshay Namh

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/user");
const tripRouter = require("./routes/tripRouter");
const reviewRouter = require("./routes/reviewRouter");
<<<<<<< HEAD
const bodyParser = require("body-parser");
=======
const customTripRouter = require("./routes/customTrip")
const searchTripRouter = require("./routes/searchTrip")
const bodyParser = require('body-parser');
>>>>>>> 65b1a9d3f3e4576679ae89b08cf60b44db469f76
const cookieParser = require("cookie-parser");
const cors = require("cors");
const myTripRouter = require("./routes/myTripRoute");


const { checkForAuthentication } = require("./middlewares/auth");
const PORT = 8000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connection
mongoose
  .connect(
    "mongodb+srv://shahhet525:UWvWpIIhwWWslp0S@cluster0.ex1lr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
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
// app.use(express.json());

// Router Specification
<<<<<<< HEAD
app.use("/api/user", userRoute);
app.use("/api/trip", tripRouter);
app.use("/api/review", reviewRouter);
app.use("/api/myTrip", myTripRouter);
// app.use("/api/customtrip", customtripRouter);
=======
app.use("/api/user",userRoute);
app.use("/api/trip",tripRouter);
app.use("/api/review",reviewRouter);
app.use("/api/myTrip",myTripRouter);
app.use("/api/customTrip",customTripRouter)
app.use("/api/searchTrip" , searchTripRouter)
>>>>>>> 65b1a9d3f3e4576679ae89b08cf60b44db469f76

app.listen(PORT, () => {
  console.log("Server Started at PORT: ", PORT);
});
