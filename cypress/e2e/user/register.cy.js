describe("register should have", () => {
	beforeEach(() => {
		cy.viewport("iphone-6+");

		cy.visit("/register");
	});

	it("a register title", () => {
		cy.contains("h1", "Sign Up");
	});

	it("a link for login", () => {
		cy.contains("Have already an account?").should(
			"have.attr",
			"href",
			"/login"
		);
	});

	it("empty form validation", () => {
		cy.get("form").contains("Register").click();

		cy.get(".error-messages").should("have.length.at.least", 5);
	});

	it("validation for email", () => {
		cy.get("[data-test=email]").type("christophertineo{enter}");
		cy.get(".error-messages").should(
			"contain",
			"email must be a valid email"
		);
	});

	it("validation for email confirmation", () => {
		cy.get("[data-test=email]").type("christophertineo02@gmail.com");
		cy.get("[data-test=confirmEmail]").type(
			"christophertineo0@gmail.com{enter}"
		);
		cy.get(".error-messages").should("contain", "emails must match");
	});

	it("validation for password confirmation", () => {
		cy.get("[data-test=password]").type("christophertineo");
		cy.get("[data-test=confirmPassword").type("christineo{enter}");
		cy.get(".error-messages").should("contain", "passwords must match");
	});

	it("navigates to login page in successul register", () => {
		cy.get("[data-test=email]").type("christineo");
		cy.get("[data-test=password").type("852951TineoC");
		cy.hash().should("eq", "/login");
	});
});
