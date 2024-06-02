// Local imports
import { Note } from "../database/schemas/note_schema.js";
import { User } from "../database/schemas/user_schema.js";


// Get create note page
export const getCreatePage = (req, res) => {
    req.isAuthenticated() ? res.render("create") : res.redirect("/");
};

// Create a note
export const createNote = async (req, res) => {
    const { title, body } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const newNote = await Note.create({ title, body, owner: req.user._id });
        user.notes.push(newNote);
        user.save();
        res.redirect("/users/dashboard");
    } catch (err) {
        console.log(err);
    }
};

// Get note edit page
export const getUpdateNotePage = async (req, res) => {
    const noteId = req.params.id;
    const foundNote = await Note.findById(noteId).catch((err) => console.log(err));
    res.render("edit", { note: foundNote });
};

// Update the note
export const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, body } = req.body;
    const update = { title, body };
    await Note.findByIdAndUpdate(noteId, update).catch((err) => console.log(err))
    res.redirect("/users/dashboard");
};

// Delete a note
export const deleteNoteAndUpdateUser = async (req, res) => {
    const noteId = req.params.id;
    await Note.findByIdAndDelete(noteId).catch((err) => console.log(err));
    await User.findByIdAndUpdate(req.user._id, { $pull: { notes: noteId } });
    res.redirect("/users/dashboard");
};

// Favorite a note
export const favNote = async (req, res) => {
    try {
        const foundNote = await Note.findById(req.params.id).exec();
        foundNote.pin = !foundNote.pin;
        foundNote.save();
        res.redirect("/users/dashboard");
    } catch (err) {
        console.log(err);
    }
};
