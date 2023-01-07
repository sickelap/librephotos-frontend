import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import type { DataTable } from "@badeball/cypress-cucumber-preprocessor";

import { AdminPage } from "../pages/admin-page";
import { LoginPage } from "../pages/login-page";

const adminPage = new AdminPage();
const loginPage = new LoginPage();

When(/^I create user with following details:$/, (data: DataTable) => {
  loginPage.authenticate("admin", "admin");
  adminPage.visit();
  adminPage.pressButton("Add New User");
  adminPage.updateUserFormWith(data);
  adminPage.pressButton("Save");
});

Then(/^user "([^"]*)" should be in the list of users$/, (username: string) => adminPage.userExist(username));
