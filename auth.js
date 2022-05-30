const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");


const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 60000,
    sameSite: "lax",
    signed: true,
};

function verifyUser(username, password) {
    return model.getUser(username)
        .then((user) => {
            if (user === undefined) {
                console.error("No such user");
                return false;
            } else {
                return bcrypt.compare(password, user.password)
                    .then((match) => {
                        if (match === true) {
                            console.log("Username and password match");
                            return user;
                        } else {
                            console.error("User cannot be verified");
                            return false;
                        }
                    })
            }

        })
}

// const authLoginPost = server.post("/login", (req, res) => {
//     console.log(req.signedCookies);
// })

// const authLogoutGet = server.get("/logout", (req, res) => {
//     const sid = req.signedCookies.sid;
//     req.clearCookies(sid);
//     res.redirect("/");
// })

function createUser(username, password) {
    const sid = crypto.randomBytes(18).toString("base64");
    return bcrypt
        .hash(password, 10)
        .then((hash) => model.createUser(username, hash))
        .then((user) => createSession(user));
}

function createSession(user) {
    const sid = crypto.randomBytes(18).toString("base64");
    return model.createSession(sid, { user })
        .then((sid) => sid);
}


// server.get("/login", (req, res) => {
//     const sid = crypto.randomBytes(18).toString("base64");
//     res.cookie('sid', sid, COOKIE_OPTIONS);
//     res.redirect("/posts");
// })
// module.exports = {
//     // authLoginGet,
//     // authLoginPost,
//     // createUser
//     // authLogoutGet
// }

module.exports = {
    COOKIE_OPTIONS,
    createUser,
    verifyUser,
    createSession
}