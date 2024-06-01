// Import dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === "production" ? "../.env.production" : "../.env.development" });

// Connect to the database
const dbConnect = () => {
    console.log(process.env.DATABASE_URL)
    mongoose.connect(process.env.DATABASE_URL).catch((err) => console.log(err));
    console.log("db connected");
};

// Exporting connect function
export default dbConnect;
