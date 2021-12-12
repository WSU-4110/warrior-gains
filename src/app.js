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
app.use(express.json());


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
  dob: Date,
  email: String,
});

const postSchema = new mongoose.Schema(
  {
    post: String,
    img: String,
    user_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Name'
    },
    //schema modified
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Name",
        },
        comment: String,
      },
    ],
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
app.get("/", function (req, res) {
  res.render("home")

})

app.get("/login", function (req, res) {
  res.render("login")

})

app.get("/register", function (req, res) {
  res.render("register")
})

app.get("/forgot", function (req, res) {
  res.render("forgot")

})


app.get("/reset", function (req, res) {
  res.render("reset")

})
///---------------------------------------------------------------------------------------------------------

app.get("/profile", async function (req, res) {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const details = await Name.findOne({ email: username })
    const data = await Post.find({
      user_details: details._id
    }).sort({

      createdAt: -1,
    });
    const user = await Name.findOne({
      email: req.user.username,
    });

    res.render("profile", { data, user });
  } else {
    res.redirect("/login");
  }
});




app.get("/edit", function (req, res) {
  res.render("edit")
})


app.get("/feed", async function (req, res) {
  if (req.isAuthenticated()) {

    const data = await Post.find({}).
      populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'fname lname'
        }
      }).
      populate({
        path: 'user_details',
        select: 'fname lname'
      })

      .sort({
        createdAt: -1,
      });


    const user = await Name.findOne({
      email: req.user.username,
    });

    res.render("feed", { data, user });
  } else {
    res.redirect("/login");
  }
});
app.get("/my-posts", async function (req, res) {
  if (req.isAuthenticated()) {
    const username = req.user.username;
    const details = await Name.findOne({ email: username })
    const data = await Post.find({
      user_details: details._id
    }).sort({

      createdAt: -1,
    });
    const user = await Name.findOne({
      email: req.user.username,
    });

    res.render("my-posts", { data, user });
  } else {
    res.redirect("/login");
  }
});


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
    const user = req.user.username;
    const detail = await Name.findOne({ email: user });
    const justPostText = new Post({
      post: req.body.post,
      user_details: detail._id
    });
    const postRes = await justPostText.save()
    if (postRes) {

      res.redirect("/feed")
    }

  } else {
    const user = req.user.username;

    const detail = await Name.findOne({ email: user });


    let returnedB64 = Buffer.from(req.files.img.data).toString("base64");
    const data = new Post({
      user,
      post: req.body.post,
      img: returnedB64,
      user_details: detail._id,
    });
    const res1 = await data.save()
    if (res1) {


    }


    res.redirect("/feed")

  }

})

//----------------------------------------------------------


//If the user is able to login with email and password, they will be redirected to feed page

/* app.post("/login", function (req, res) {
     const user = new User({ 
         username: req.body.username,
         password: req.body.password,

     });

     req.login(user, function (err) {
         if (err) {
             console.log(err);
         } else {
             passport.authenticate("local", {
                 successRedirect: '/feed',
                 failureRedirect: '/login'
             });
         }
     });
 });*/
//like dislike


app.post('/add-comment', async function (req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user);
    const { comment, postId, user } = req.body;
    const commentTodAdd = {
      user,
      comment
    }
    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: commentTodAdd
      }
    })
    res.redirect('/feed')
  }
});
app.post('/like-dislike', async function (req, res) {
  if (req.isAuthenticated()) {
    const { user, id } = req.body;
    try {
      const isLiked = await Post.findOne({
        'likes.user': user,
        _id: id,
      });
      console.log("already");

      if (isLiked) {
        await Post.findByIdAndUpdate(isLiked._id, {
          $pull: {
            likes: {
              user: user,
            },
          },
        });
        return res.status(200).json({
          success: true,
          message: "Disliked",
        });
      } else {
        const likeToAdd = {
          user
        };
        await Post.findByIdAndUpdate(id, {
          $push: {
            likes: likeToAdd,
          },
        });
        return res.status(200).json({
          success: true,
          message: "Liked",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
})

//post update 





app.get("/edit-post", async function (req, res) {
  const { id } = req.query;
  const post = await Post.findById(id);
  if (!post) {
    return res.redirect('/my-posts');
  }

  const user = await Name.findOne({
    username: req.user.username,
  });
  res.render("edit-post", { data: post, user });

});



app.post("/update-post", async function (req, res) {
  if (!req.files) {
    //save the data in the database

    const { id, post } = req.body;
    const postRes = await Post.findOneAndUpdate(
      { _id: id },
      {
        post,
      }
    );
    if (postRes) {
      res.redirect("/feed");
    }

  } else {
    var file = req.files.img;
    var img_name = file.name;

    file.mv("../public/uploads/" + file.name, async function (err) {
      if (err) {
        console.log("err");
      } else {
        //save the data in the database

        const { id, post } = req.body;
        const res = await Post.findOneAndUpdate(
          { _id: id },
          {
            post,
            img: "/public/uploads/" + img_name,
          }
        );

        if (res) {
        }
      }
    });

    res.redirect("/feed");
  }
});




//delete update 


app.post("/delete-post", async function (req, res) {
  const { postId } = req.body;

  const deleted = await Post.findByIdAndDelete(postId);


  res.redirect("/my-posts");
});




app.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/login'
}));

app.listen(3000, function () {
  console.log("Server started on port 3000.")
});