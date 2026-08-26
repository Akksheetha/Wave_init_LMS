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
        Then the user should see "No courses found matching your criteria" message

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

    @spaces
   Scenario: User search for a course with leading and trailing spaces
        When the user enter an existing course name with spaces in the search field
        Then the user should see "No courses found matching your criteria" message

    @specialcharacters
   Scenario: User search for a course using special characters
        When the user enter special characters in the search field
        Then the user should see "No courses found matching your criteria" message

    @numericSearch
   Scenario: User search for a course using numeric characters
        When the user enter numeric characters in the search field
        Then the user should see "No courses found matching your criteria" message

    @modifySearch
    Scenario: User modify the course search text and verify updated results
        When the user enter the existing course name in the search field
        Then the matching course should be displayed in the course list
        When the user modify the search text with a partial course name
        Then the courses matching the updated search text should be displayed
    