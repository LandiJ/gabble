const models = require("../models");

function homepage(app) {
  app.get("/homepage", function(req, res) {
    models.post
      .findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: models.user,
            as: "author"
          },
          {
            model: models.like,
            as: "likes"
          }
        ]
      })
      .then(function(allPosts) {
        res.render("homepage", {
          all: allPosts,
          user: req.session.userMaybe
        });
      });
  });
}

module.exports = homepage;
