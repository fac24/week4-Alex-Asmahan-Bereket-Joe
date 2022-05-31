const express = require("express");
const server = express();

const cookieParser = require("cookie-parser");

const home = require("./routes/home");
const signUp = require("./routes/signup");
const posts = require("./routes/posts");
const login = require("./routes/login");
const logout = require("./routes/logout");

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");

server.use(bodyHandler);
server.use(staticHandler);
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get("/", home.get);

server.get("/signup", signUp.get);
server.post("/signup", signUp.post);

server.get("/posts", checkAuth, posts.get);
// server.post("/posts", posts.post);

server.get("/login", login.get);
server.post("/login", login.post);

server.post("/logout", logout.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


function checkAuth(req, res, next) {
    const user = req.session;
    if (!user) {
        res.status(401).send(`
        <h1>Please log in to view this page</h1>
        <a href="/log-in">Log in</a>
      `);
    } else {
        next();
    }
}