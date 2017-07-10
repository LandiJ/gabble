const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./sessionConfig");
const morgan = require("morgan");
const models = require("./models");
const homepage = require("./routes/homepage");
const login = require("./routes/login");
const likes = require("./routes/likes");
const posts = require("./routes/posts");
const renders = require("./routes/renders");
const edits = require("./routes/edits");
const logout = require("./routes/logout");
const users = require("./routes/users");

const port = process.envPORT || 8000;
const app = express();
const expressValidator = require("express-validator");
const mustacheExpress = require("mustache-express");

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
app.use(morgan("dev"));
app.use(expressValidator());

homepage(app);
login(app);
likes(app);
posts(app);
renders(app);
edits(app);
logout(app);
users(app);

function checkAuth(req, res, next) {
  if (!req.session.userMaybe) {
    return res.redirect("/login");
  } else {
    next();
  }
}
// ROUTES

app.use("/", express.static(__dirname + "/public"));

// app.get("/", function(req, res) {
//   res.render("index");
// });

// app.get("/signup", function(req, res) {
//   res.render("signup");
// });

// app.post("/users", function(req, res) {
//   var newUser = models.user.build(req.body);
//   newUser.save().then(function(savedUser) {
//     res.redirect("/");
//   });
// });
// app.get("/login", function(req, res) {
//   res.render("index", { user: req.session.userMaybe });
// });

// app.post("/login", function(req, res) {
//   if (!req.body || !req.body.password || !req.body.email) {
//     res.redirect("/login");
//   }

//   var userMaybe = req.body;
//   var userIs;

//   models.user.findAll().then(function(foundUsers) {
//     foundUsers.forEach(function(item) {
//       if (item.email === userMaybe.email) {
//         userIs = item;
//       }
//     });

//     if (!userIs) {
//       return res.redirect("/login");
//     }

//     if (userMaybe.password === userIs.password) {
//       req.session.userMaybe = userIs;
//       return res.redirect("/in");
//     } else {
//       return res.redirect("/login");
//     }
//   });
// });

// app.post("/like", function(req, res) {
//   var newLike = models.like.build(req.body);
//   newLike.save().then(function(savedLike) {
//     res.redirect("/homepage");
//   });
// });

// app.post("/likes", function(req, res) {
//   models.like
//     .findAll({
//       include: [
//         {
//           model: models.user,
//           as: "author"
//         },
//         {
//           model: models.post,
//           as: "post"
//         }
//       ],
//       where: { postid: req.body.postid }
//     })
//     .then(function(foundLikes) {
//       //   res.send(foundLikes);
//       var other = foundLikes[0].post.body;

//       res.render("likes", { likes: foundLikes, other: other });
//     });
// });

// This is the profile page when the user is logged in

// app.get("/in", checkAuth, function(req, res) {
//   models.post
//     .findAll({
//       order: [["createdAt", "DESC"]],
//       where: { authorid: req.session.userMaybe.id }
//     })
//     .then(function(foundPosts) {
//       res.render("profile", { user: req.session.userMaybe, posts: foundPosts });
//     });
// });

// app.get("/homepage", function(req, res) {
//   models.post
//     .findAll({
//       order: [["createdAt", "DESC"]],
//       include: [
//         {
//           model: models.user,
//           as: "author"
//         },
//         {
//           model: models.like,
//           as: "likes"
//         }
//       ]
//     })
//     .then(function(allPosts) {
//       res.render("homepage", {
//         all: allPosts,
//         user: req.session.userMaybe
//       });
//     });
// });

// app.post("/post", checkAuth, function(req, res) {
//   var newPost = models.post.build({
//     body: req.body.body,
//     authorid: req.session.userMaybe.id
//   });
//   //   res.send(newPost);
//   newPost.save().then(function(savedPost) {
//     res.redirect("/in");
//   });
// });

// app.post("/delete-post/:id", (req, res) => {
//   models.like
//     .destroy({ where: { postid: req.params.id } })
//     .then(() => {
//       models.post
//         .destroy({ where: { id: req.params.id } })
//         .then(() => {
//           res.redirect("/in");
//         })
//         .catch(err => {
//           res.status(500).send(err);
//         });
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });
// app.post("/edit-page/:id", (req, res) => {
//   models.user
//     .find({ where: { id: req.params.id } })
//     .then(foundUser => {
//       res.render("edit", { foundUser: foundUser, user: req.session.userMaybe });
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });

// app.post("/edit-profile/:id", (req, res) => {
//   models.user
//     .update({ bio: req.body.bio }, { where: { id: req.params.id } })
//     .then(update => {
//       req.session.destroy();
//       res.redirect("/");
//     })
//     .catch(err => {
//       res.status(500).send(err);
//     });
// });

// app.post("/logout", function(req, res) {
//   req.session.destroy();
//   res.redirect("/");
// });

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`);
});
