const express = require("express");
const server = express();
const multer  = require("multer");
const upload = multer();
// const db = require("database/init.sql")

const cookieParser = require("cookie-parser");

const home = require("./routes/home");
const signUp = require("./routes/signup");
const posts = require("./routes/posts");
const getPosts = require("./routes/get-posts");
const login = require("./routes/login");
//const logout = require("./routes/logout");

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");

server.use(bodyHandler);
server.use(staticHandler);

server.get("/", home.get);

server.get("/signup", signUp.get);
server.post("/signup", signUp.post);

server.get("/posts", posts.get);

server.post("/get-posts", upload.single("image"), getPosts.post);

server.get("/login", login.get);
server.post("/login", login.post);


//server.post("/logout", logout.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
