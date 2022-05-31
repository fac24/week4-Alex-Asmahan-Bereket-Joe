beforeEach(() => {
  cy.task("resetDb");
});

it("test test :)", () => {
  // Visit the baseURL.
  cy.visit("/");
});

describe("Signing up and logging in", () => {
  // Add a user, log in as them, make sure the cookie is set, log out, log back in

  const username = "auniqueuserfortesting";
  const password = "aspecialpasswordjustfortesting123";

  const usernameInputSelector = "input[name='username']";
  const passwordInputSelector = "input[id='password']";

  const sessionIdCookieName = "sid";

  it("Submit signup form on /signup route", () => {
    cy.visit("/signup");
    cy.get(usernameInputSelector).type(username);
    cy.get(passwordInputSelector).type(password);
    cy.get("form").submit();
  });

  it("Given session cookie", () => {
    // https://docs.cypress.io/api/commands/getcookie#Arguments
    // "When a cookie matching the name could not be found: cy.getCookie() yields null."
    cy.getCookie(sessionIdCookieName).should("not.eq", null);
  });

  // How can we check that we've been logged in as the correct user?
  // (Post something and check the username? Doesn't seem great!)

  it("Redirected to /posts route", () => {
    cy.url().should("eq", Cypress.config().baseUrl + "posts");
  });

  it("Logout deletes cookie", () => {
    cy.visit("/logout");
    cy.getCookie(sessionIdCookieName).should("eq", null);
  });

  it("Submit login form on /login route", () => {
    cy.visit("/login");
    cy.get(usernameInputSelector).type(username);
    cy.get(passwordInputSelector).type(password);
    cy.get("form").submit();
  });

  // To avoid repetition of these tests, we could use custom commands:
  // https://docs.cypress.io/api/cypress-api/custom-commands
  // (Do that after you've established the tests work properly :)
  it("Redirected to /posts route", () => {
    cy.url().should("eq", Cypress.config().baseUrl + "posts");
  });

  it("Given session cookie", () => {
    cy.getCookie(sessionIdCookieName).should("not.eq", null);
  });
});

describe("Adding posts", () => {
  // Sign up (automatically logged in)
  // Add a post (with upload)
  // Check the post appears
  // Stretch:
  // Download the image from the post
  // Compare the image with the one that was uploaded
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
});

after(() => {
  cy.task("resetDb");
});
