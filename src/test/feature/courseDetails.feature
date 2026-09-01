@Akksheetha @coursedetails
Feature: Akksheetha - Course Details

    Background:
        Given user is on the LMS application
        And the user login with valid credentials
        And the user navigate to the My Courses page

    @openCourse
    Scenario: User opens an existing course from My Courses
        When the user select the existing course
        Then the course details page should be displayed

    @courseTitle
    Scenario: User verifies the course title
        When the user select the existing course
        Then the selected course title should be displayed

    @courseDescription
    Scenario: User verifies the course description
        When the user select the existing course
        Then the course description should be displayed

    @courseContent
    Scenario: User verifies the course content
        When the user select the existing course
        Then the course content should be displayed

    @startCourse
    Scenario: User starts an existing course
        When the user select the existing course
        And the user click the start course button
        Then the course should be started successfully