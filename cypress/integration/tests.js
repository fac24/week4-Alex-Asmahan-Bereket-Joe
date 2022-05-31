beforeEach(() => {
  cy.task("resetDb");
});

it("test test :)", () => {
  // Visit the baseURL.
  cy.visit("/");
});

describe("Signing up and logging in", () => {
  // Add a user, log in as them, make sure the cookie is set

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

  it("Given session cookie and redirected to /posts route", () => {
    cy.getCookie(sessionIdCookieName);
    cy.url().should("eq", Cypress.config().baseUrl + "posts");
  });

  // it("Submit login form on /login route", () => {
  //   cy.visit("/login");
  //   cy.get(usernameInputSelector).type(username);
  //   cy.get(passwordInputSelector).type(password);
  //   cy.get("form").submit();
  // });
});

after(() => {
  cy.task("resetDb");
});
