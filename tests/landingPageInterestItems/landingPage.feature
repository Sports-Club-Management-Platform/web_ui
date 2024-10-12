Feature: Landing Page Items

  Scenario: Landing Page Contains Login Button that redirects to login_sign_up page
    Given a new user,
    When they visit the landing page
      And select “Login“ button,
    Then the user should be redirected to the login_sign_up page.

  Scenario: Landing Page Contains Register Button that redirects to login_sign_up page
    Given a new user,
    When they visit the landing page
    And select “Register“ button,
    Then the user should be redirected to the login_sign_up page.

  Scenario: Landing Page Contains Become a Member Button
    Given a new user,
    When they visit the landing page
    Then there should exist a "Tornar-se Sócio" button

  Scenario: Landing Page Contains Buy Tickets Button
    Given a new user,
    When they visit the landing page
    Then there should exist a "Comprar Bilhetes" button
