beforeEach(() => {
  cy.task("resetDb");
});

it("test test :)", () => {
  // Visit the baseURL.
  cy.visit("/");
});

it("/login route shows login form", () => {
  cy.visit("/login");
  cy.get("form");
});

after(() => {
  cy.task("resetDb");
});
