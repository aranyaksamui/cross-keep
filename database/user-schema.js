// Importing mongoose
import mongoose from "mongoose";
import { notesSchema } from "./note-schema.js";

// Creating schema
const userSchema = mongoose.Schema(
    {
        first_name: {
            required: true,
            type: String
        },
        last_name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        },
        password: {
            required: true,
            type: String
        },
        notes: [notesSchema],
    }
)

export const User = mongoose.model("User", userSchema);

