const express = require("express");
const server = express();

// const home = require("./routes/home");
const signUp = require("./routes/signup");

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");

server.use(bodyHandler);
server.use(staticHandler);

// server.get("/", home.get);

server.get("/signup", signUp.get);
server.post("/signup", signUp.post);

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
