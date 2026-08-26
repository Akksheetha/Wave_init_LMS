
Feature: Trainer Login 25_08_2026 

    This feature checks whether a trainer can log in to WaveInit LMS
    using valid or invalid login details.

    Background:
        Given the trainer is on the WaveInit login page

    Scenario: Login with valid trainer details
        When the trainer selects Trainer login
        And the trainer enters valid login details
        And the trainer clicks the Sign in button
        Then the trainer should be logged in
        And the Trainer Dashboard should be displayed

    Scenario Outline: Login with invalid trainer details
        When the trainer selects Trainer login
        And the trainer enters "<email>" as email
        And the trainer enters "<password>" as password
        And the trainer clicks the Sign in button
        Then the trainer should not be logged in
        And the message "<message>" should be displayed

        Examples:
            | email            | password   | message                     |
            | fake@wave.com    | wrong@123  | Invalid email or password   |
            | trainer@wave.com | wrong@123  | Invalid email or password   |
            | wrong@wave.com   | trainer123 | Invalid email or password   |
            |                  | trainer123 | Please fill out this field. |
            | trainer@wave.com |            | Please fill out this field. |
            |                  |            | Please fill out this field. |