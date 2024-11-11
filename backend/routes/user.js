const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const router = express.Router();
const { getUserProfile, setUserProfile, handleEditProfile,userSignup,userSignin } = require("../controllers/user");
const { checkForAuthentication } = require("../middlewares/auth");
const { createHmac, randomBytes } = require("crypto");

router.get("/myProfile",checkForAuthentication,getUserProfile);
router.post("/edit",setUserProfile);


router.post("/signup", async (req,res) => {
    const {userId,fullName, email, password} = req.body;
    console.log(req.body);

    let userExist;
    try {
        userExist = await User.findOne({email:email});
    } catch (error) {
        console.log(error);
    }

    if(userExist)
    {
        return res.status(200).json({success:false, message:"user already exist"});
    }
  
    const result = await User.create({
        userId,
        fullName,
        email,
        password,
    });

    console.log("Created User ",result);

    return res.status(200).json({success:true, message:"user Signup Successfully"});

});

router.post("/signin", async (req,res) => {
    try{
        console.log("I am in the signin POST Request");
        
        const {email,password} = req.body;

        // console.log("Email and password");
        // console.log("email",email);
        // console.log("password",password);

        const token = await User.matchPasswordAndGenerateToken(email,password);
        // console.log(req.body);
        // console.log("token ",token);
        // return res.cookie("token",token).redirect("/");
        res.cookie('token',token,{
           domain: 'localhost',
           maxAge: 24 * 60 * 60 * 1000, 
        });

        return res.status(200).json({success:true, message:"user Signup Successfully"});
    }
    catch(err){
        return res.status(200).json({success:false, message:err.message});
    }
});

/* ------------------------------------------------------------------------------------ */

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/uploads/`); // Specify your upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file
    }
});

const upload = multer({ storage: storage });

// PUT request to update user information
router.post("/update", upload.single('profileImage'), async (req, res) => {
    try {
        const { userId } = req.query;
        const updateData = req.body;
        console.log("bODY",req.body.profileImageURL);
        // console.log(userId);
        // Find the user by ID and update fields
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only allowed fields
        if (updateData.fullName) user.fullName = updateData.fullName;
        if (updateData.email) user.email = updateData.email;
        if (updateData.phoneNumber) user.phoneNumber = updateData.phoneNumber;
        if (updateData.profileImageURL) user.profileImageURL = `/uploads/${req.file.filename}`;
        if (updateData.address) user.address = updateData.address;
        if (updateData.gender) user.gender = updateData.gender;
        if (updateData.role) user.role = updateData.role;

        // If password is being updated, hash the new password
        if (updateData.password) {
            const salt = randomBytes(16).toString("hex");
            const hashedPassword = createHmac("sha256", salt)
                .update(updateData.password)
                .digest("hex");

            user.password = hashedPassword;
            user.salt = salt;
        }

        // Save the updated user
        await user.save();
        console.log("Updated User ",user);
       return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
       return res.status(500).json({ message: "Error updating user", error: error.message });
    }
});

module.exports = router;