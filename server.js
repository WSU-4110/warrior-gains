const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const multer = require("multer")
const fs = require("fs")
const app = express();
const cors = require("cors");
const fileupload = require("express-fileupload");

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileupload())

// setting up passport.js configurations for cookies and sessions
app.use(session({
    secret: 'fitnessisgood.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Make database connection to local MongoDB
mongoose.connect("mongodb+srv://OmarFaruk:CSC4110OFaruk@warrior-gains.qay9r.mongodb.net/usersDB?retryWrites=true&w=majority", { useNewUrlParser: true });


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

const postSchema = new mongoose.Schema({
    "post": String,
    "img": String,

},
    {
        timestamps: true,
    }

);

app.use('/public/uploads/', express.static('../public/uploads'));

// hash and salt for encryption and save users to MongoDB
userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User", userSchema)
const Name = new mongoose.model("Name", nameSchema)
const Post = new mongoose.model("Post", postSchema)


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
app.use("/users/", require("./routes/usersRoute"));

app.use("/home", function (req, res) {
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

app.get("/feed", async function (req, res) {
    if (req.isAuthenticated()) {

        const data = await Post.find();

        res.render("feed", { data });
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

app.post("/post", async function (req, res) {

    if (!req.files) {
        //save the data in the database
        const justPostText = new Post({

            post: req.body.post,

        }

        )
        const postRes = await justPostText.save()
        if (postRes) {

            res.redirect("/feed")
        }

    } else {
        var file = req.files.img;
        var img_name = file.name;

        file.mv("../public/uploads/" + file.name, async function (err) {

            if (err) {
                console.log("err");
            } else {


                //save the data in the database
                const data = new Post({

                    post: req.body.post,
                    img: "/public/uploads/" + img_name,
                }

                )
                const res = await data.save()
                if (res) {


                }

            }
        })

        res.redirect("/feed")

    }

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

app.listen(3001, function () {
    console.log("Server started on port 3001.")
});


