const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// setting up passport.js configurations for cookies and sessions
app.use(session({
    secret: 'fitnessisgood.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Make database connection to local MongoDB
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });


// User credentials model
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

// User info model
const nameSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    dob: Date
});

// hash and salt for encryption and save users to MongoDB
userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema)
const Name = new mongoose.model("Name", nameSchema)


// Simplified Passport/Passport-Local Configuration
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

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

app.get("/feed", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("feed");
        // User.find({}, function (firstname) {
        //     res.render("feed");
        //     firstName: firstname
        // })

        // res.sendFile(__dirname + "/views/feed.html")

    }
    else {
        res.redirect("/login");
    }
})

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})

// If the user is able to register successfully, they may have access to feed page
app.post("/register", function (req, res) {

    const userInfo = new Name({
        email: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
    })

    userInfo.save();

    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/feed")
            })
        }
    });

})

//If the user is able to login with email and password, they will be redirected to feed page

// app.post("/login", function (req, res) {
//     const user = new User({
//         username: req.body.username,
//         password: req.body.password,

//     });

//     req.login(user, function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             passport.authenticate("local", {
//                 successRedirect: '/feed',
//                 failureRedirect: '/login'
//             });
//         }
//     });
// });

app.post('/login', passport.authenticate('local', {
    successRedirect: '/feed',
    failureRedirect: '/login'
}));

app.listen(3000, function () {
    console.log("Server started on port 3000.")
});