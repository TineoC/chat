describe("/login", () => {
  beforeEach(() => {
    cy.viewport("iphone-6+");

    cy.visit("/login");
  });

  it("shows login title", () => {
    cy.contains("h1", "Sign In");
  });

  it("navigates to homepage in successul login", () => {
    cy.hash().should("eq", "/");
  });
});
