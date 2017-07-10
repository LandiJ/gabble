const models = require("../models");

function edits(app) {
  app.post("/edit-page/:id", (req, res) => {
    models.user
      .find({ where: { id: req.params.id } })
      .then(foundUser => {
        res.render("edit", {
          foundUser: foundUser,
          user: req.session.userMaybe
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.post("/edit-profile/:id", (req, res) => {
    models.user
      .update({ bio: req.body.bio }, { where: { id: req.params.id } })
      .then(update => {
        req.session.destroy();
        res.redirect("/");
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
}
module.exports = edits;
