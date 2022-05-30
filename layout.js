function layout(title, content) {
    return /*html*/ `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="an app for sharing quotations">
    <title>${"Upload File"}</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    ${postsForm}
  </body>
  </html>
    `;
}

module.exports = layout;