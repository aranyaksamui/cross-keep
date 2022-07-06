const ejs = require("ejs");
const mongoose = require("mongoose");
const express = require("express");

const app = express();

// Middlewares
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Handling routes and requests
app.route("/")
    .get((req, res) => {
        res.render("index", { heading: heading })
    })
    .post();

app.listen(3000, () => {
    console.log("Server started on port 3000");
})