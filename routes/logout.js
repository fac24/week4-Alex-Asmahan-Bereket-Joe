const auth = require("../auth");
const layout = require("../layout");
const model = require("../database/model");

function post(req, res) {
    const sid = req.signedCookies.sid;
    return model.getSession(sid).then((result) => {

        return result;
    })
        .then((result) => {
            console.log(8)
            console.log(result.data.user.username);
            // console.log(result.data.password);
            const username = result.data.user.username;
            const password = result.data.user.password;
            console.log(16);
            console.log(username);
            console.log(password);
            return auth
                .verifyUser(username, password)
        })
        .then((verification) => {
            if (verification === false) {
                throw new Error();
            } else {
                return auth.endSession(verification);
            }
        })
        .catch(() => {
            return res
                .status(401)
                .send(
                    layout(
                        `Error`,
                        `<h1 class="error-message"> Something went wrong</h1>`
                    )
                );
        })
        .then((res.redirect("/"))
        )
}
module.exports = { post }