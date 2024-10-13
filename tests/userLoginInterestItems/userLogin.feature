Feature: User Login Items

    Scenario: Login Page Contains Login Form
        Given a registered user,
        When they visit the login page
        And enter valid credentials,
        Then they should be able to log in successfully, access their account and the intended features.

    Scenario: Login Page Contains Google Login Button
        Given a registered user,
        When they visit the login page
        And select “Continue with google” button
        And select their google account,
        Then they should be able to log in successfully, access their account and the intended features.