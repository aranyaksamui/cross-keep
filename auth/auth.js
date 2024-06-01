// Import dependencies
import passport from "passport";
import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === "production" ? "../.env.production" : "../.env.development" });

// Local imports
import { User } from "../database/schemas/user_schema.js";

// Passport middlewares
export const usePassport = () => {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
