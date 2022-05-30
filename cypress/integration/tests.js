beforeEach(() => {
  cy.task("resetDb");
});

it("test test :)", () => {
  // Visit the baseURL.
  cy.visit("/");
});

after(() => {
  cy.task("resetDb");
});
