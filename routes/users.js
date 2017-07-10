const models = require("../models");

function users(app) {
  app.post("/users", function(req, res) {
    var newUser = models.user.build(req.body);
    newUser.save().then(function(savedUser) {
      res.redirect("/");
    });
  });

  app.post("/delete-user/:id", (req, res) => {
    models.user
      .destroy({ where: { id: req.params.id } })
      .then(() => {
        res.send("deleted user");
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
}
module.exports = users;
