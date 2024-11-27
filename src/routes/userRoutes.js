import express from "express";
import { userProfileController } from "../controllers/userController.js";
import verifyToken from '../middleware/verifyToken.js'

const userRoutes = express.Router();

// POST /user/profile (fetch user profile details)
userRoutes.get("/profile", verifyToken, userProfileController);

export default userRoutes;
