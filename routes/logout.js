const auth = require("../auth");
const layout = require("../layout");
const model = require("../database/model");
const { response } = require("express");

function get(req, res) {
  const sid = req.signedCookies.sid;
  model
    .endSession(sid)
    .then(() => res.clearCookie("sid"))
    .then(() => res.redirect("/"))
    // return model.getSession(sid)
    //     .then((result) => {
    //         if (result == undefined) {
    //             throw new Error();
    //         } else {
    //             return res.clearCookie(sid)
    //             // .then((sid) =>
    //             //     model.endSession(sid)
    //             // )
    //         }
    //     })
    //     .then((res.redirect("/")))
    .catch((error) => {
      console.error(error);
    });
}
module.exports = { get };
