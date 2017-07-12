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

app.listen(port, function() {
  console.log(`Server is running on port ${port}.`);
});
