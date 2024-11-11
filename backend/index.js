// Shree Ganeshay Namh

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/user");
const tripRouter = require("./routes/tripRouter");
const reviewRouter = require("./routes/reviewRouter");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const myTripRouter = require("./routes/myTripRoute");

const {checkForAuthentication} = require("./middlewares/auth");
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
mongoose.connect("mongodb+srv://shahhet525:UWvWpIIhwWWslp0S@cluster0.ex1lr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
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
app.use("/api/user",userRoute);
app.use("/api/trip",tripRouter);
app.use("/api/review",reviewRouter);
app.use("/api/myTrip",myTripRouter);

app.listen(PORT,()=>{
    console.log("Server Started at PORT: ",PORT);
});