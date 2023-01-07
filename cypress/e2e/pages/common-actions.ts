/// <reference types="cypress" />
/// <reference path="../../support/commands.ts" />

export const USERS = {
  admin: "admin",
  user: "Password1",
  user2: "Password1",
};

export abstract class CommonActions {
  abstract path: string;

  visit() {
    cy.visit(this.path);
  }

  abstract isActivePage();

  locationShouldBe(expectedLocation: string) {
    cy.location().should(location => {
      expect(location.pathname).to.eq(expectedLocation);
    });
  }

  authenticate(username: string, password: string) {
    cy.session([username, password], () => {
      cy.request("POST", "/api/auth/token/obtain/", { username, password }).then(({ body }) => {
        window.localStorage.setItem("JWT", body.access);
      });
    });
  }

  pressButton(label: string) {
    cy.get("button > div.mantine-Button-inner > span.mantine-Button-label")
      .contains(label)
      .parentsUntil("button")
      .click();
  }
}
