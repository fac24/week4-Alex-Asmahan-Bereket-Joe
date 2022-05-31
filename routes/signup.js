const model = require("../database/model");
const layout = require("../layout");
const auth = require("../auth");

function get(req, res) {
    res.send(layout("Sign Up", /*html*/ `
    <h1>Sign Up</h1>
    <form method="POST">
    <label for="username">Username<span aria-hidden="true">*</span></label>
    <input id="username" name="username" required></input>
    <label for="password">Password<span aria-hidden="true">*</span></label>
    <input id="password" type="password" name="password" required></input>
    <button type="submit">Submit</button>
    </form>
    `))
}

function post(req, res) {
    const { username, password } = req.body;
    return auth.createUser(username, password)
        // .then((result) => {
        //     console.log(24);
        //     console.log(result);
        //     auth.createSession(result);
        // })
        .then((sid) => {
            res.cookie("sid", sid, auth.COOKIE_OPTIONS);
        })
        .then(() => res.redirect("/posts"))
        .catch((error) => {
            //console.error(error);
            console.log(error)
            res.send("<h1>Something went wrong with your sign up</h1>");
        })
}


module.exports = {
    get,
    post
}