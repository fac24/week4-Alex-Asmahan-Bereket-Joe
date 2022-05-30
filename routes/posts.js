const db = require("/database/model.js");

function get(request, response) {
try {
    const postsForm = /*html*/
`
    <form enctype="multipart/form-data class="Upload File" id="upload-file" action="/post" method="POST">
    <div>
      <label for="Title">Title:</label>
      <input type="text" id="title" placeholder="Title" name="title" >
      </div>
      <br>
      <label for="alt-text">Alt Text:</label>
      <input type="text" id="alt_text" placeholder="Alt Text" name="alt_text" >
      </div>
      <br>  
      <div>
      <label for="file">Upload File:</label>
      <input type="file" id="file" placeholder="Upload File" name="file" >
      </div>
      <br>  
      <button class="link-as-button submit-button" type="Submit" value="Submit" aria-label="Submit Your Post">Submit</button>
    </form>
    `;
    response.send(postsForm);
} catch (error) {
    console.error(error);
    response.status(500).send(`<h1>Error</h1>`)
}
}

    function post(request, response) {
        const {title, alt_text, image} = sanitize(request.body);
        model
        .createPost(title, alt_text, image)
        .then(() => {
            response.redirect("/posts")
            .catch((error) => {
                console.error(error);
                response.status(500).send(`<h1>Something went wrong. <a href="/">Go back to Home Page</a></h1>`)
            });
        });
    };

    module.exports(get, post)