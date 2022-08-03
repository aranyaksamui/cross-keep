// Importing NPM modules
import ejs from "ejs";
import express from "express";

// Importing custom modules
import dbConnect from "./database/db.js";
import { Note } from "./database/note-schema.js";
import { User } from "./database/user-schema.js";

// Creating app constant with express
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Connecting to database
dbConnect("mongodb://localhost:27017/crosskeepDB");

// Handling requests and routes
app.get("/", (req, res) => {
    // res.render("start");
    Note.find((err, foundNotes) => {
        !err && res.render("index", {notes: foundNotes});
    });
});

app.route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        Note.findById(id, (err, foundNote) => {
            !err && res.render("edit", {note: foundNote});
        })
    })
    .post((req, res) => {
        const id = req.params.id;
        const { title, body } = req.body;
        const update = { title, body };
        Note.findByIdAndUpdate(id, update, (err) => { !err && res.redirect("/")});
    });

app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id, (err) => !err && res.redirect("/"));
})

app.route("/create")
    .get((req, res) => {
        res.render("create");
    })
    .post((req, res) => {
        const { title, body } = req.body;
        const newNote = new Note({
            title: title,
            body: body,
        });
        newNote.save((err) => !err && res.redirect("/"));
    });

// Listening on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
