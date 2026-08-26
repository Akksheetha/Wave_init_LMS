@Akksheetha @signup
Feature: Akksheetha - 26th July - Sign Up

    Scenario: User should not sign up with mismatched passwords
        Given user is on the Sign Up page
        When the user enters the sign up details
        And the user submits the sign up form
        Then the password mismatch message should be displayed