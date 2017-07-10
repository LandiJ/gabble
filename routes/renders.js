const models = require("../models");

function checkAuth(req, res, next) {
  if (!req.session.userMaybe) {
    return res.redirect("/login");
  } else {
    next();
  }
}

function renders(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // app.get("/profile", checkAuth, function(req, res) {
  //   res.render("profile", { user: req.session.userMaybe });
  // });
  app.get("/in", checkAuth, function(req, res) {
    models.post
      .findAll({
        order: [["createdAt", "DESC"]],
        where: { authorid: req.session.userMaybe.id }
      })
      .then(function(foundPosts) {
        res.render("profile", {
          user: req.session.userMaybe,
          posts: foundPosts
        });
      });
  });
}
module.exports = renders;
