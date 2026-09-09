# @Darshan @Signup
# Feature: DarshanRaj - 27th July - Participant Sign Up

#     Background:
#         Given user is on the LMS application
#         And the user clicks on sign up as participant link
    

#     @ValidSignup
#     Scenario Outline: User signup with valid details
#     When the user enters the "<username>" as username in the create account page
#     And the user enters the "<email>" as email in the create account page
#     And the user enters the "<phone>" as phone in the create account page
#     And the user enters the "<password>" as password in the create account page
#     And the user enters the "<repassword>" as confirm password in the create account page
#     And the user clicks create account button
#     Then the user gets a success message

# Examples:
#     | username | email   | phone      | password   | repassword |
#     | Darshan  | darshan | 1234567890 | Darshan@10 | Darshan@10 |

    
#     @InvalidSignup @SameMailSignUp
#     Scenario Outline: User create account with already registered mail
#         When the user enter the already registered "<username>" "<email>" "<phone>" "<password>" "<repassword>" details
#         And the user clicks create account button
#         Then the user gets the error message
    
#     Examples:
#     | username | email               | phone      | password   | repassword |
#     | Darshan  | darshan10@gmail.com | 1234567890 | Darshan@10 | Darshan@10 |
#     | Raj      | DarSHan10@GmaIL.COm | 0987654321 | Darshan@10  | Darshan@10  |
#     | Jayapal  | DARSHAN10@GMAIL.COM | 1234509876 | Darshan@10 | Darshan@10 |


#     @InvalidSignup
#     Scenario: User enter mismatched password
#         When the user enters the register details with mismatched password
#         And the user clicks create account button
#         Then the user gets the mismatch error message
    
#     @InvalidSignup
#     Scenario: User does not agree terms of service
#         When the user enter the valid register details and does not check terms of service
#         Then the user gets the terms of service error message




#Updated Code
@Darshan @Signup
Feature: DarshanRaj - Participant Sign Up

    Background:
        Given user is on the LMS application
        And the user clicks on sign up as participant link

    @ValidSignup
    Scenario Outline: User signup with valid details
        When the user enters signup details "<username>", "<email>", "<phone>", "<password>", "<repassword>"
        And the user clicks create account button
        Then the user gets a success message

    Examples:
        | username | email   | phone      | password   | repassword |
        | Darshan  | darshan | 1234567890 | Darshan@10 | Darshan@10 |


    @InvalidSignup @SameMailSignUp
    Scenario Outline: User create account with already registered mail
        When the user enters signup details "<username>", "<email>", "<phone>", "<password>", "<repassword>"
        And the user clicks create account button
        Then the user gets the error message

    Examples:
        | username | email               | phone      | password   | repassword |
        | Darshan  | darshan10@gmail.com  | 1234567890 | Darshan@10 | Darshan@10 |
        | Raj      | DarSHan10@GmaIL.COm  | 0987654321 | Darshan@10 | Darshan@10 |
        | Jayapal  | DARSHAN10@GMAIL.COM  | 1234509876 | Darshan@10 | Darshan@10 |


    @InvalidSignup
    Scenario: User enters mismatched password
        When the user enters signup details with mismatched password
        And the user clicks create account button
        Then the user gets the mismatch error message


    @InvalidSignup
    Scenario: User does not agree terms of service
        When the user enters valid signup details without accepting terms
        And the user clicks create account button
        Then the user gets the terms of service error message

