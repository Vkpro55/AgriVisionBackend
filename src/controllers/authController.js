import { validationResult } from "express-validator";
import User from '../models/User.js'

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Signup
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Extract only the messages
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }

    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ errors: ["Email already in use"] });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Extract only the messages
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ errors: ["Invalid email or password"] });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ errors: ["Invalid email or password"] });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
