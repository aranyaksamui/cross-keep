// Import dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Connect to database
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("db connected");
    } catch (err) {
        console.log(err);
    }
};

// Exporting connect function
export default dbConnect;
