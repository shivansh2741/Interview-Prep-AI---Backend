// import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

//generate JWT token
export const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7h" });
    return token;
}


// /auth/register
// @access public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if user already exists
        const userExists = await User.findOne( {email} );
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        res.status(201).json({
            _id: user._id,
            name: (await user).name,
            email: (await user).email,
            profileImageUrl,
            token: generateToken(user._id)
        })
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

// /auth/login
// @access public
export const loginUser = async (req, res) => {
    try {
        const {  email, password } = req.body;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message: "This username does not exist"});
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Wrong Password"});
        }

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl,
            token: generateToken(user._id)
        })
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

// /auth/profile
// @access private
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}
