const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/user");
// const upload = require("../middlewares/multerMiddleware");
const router = express.Router();
const { getUserProfile, setUserProfile, userUpdate,userSignIn,userSignUp } = require("../controllers/user");
const { checkForAuthentication } = require("../middlewares/auth");
const { createHmac, randomBytes } = require("crypto");

router.get("/myProfile",checkForAuthentication,getUserProfile);
router.post("/edit",setUserProfile);


router.post("/signup", userSignUp);

router.post("/signin", userSignIn);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Store in uploads folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Add unique timestamp to file
    },
  });

const upload = multer({ storage });

// PUT request to update user information
router.post("/update", upload.single('profileImage'), userUpdate);

module.exports = router;