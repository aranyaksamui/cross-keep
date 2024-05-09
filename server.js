// Import dependencies
import ejs from "ejs";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
import session from "express-session";

// Local imports
import dbConnect from "./database/db.js";
import { usePassport } from "./auth/auth.js";
import homeRouter from "./routes/home_routes.js";
import userRouter from "./routes/user_routes.js";
import notesRouter from "./routes/notes_routes.js";

const app = express();

// Connecting to database
dbConnect();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
usePassport();

// Routes
app.use("/", homeRouter);
app.use("/users", userRouter);
app.use("/notes", notesRouter);

const PORT = 8000 || process.env.PORT;

// Listening to port 3000
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
});
