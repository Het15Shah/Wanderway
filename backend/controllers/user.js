const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const uploadOnCloudinary = require("../utils/cloudinary");
const { randomBytes, createHmac } = require("crypto");

async function userSignUp (req,res) {
    const {userId,fullName, email, password} = req.body;
    // console.log(req.body);

    let userExist;
    try {
        userExist = await User.findOne({email:email});
    } catch (error) {
        console.log(error);
    }

    if(userExist)
    {
        return res.status(200).json({success:false, message:"User already exist"});
    }
  
    const result = await User.create({
        userId,
        fullName,
        email,
        password,
    });

    // console.log("Created User ",result);

    return res.status(200).json({success:true, message:"User Signed up Successfully"});
}

async function userUpdate (req, res)  {
    try {
        const { userId } = req.query;
        const updateData = req.body;
        // console.log("file: ", req.file);
        // console.log("body: ", req.body);
        // console.log("body",req.file.profileImageURL);
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
        
        if (req.file){
            // console.log("I am in Image Upload Section");
            user.profileImageURL = `/uploads/${req.file.filename}`;
            // cloudinary.uploader.upload(req.file.path,(err,res) => {
            //     if(err){
            //         console.log("This is error ",err);
            //         return res.status(500).json({ success: false, message: "Error"});
            //     }
            // });
            user.profileImageURL = await uploadOnCloudinary(user.profileImageURL);
        }
        
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
        // console.log("Updated User",user);
        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Error updating user", error: error.message });
    }
}

async function userSignIn (req,res)  {
    try{        
        const {email,password} = req.body;

        if (email == undefined){
            return res.status(400).json({success: false, message: "email cannot be missing"});
        }

        if (password == undefined){
            return res.status(400).json({success: false, message: "password cannot be missing"});
        }

        // console.log("Email and password");
        // console.log("email",email);
        // console.log("password",password);

        const token = await User.matchPasswordAndGenerateToken(email,password);
        // console.log(req.body);
        // console.log("token ",token);
        // return res.cookie("token",token).redirect("/");
        res.cookie('token',token,{
           httpOnly: true,
           sameSite: 'strict',
           maxAge: 24 * 60 * 60 * 1000, 
        });

        return res.status(200).json({success:true, message:"User Signed In Successfully"});
    }
    catch(err){
        return res.status(200).json({success:false, message:err.message});
    }
}

async function getUserProfile(req, res) {
    try {
        // console.log(req.cookies);
        
        const user = await User.findOne({email:req.user.email});
        
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        return res.status(200).json({success:true, user});
    } catch (error) {
        // console.error("Error fetching user profile:", error);
        return res.status(500).send({success:false,message:"Internal Server Error"});
    }
}

async function setUserProfile(req, res) {
    try {
        // Extract data from the request body
        // console.log(req.body);
        // res.status(200).json({success:true, message:"niece"});
        
        const { fullName, email, phoneNumber, address, gender, profileImageURL, role } = req.body;
        // console.log("FullName",fullName);
        // console.log("email",email);
        // console.log("phoneNumber",phoneNumber);
        // Validate if required fields are present
        if (!fullName || !email || !phoneNumber) {
            return res.status(400).json({ message: "Full Name, Email, and Phone Number are required" });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        // Create a new user
        const newUser = new User({
            userId: new mongoose.Types.ObjectId(),  // Automatically generate a userId
            fullName,
            email,
            phoneNumber,
            address,
            gender,
            profileImageURL: profileImageURL || "/images/User-Avatar-in-Suit-PNG.png",  // Default image if none provided
            role: role || "USER",  // Default role if none provided
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with the created user
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // console.error("Error creating user profile:", error);
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = {
    getUserProfile,
    setUserProfile,
    userSignIn,
    userSignUp,
    userUpdate
};
