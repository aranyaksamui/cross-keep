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
export const getUpdateNotePage = (req, res) => {
    const id = req.params.id;
    Note.findById(id, (err, foundNote) => {
        !err && res.render("edit", { note: foundNote });
    });
};

// Update the note
export const updateNote = (req, res) => {
    const id = req.params.id;
    const { title, body } = req.body;
    const update = { title, body };
    Note.findByIdAndUpdate(id, update, (err) => !err && res.redirect("/dashboard"));
};

// Delete a note
export const deleteNote = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id, (err) => {
        User.findOne({ _id: req.user._id }, (err, foundUser) => {
            foundUser.notes.pull({ _id: id });
            foundUser.save();
            res.redirect("/dashboard");
        });
    });
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
