// Import dependencies
import passport from "passport";

// Local imports
import { User } from "../database/schemas/user_schema.js";

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

// Logout a user
export const userLogout = (req, res) => {
    req.logout((err) => {
        !err ? res.redirect("/") : console.log(err);
    });
};
