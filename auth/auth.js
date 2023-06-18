// Import dependencies
import passport from "passport";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Local imports
import { User } from "../database/schemas/user-schema.js";

// Passport middlewares
export const usePassport = () => {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
