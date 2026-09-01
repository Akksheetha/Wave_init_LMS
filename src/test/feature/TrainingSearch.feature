# @Darshan @trainingsearch
# Feature: DarshanRaj - 25th July - Search courses

#     Background:
#         Given user is on the LMS application
#         And the user login with valid credentials
#         And the user navigate to the Dashboard
#         And the user clicks Explore Courses Button

#     @ValidSearch
#     Scenario Outline: User search for an existing training course by the exact course name
#         When the user enters the "<courseName>" in the search bar field
#         Then the matching training course should be displayed in the list
    
#     Examples:
#         | courseName             |
#         | Manual Testing         |
#         | manual testing         |
#         | MANUAL TESTING         |
#         | ManUAL TesTIng         |
    
#     @InvalidSearch
#     Scenario: User search for an existing training course by the invalid course name
#         When the user enters the invalid value in the search bar field
#         Then the system should display no matches message
    
#     @PartialSearch
#     Scenario: User search for a training course using a partial course name 
#         When the user enters a partial course name in the search bar field
#         Then the matching training course should be displayed in the list



#Improved code
@Darshan @trainingsearch
Feature: DarshanRaj - 25th July - Search courses

    Background:
        Given user is on the LMS application
        When the user enter the valid userName as "titooram123@gmail.com"
        And the user enter the valid password as "sriram123@"
        And the user click sigin button
        Then the user should see the dashboard page after successfully login
        And the user clicks Explore Courses Button

    @ValidSearch
    Scenario Outline: User searches for an existing training course by exact course name
        When the user enters the "<courseName>" in the search bar field
        Then the matching training course "Manual Testing" should be displayed in the list

        Examples:
            | courseName     |
            | Manual Testing |
            | manual testing |
            | MANUAL TESTING |
            | ManUAL TesTIng |

    @InvalidSearch
    Scenario: User searches for a training course using an invalid course name
        When the user enters the invalid value "Manual 123" in the search bar field
        Then the system should display the no matches message

    @PartialSearch
    Scenario: User searches for a training course using a partial course name
        When the user enters a partial course name "Manual" in the search bar field
        Then the matching training course "Manual Testing" should be displayed in the list

