// Import dependencies
import passport from "passport";

// Local imports
import { User } from "../database/schemas/user-schema.js";
import { Note } from "../database/schemas/note-schema.js";

// Register a user
export const userRegister = (req, res) => {
    const { first_name, last_name, password } = req.body;
    const email = req.body.username;
    User.register({ username: email, first_name, last_name }, password, (err, user) => {
        if (!err) {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/");
            });
        } else {
            console.log(err);
        }
    });
};

// Login a user
export const userLogin = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    req.login(user, (err) => {
        if (!err) {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/users/dashboard");
            });
        } else {
            console.log(res.statusCode);
            res.redirect("/");
        }
    });
};

// User dashboard
export const userDashboard = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const user = req.user;
            const foundNotes = await Note.find({ owner: user._id }).exec();
            const foundPinnedNotes = await Note.find({ owner: user._id, pin: true }).exec();
            res.render("index", { notes: foundNotes, pinnedNotes: foundPinnedNotes });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect("/");
    }
};

// Logout a user
export const userLogout = (req, res) => {
    req.logout((err) => {
        !err ? res.redirect("/") : console.log(err);
    });
};
