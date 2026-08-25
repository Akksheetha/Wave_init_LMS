@Akksheetha @searchcourse
Feature: Akksheetha - 25th July - Search courses

    Background:
        Given user is on the LMS application
        And the user login with valid credentials
        And the user navigate to the My Courses page

    @validcourse
    Scenario: User search for an existing course using the exact course name
        When the user enter the existing course name in the search field
        And the user search for the course
        Then the matching course should be displayed in the course list
 
    @partialSearch
    Scenario: User search for a course using a partial course name
        When the user enter a partial course name in the search field
        Then the courses matching the search text should be displayed

    @invalidcourse
    Scenario: User search for a course that does not exist
        When the user enter a non-existing course name in the search field
        Then no courses should be displayed
        And the user should see "No courses found matching your criteria" message

    @clear
    Scenario: User clear the course search field
        When the user enter a course name in the search field
        And the matching course should be displayed
        When the user clear the search field
        Then the search field should be empty
        And all available courses should be displayed

    @casing
    Scenario: User search for a course using different letter casing
        When the user enter an existing course name with different letter casing in the search field
        Then all the matching course should be displayed
        And the search result should match the entered course
    