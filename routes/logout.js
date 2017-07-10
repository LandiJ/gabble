const models = require("../models");

function logout(app) {
  app.post("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
  });
}

module.exports = logout;
