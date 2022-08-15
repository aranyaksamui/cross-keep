// Importing NPM modules
import ejs from "ejs";
import express from "express";
import passport from "passport";
import session from "express-session";

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
app.use(session(
    { 
        secret: "iwantabeastpcorworkstationtbh", 
        resave: false, 
        saveUninitialized: false,

    })
)
app.use(passport.initialize());
app.use(passport.session());


// Connecting to database
dbConnect("mongodb://localhost:27017/crosskeepDB");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Handling requests and routes
app.get("/", (req, res) => {
    if(req.isAuthenticated()) { 
        console.log("User is authenticated");
        res.redirect("/dashboard");
    } else {
        console.log("User is not authenticated");
        res.render("start");
    }
});

app.get("/dashboard", async (req, res) => {
    if(req.isAuthenticated()) {
        const userNotes = req.user.notes;
        const foundNotes = await Note.find({_id: userNotes, pin: false}).exec();
        const foundPinnedNotes = await Note.find({owner: req.user._id, pin: true}).exec();
        res.render("index", {notes: foundNotes, pinnedNotes: foundPinnedNotes});
    } else {
        res.redirect("/");
    }
});

app.post("/register", (req, res) => {
    const { first_name, last_name, password } = req.body;
    const email = req.body.username;
    User.register({ username: email, first_name: first_name, last_name: last_name }, password,
        (err, user) => {
            if(!err) {
                passport.authenticate("local") (req, res, () => { res.redirect("/") });
            } else {
                console.log(err);
            }
        }
    )
})

app.post("/login", (req, res) => {
    const user = new User ({
        username: req.body.username,
        password: req.body.password,
    })
    req.login(user, (err) => {
        if(!err) {
            passport.authenticate("local") (req, res, function() {
                res.redirect("/dashboard");
            })
        } else {
            console.log(res.statusCode);
            res.redirect("/");
        }
    })
})

app.get("/logout", (req, res) => {
    req.logout((err) => { !err ? res.redirect("/") : console.log(err) });
})

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
        Note.findByIdAndUpdate(id, update, (err) => !err && res.redirect("/dashboard"));
    });

app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id, (err) => {
        User.findOne({_id: req.user._id}, (err, foundUser) => {
            foundUser.notes.pull({_id: id});
            foundUser.save();
            res.redirect("/dashboard");
        })
    })
})

app.post("/favourites/:id", async (req, res) => {
    const foundNote = await Note.findById(req.params.id).exec()
    foundNote.pin = !foundNote.pin;
    foundNote.save();
    await res.redirect("/dashboard");
})

app.route("/create")
    .get((req, res) => {
        req.isAuthenticated() ? res.render("create") : res.redirect("/");
    })
    .post((req, res) => {
        const { title, body } = req.body;
        const newNote = new Note({
            title: title,
            body: body,
            owner: req.user._id,
        });
        newNote.save()
            .then((result) => {
                User.findOne({_id: req.user._id}, (err, user) => {
                    user.notes.push(newNote);
                    user.save((err) => { !err && res.redirect("/dashboard")});
                })
            })
            .catch((err) => {
                console.log(err);
            })
    });

// Listening on port 3000
app.listen(3000 || process.env.port, async () => {
    await console.log("Server started on port 3000");
});
