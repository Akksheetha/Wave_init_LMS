@Darshan @Signup
Feature: DarshanRaj - 27th July - Participant Sign Up

    Background:
        Given user is on the LMS application
        And the user clicks on sign up as participant link
    

    @ValidSignup
    Scenario Outline: User signup with valid details
    When the user enters the "<username>" in the create account page
    And the user enters the "<email>" in the create account page
    And the user enters the "<phone>" in the create account page
    And the user enters the "<password>" in the create account page
    And the user enters the "<repassword>" in the create account page
    And the user clicks create account button
    Then the user gets a success message

Examples:
    | username | email               | phone      | password   | repassword |
    | Darshan  | darshan10@gmail.com | 1234567890 | darshan@10 | darshan@10 |
    
    
    @InvalidSignup
    Scenario Outline: User signup with invalid details
    When the user enters the "<username>" in the create account page
    And the user enters the "<email>" in the create account page
    And the user enters the "<phone>" in the create account page
    And the user enters the "<password>" in the create account page
    And the user enters the "<repassword>" in the create account page
    And the user clicks create account button
    Then the user gets an error message

Examples:
    | username | email               | phone      | password   | repassword |
    | Darshan  |                     | 1234567890 | darshan@10 | darshan@!0 |
    | Darshan  | darshan10@gmail.com | 1234567890 |            |            |
    | Darshan  | darshan10@gmail.com |            | darshan@10 | darshan@10 |


    @InvalidSignup
    Scenario: User create account with empty fields
        When the user clicks create account button without filling any details
        Then the user gets the details should be filled message
    
    @InvalidSignup
    Scenario: User create account with already registered mail
        When the user enter the already registered details
        And the user clicks create account button
        Then the user gets the error message
    
    
