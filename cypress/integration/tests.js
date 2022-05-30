beforeEach(() => {
  cy.task("resetDb");
});

it("test test :)", () => {
  // Visit the baseURL.
  // Don't fail on 401, which is our app's default response to users that aren't logged in!
  cy.visit("/", { failOnStatusCode: false });
});

after(() => {
  cy.task("resetDb");
});
