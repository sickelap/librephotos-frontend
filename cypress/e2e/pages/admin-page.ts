import type { DataTable } from "@badeball/cypress-cucumber-preprocessor";

import { CommonActions } from "./common-actions";

export class AdminPage extends CommonActions {
  path = "/admin";

  isActivePage() {
    cy.get("h2").should("have.text", "Site Settings");
  }

  setInputValue(label: string, value: string) {
    cy.get("label").contains(label).parent().find("input").clear().type(value);
  }

  setPasswordWithConfirmation(label: string, value: string) {
    cy.get("div").contains(label).parent().parent().find('input[placeholder="Password"]').clear().type(value);
    cy.get("div").contains(label).parent().parent().find('input[placeholder="Confirm Password"]').clear().type(value);
  }

  updateUserFormWith(data: DataTable) {
    Object.keys(data.rowsHash()).forEach(label => {
      const value = data.rowsHash()[label];
      if (label.match(/password/i)) {
        this.setPasswordWithConfirmation(label, value);
      } else {
        this.setInputValue(label, value);
      }
    });
  }

  userExist(username: string) {
    cy.get("h3")
      .contains("Users")
      .siblings()
      .find("table")
      .within(() => {
        cy.find("td").contains(username);
      });
  }

  deleteUserAPI(username: string) {
    cy.request({ method: "GET", url: "/api/user/" })
      .then(userResponse =>
        cy
          .request({
            method: "POST",
            url: "/api/auth/token/obtain/",
            body: { username: "admin", password: "admin" },
          })
          .then(response => response.body.access)
          .then(token => ({ token, user: userResponse.body.results.find(u => u.username === username) }))
      )
      .then(({ token, user }) => {
        if (user) {
          cy.request({
            method: "DELETE",
            url: `/api/delete/user/${user.id}/`,
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      });
  }
}
