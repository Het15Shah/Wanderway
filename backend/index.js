// Shree Ganeshay Namh

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoute = require("./routes/user");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const {checkForAuthentication} = require("./middlewares/auth");
const PORT = 8000;

const app = express();


// Connection
mongoose.connect("mongodb://localhost:27017/userprofile").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(checkForAuthentication('token'));
app.use(express.static(path.resolve("./public")));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// Set View-Engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=> {
    return res.render("home");
});
app.use("/user",userRoute);

app.listen(PORT,()=>{
    console.log("Server Started at PORT: ",PORT);
});