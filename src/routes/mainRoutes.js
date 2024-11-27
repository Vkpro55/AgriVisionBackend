import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from './userRoutes.js'
import { testSeriesController } from "../controllers/testSeriesController.js";

const mainRoutes = express.Router();

mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/user", userRoutes);
mainRoutes.get("/test-series", testSeriesController)

export default mainRoutes;
