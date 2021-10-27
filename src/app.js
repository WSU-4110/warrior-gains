const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose");

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));



mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
const userSchema = {
    email: String,
    password: String,
    fname: String,
    lname: String
};

const User = new mongoose.model("User", userSchema)

app.get("/", function (req, res) {
    res.render("home")
})

app.get("/login", function (req, res) {
    res.render("login")
})

app.get("/register", function (req, res) {
    res.render("register")
})
app.get("/feed", function (req, res) {
    res.render("feed")
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
