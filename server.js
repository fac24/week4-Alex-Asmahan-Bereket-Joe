const express = require("express");
const server = express();
const multer = require("multer");
const upload = multer();
const model = require("./database/model");
const db = require("./database/connections");

const cookieParser = require("cookie-parser");

const layout = require("./layout");

const home = require("./routes/home");
const signUp = require("./routes/signup");
const posts = require("./routes/posts");
const getPosts = require("./routes/get-posts");
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

server.post("/get-posts", upload.single("image"), getPosts.post);
server.get("/posts", checkAuth, posts.get);
server.get("/images/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query(`select image from posts where id = $1`, [id]).then((result) => {
    const bytes = result.rows[0].image;
    res.type("image/png").send(bytes);
  });
});



server.get("/login", login.get);
server.post("/login", login.post);

server.post("/logout", logout.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

function checkAuth(req, res, next) {
  const sid = req.signedCookies.sid;
  model.getSession(sid).then((result) => {
    if (result === undefined) {
      res.status(401).send(
        layout(
          "Please log in",
          `        <h1>Please log in to view this page</h1>
        <a href="/login">Log in</a>
      `
        )
      );
    } else {
      next();
    }
  });
}
