import express from "express";
import User from "../models/User.js";
import { body } from "express-validator";

import { signup, login } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup",
    [
        body("email")
            .isEmail().withMessage("Please enter a valid email")
            .normalizeEmail()
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    return Promise.reject("Email already in use");
                }
            }),
        body("password")
            .isLength({ min: 4 }).withMessage("Password must be at least 4 characters long")
            .matches(/[\@\$\*\^\&\%\#\!]/).withMessage("Password must contain at least one special character")
    ],

    signup
);
authRoutes.post("/login",
    [
        body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
        body("password").isLength({ min: 4 }).withMessage("Password must be at least 4 characters long")
    ],

    login);

export default authRoutes;
