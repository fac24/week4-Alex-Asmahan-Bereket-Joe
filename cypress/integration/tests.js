beforeEach(() => {
  cy.task("resetDb");
});

// it("test test :)", () => {
//   // Visit the baseURL.
//   cy.visit("/");
// });

// Some constants to avoid repetition:

const username = "auniqueuserfortesting";
const password = "aspecialpasswordjustfortesting123";

const postTitle = "A test title";
const postAltText = "Some alt text";

// If we wanted to be really fancy, we could set these once in another file and
// reference them throughout the code?
const sessionIdCookieName = "sid";

const usernameInputSelector = "input[name='username']";
const passwordInputSelector = "input[id='password']";

const postTitleInputSelector = "input[name='title']";
const postAltTextInputSelector = "input[name='alt_text']";
const postFileInputSelector = "input[name='file']";
// End of consts

// Some reusable test bits:

function signup() {
  it("Submit signup form on /signup route", () => {
    cy.visit("/signup");
    cy.get(usernameInputSelector).type(username);
    cy.get(passwordInputSelector).type(password);
    cy.get("form").submit();
  });
}

function login() {
  it("Submit login form on /login route", () => {
    cy.visit("/login");
    cy.get(usernameInputSelector).type(username);
    cy.get(passwordInputSelector).type(password);
    cy.get("form").submit();
  });
}

function sessionCookie() {
  it("Given session cookie", () => {
    // https://docs.cypress.io/api/commands/getcookie#Arguments
    // "When a cookie matching the name could not be found: cy.getCookie() yields null."
    cy.getCookie(sessionIdCookieName).should("not.eq", null);
  });
}

function postsRoute() {
  it("Redirected to /posts route", () => {
    cy.url().should("eq", Cypress.config().baseUrl + "posts");
  });
}

// End of reusable test bits

describe("Signing up and logging in", () => {
  // Add a user, log in as them, make sure the cookie is set, log out, log back in

  signup();
  sessionCookie();

  // How can we check that we've been logged in as the correct user?
  // (Post something and check the username? Doesn't seem great!)

  postsRoute();

  it("Logout deletes cookie", () => {
    cy.visit("/logout");
    cy.getCookie(sessionIdCookieName).should("eq", null);
  });

  login();
  postsRoute();
  sessionCookie();
});

describe("Adding posts", () => {
  // Sign up (automatically logged in)
  // Add a post (with upload)
  // Check the post appears
  // Stretch:
  // Download the image from the post
  // Compare the image with the one that was uploaded

  signup();
  sessionCookie();
  postsRoute();

  it("Submit new post form", () => {
    cy.get(postTitleInputSelector).type(postTitle);
    cy.get(postAltTextInputSelector).type(postAltText);
    cy.get(postFileInputSelector).selectFile("test_image.jpg");
    cy.get("form").submit();
  });

  postsRoute();

  // it("Check post was added", () => {
  //   cy.get
  // });
});

describe("Deleting posts", () => {
  // Sign up (automatically logged in)
  // Add a post (no upload needed)
  // Check the post appears
  // Log out
  // Sign up (automatically logged in)
  // Add a post (no uploaded needed)
  // Try to delete the first post (made with another user account) - it should fail
  // Try to delete the second post - it should succeed
  //signup();
});

after(() => {
  cy.task("resetDb");
});
