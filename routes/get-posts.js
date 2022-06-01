const model = require("../database/model");

const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
const ALLOWED_TYPES = ["image/jpeg", "image/png"]; // only images for now

function post(request, response) {
  //need to add multer middleware
  const image = request.file;
  console.log(image);
  const { title, alt_text } = request.body;
  console.log(request.body);
  const imageData = image.buffer;
  console.log(request.body);
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    response.status(400).send("<h1>File upload error</h1><p>Please upload an image file</p>");
  }
  if (file.size > MAX_SIZE) {
    response.status(400).send("<h1>File upload error</h1><p>Profile picture must be < 5MB</p>")
  };

  //does user have cookie
  //do they have session id
  //is session valid?
  //get user id w/ session id.
  const sid = request.signedCookies.sid;
  model
    .getSession(sid)
    .then((result) => result.data.user.id)
    .then((user_id) => {
      return model
        .createPost(user_id, title, alt_text, imageData)
        .then(() => {
          response.redirect("/");
        })
        .catch((error) => {
          console.error(error);
          response
            .status(500)
            .send(
              `<h1>Something went wrong. <a href="/">Go back to Home Page</a></h1>`
            );
        });
    });
}

module.exports = { post };
