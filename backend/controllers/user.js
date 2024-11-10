const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");

async function getUserProfile(req, res) {
    try {
        // console.log(req.cookies);
        
        const user = await User.findOne({email:req.user.email});
        
        if (!user) {
            return res.status(404).send("User not found");
        }
        // console.log('Hmm');
        
        return res.status(200).json({success:true, user});
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).send({success:false,message:"Internal Server Error"});
    }
}

async function setUserProfile(req, res) {
    try {
        // Extract data from the request body
        console.log(req.body);
        // res.status(200).json({success:true, message:"niece"});
        
        const { fullName, email, phoneNumber, address, gender, profileImageURL, role } = req.body;
        console.log("FullName",fullName);
        console.log("email",email);
        console.log("phoneNumber",phoneNumber);
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
        console.error("Error creating user profile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = {
    getUserProfile,
    setUserProfile,
    // handleEditProfile,
    // userSignup,
    // userSignin, 
};
