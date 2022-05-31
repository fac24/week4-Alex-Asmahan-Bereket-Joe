const auth = require("../auth");

function post(req, res) {
    const { username, password } = req.body;
    auth
        .verifyUser(username, password)
        .then((verification) => {
            if (verification === false) {
                throw new Error();
            } else {
                return auth.endSession(verification);
            }
        })
        .then((res.send("/")))
        .catch(() => {
            res
                .status(401)
                .send(
                    layout(
                        `Error`,
                        `<h1 class="error-message"> Something went wrong</h1></h1>`
                    )
                );
        });
}

module.exports = { post }