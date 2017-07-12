const models = require("../models");

function checkAuth(req, res, next) {
  if (!req.session.userMaybe) {
    return res.redirect("/login");
  } else {
    next();
  }
}

function posts(app) {
  app.post("/post", checkAuth, function(req, res) {
    var newPost = models.post.build({
      body: req.body.body,
      authorid: req.session.userMaybe.id
    });
    //   res.send(newPost);
    newPost.save().then(function(savedPost) {
      res.redirect("/in");
    });
  });

  app.post("/delete-post/:id", (req, res) => {
    models.like
      .destroy({ where: { postid: req.params.id } })
      .then(() => {
        models.post
          .destroy({ where: { id: req.params.id } })
          .then(() => {
            return res.redirect("/in");
          })
          .catch(err => {
            res.status(500).send(err);
          });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
}
module.exports = posts;
