const layout = require("../layout");

function get(req, res) {
  res.send(layout("Home",
    `<h1>Home</h1>
  <a href="/login">Login</a>
  <a href="/signup">Sign Up</a>
  `));
}

module.exports = { get };
