const models = require("../models");

function likes(app) {
  app.post("/like/:id", function(req, res) {
    models.like
      .findAll({
        where: { authorid: req.session.userMaybe.id, postid: req.params.id }
      })
      .then(function(foundLike) {
        if (foundLike.length > 0) {
          return res.redirect("/homepage");
        }

        var newLike = models.like.build(req.body);
        newLike.save().then(function(savedLike) {
          res.redirect("/homepage");
        });
      });
  });

  const models = require("../models");

  app.post("/likes", function(req, res) {
    models.like
      .findAll({
        include: [
          {
            model: models.user,
            as: "author"
          },
          {
            model: models.post,
            as: "post"
          }
        ],
        where: { postid: req.body.postid }
      })
      .then(function(foundLikes) {
        //   res.send(foundLikes);
        var other = foundLikes[0].post.body;

        res.render("likes", { likes: foundLikes, other: other });
      });
  });
}
module.exports = likes;
