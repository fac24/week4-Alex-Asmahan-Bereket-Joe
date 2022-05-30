const layout = require('../layout');

const get = (req, res) => {
    res.send(layout(`login`, `
    <h1>Log In</h1>
    <form method="POST">
    <label for="username">Your username</label>
    <input id="name" name="username"></input>
    <label for="password">Your password</label>
    <input id="password" name="password" type="password"></input>
    <button type="submit">Submit</button>
    </form>`));
}

module.exports = {
    get }