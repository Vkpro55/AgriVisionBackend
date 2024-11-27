import { connect } from "mongoose";

export default async function connectDB() {
    const url = process.env.MONGO_URI;
    try {
        await connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB Connection Failed:", err.message);
        process.exit(1); // Exit process with failure
    }
}
