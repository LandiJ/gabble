const models = require("../models");

function login(app) {
  app.get("/login", function(req, res) {
    res.render("index", { user: req.session.userMaybe });
  });

  app.post("/login", function(req, res) {
    if (!req.body || !req.body.password || !req.body.email) {
      res.redirect("/login");
    }

    var userMaybe = req.body;
    var userIs;

    models.user.findAll().then(function(foundUsers) {
      foundUsers.forEach(function(item) {
        if (item.email === userMaybe.email) {
          userIs = item;
        }
      });

      if (!userIs) {
        return res.redirect("/login");
      }

      if (userMaybe.password === userIs.password) {
        req.session.userMaybe = userIs;
        return res.redirect("/in");
      } else {
        return res.redirect("/login");
      }
    });
  });
}
module.exports = login;
