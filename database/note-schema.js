// Importing mongoose
import mongoose from "mongoose";

// Creating schema
const notesSchema = mongoose.Schema(
    {
        title: {
            required: true,
            type: String
        },
        body: {
            require: true,
            type: String
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        pin: {
            type: Boolean,
            default: false,
        },
    }
)

// Creating model
const Note = mongoose.model("Note", notesSchema);

export { notesSchema, Note };