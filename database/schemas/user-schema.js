// Importing mongoose
import mongoose from "mongoose";
import { notesSchema } from "./note-schema.js";
import passportLocalMongoose from "passport-local-mongoose";

// Creating schema
const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        notes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
        }],
    }
)

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);

