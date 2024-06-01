// Local imports
import { Note } from "../database/schemas/note_schema.js";
import { User } from "../database/schemas/user_schema.js";

// Get the home page
export const getHome = (req, res) => {
    if (req.isAuthenticated()) {
        console.log("User is authenticated");
        res.redirect("/users/dashboard");
    } else {
        console.log("User is not authenticated");
        res.render("start");
    }
};

// User dashboard (login required)
export const userDashboard = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const user = req.user;
            const foundNotes = await Note.find({ owner: user._id, pin: false }).exec();
            const foundPinnedNotes = await Note.find({ owner: user._id, pin: true }).exec();
            res.render("index", {
                notes: foundNotes,
                pinnedNotes: foundPinnedNotes,
                firstName: user.first_name,
                lastName: user.last_name,
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect("/");
    }
};
