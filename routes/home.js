const layout = require("../layout");

function get(req, res) {
  res.send(layout("Test", "<h1>Hello world</h1>"));
}

module.exports = { get };
