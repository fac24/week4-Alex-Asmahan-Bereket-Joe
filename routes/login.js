const layout = require("../layout");

const get = (req, res) => {
  res.send(
    layout(
      `login`,
      `
    <h1>Log In</h1>
    <form method="POST">
    <label for="username">Your username</label>
    <input id="name" name="username"></input>
    <label for="password">Your password</label>
    <input id="password" name="password" type="password"></input>
    <button type="submit">Submit</button>
    </form>`
    )
  );
};

function post(req, res) {
  const { username, password } = req.body;

  auth
    .verifyUser(username, password)
    .then((verification) => {
      if (verification === false) {
        throw new Error();
      } else {
        return auth.createSession(verification);
      }
    })
    .then((sid) => {
      res.cookie("sid", sid, auth.COOKIE_OPTION);
      res.redirect("/");
    })
    .catch(() => {
      res
        .status(401)
        .send(
          layout(
            `Error`,
            `<h1 class="error-message"> SOmething went wrong</h1></h1>`
          )
        );
    });
}
module.exports = {
  get,
  post,
};
