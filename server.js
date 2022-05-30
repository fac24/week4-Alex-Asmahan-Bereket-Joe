const express = require("express");
const server = express();

const home = require("./routes/home");
const signUp = require("./routes/signup");
const posts = require("./routes/posts");
const login = require("./routes/login");
const logout = require("./routes/logout");

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");

server.use(bodyHandler);
server.use(staticHandler);

server.get("/", home.get);


server.get("/signup", signUp.get);
server.post("/signup", signUp.post);

server.get("/posts", posts.get);
server.post("/posts", posts.post);

server.get("/login", login.get);
server.post("/login", login.post);

server.post("/logout", logout.post);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
