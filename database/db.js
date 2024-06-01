// Import dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Connect to the database
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL).catch((err) => console.log(err));
    console.log("db connected");
};

// Exporting connect function
export default dbConnect;
