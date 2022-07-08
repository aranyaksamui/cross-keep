const ejs = require("ejs");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

// Middlewares
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const notesArray = [];

// Handling routes and requests
app.route("/")
    .get((req, res) => {
        res.render("index", {notes: notesArray})
        console.log(notesArray);
    })

app.route("/create")
    .get((req, res) => {
        res.render("create")
    })
    .post((req, res) => {
        const {title, body} = req.body;
        const note = {
            title: title,
            body: body
        }
        notesArray.push(note);
        res.redirect("/");
    });

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

