import express from "express";
import path from 'path';
import dotenv from "dotenv";
import cors from 'cors';
import { fileURLToPath } from 'url';
import connectDB from "./db/connection.js";
import mainRoute from './routes/mainRoutes.js'


// import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: "http://localhost:5173",  // Allow frontend to make requests from localhost:3001 (adjust if your frontend runs on a different port)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // Allows credentials (cookies, authorization headers, etc.) to be sent
}));

// Middleware
app.use(express.json());

// MongoDB Connection
connectDB()
const PORT = process.env.PORT || 3000;



// Routes
app.use("/api", mainRoute);


app.listen(PORT, () => {
    console.log(`Server Start on ${PORT}...`)
})
