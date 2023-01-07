Feature: Manage users

  Scenario: Create user
    When I create user with following details:
      | User name                | user1           |
      | E-mail                   | user1@email.com |
      | First name               | First           |
      | Last name                | Last            |
      | Set Password             | password        |
      | User's current directory | /data/Landscape |
    Then user "user" should be in the list of users
