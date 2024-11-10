const express = require("express");
const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/auth");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    phoneNumber: {
        type: String,
        // required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/User-Avatar-in-Suit-PNG.png"
    },
    role: {
        type: String,
        enum: ['USER','ADMIN'],
        default: "USER",
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
                           .update(this.password)
                           .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

// Static method to match password and generate token
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found!");

    // Hash the provided password with the stored salt
    const userProvidedPassword = createHmac('sha256', user.salt)
                                 .update(password)
                                 .digest("hex");

    if (user.password !== userProvidedPassword) throw new Error("Incorrect Password!");
    
    const token = createTokenForUser(user); // Create token
    return token;
});

const User = mongoose.model("User", userSchema);
module.exports = User;