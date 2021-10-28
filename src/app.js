require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create database using MongoDB to store user's name, email, password, and date of birth.
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    fname: String,
    lname: String,
    dob: Date
});

// secret key used to aid with encryption on mongoose
// Encrypt only the password field
userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema)

// Routes for users to traverse the webpage
app.get("/", function (req, res) {
    res.render("home")
})

app.get("/login", function (req, res) {
    res.render("login")
})

app.get("/register", function (req, res) {
    res.render("register")
})

app.get("/profile", function (req, res) {
    res.render("profile")
})


// If the user is able to register successfully, they may have access to feed page
app.post("/register", function (req, res) {
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.username,
        password: req.body.password,
        dob: req.body.dob
    });


    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render("feed")
        }
    });
})

// If the user is able to loging with email and password, they will be redirected to feed page
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("feed")
                }
            }
        }
    })
})


app.listen(3000, function () {
    console.log("Server started on port 3000.")
});