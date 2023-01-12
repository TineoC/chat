describe("/", () => {
	beforeEach(() => {
		cy.viewport("iphone-6+");

		cy.visit("/login");
	});
});
