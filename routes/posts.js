const model = require("../database/model");
const layout = require("../layout");

function get(request, response) {
  let postsHTML = "";
  model.getAllPosts().then((results) => {
    results.forEach((result) => {
      postsHTML += `
          <div class="post-container">
          <h2>User: ${result.username}</h2>
          <h3>Title: ${result.title}</h3>
          <img src="/images/${result.id}" alt=${result.alt_text} width="300px" height="auto">
          </div>`
      return postsHTML;
    })
  }).then(() => {
    response.send(
      layout(
        "Upload Your File",
        /*html*/ `
    <nav><a href="/logout">Log Out</a></nav>
    <h1>Upload Your File</h1>
    <form enctype="multipart/form-data" class="upload-file" id="upload-file" action="/get-posts" method="POST">
      <label for="title">Title:<span aria-hidden="true">*</span></label>
      <input type="text" id="title" placeholder="Title" name="title">
      <label for="alt_text">Alt Text:<span aria-hidden="true">*</span></label>
      <input type="text" id="alt_text" placeholder="Alt Text" name="alt_text">
      <label for="file">Upload File:<span aria-hidden="true">*</span></label>
      <input type="file" id="file" placeholder="Upload File" name="image">
      <button class="link-as-button submit-button" type="Submit" value="Submit" aria-label="Submit Your Post">Submit</button>
    </form>
    <section>
    ${postsHTML}
    </section>`
      )
    )
  }).catch((error) => {
    console.error(error);
    response.status(500).send(`<h1>Error</h1>`);
  })
}

// function sanitize(object) {
//   let sanitized = {};
//   for (let entry of Object.entries(original_input)) {
//       let key = entry[0];
//       let value = entry[1];
//       sanitized[key] = value.replaceAll("<", "&lt;");
//       sanitized[key] = value.replaceAll(">", "&gt;");
//   }
//   return sanitized;
// }

module.exports = {
  get,
  // post
};
