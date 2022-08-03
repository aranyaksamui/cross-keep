// Import mongoose
import mongoose from "mongoose";

// Connect to database
const dbConnect = async (URL) => {
    await mongoose.connect(URL);
};

// Exporting connect function
export default dbConnect;