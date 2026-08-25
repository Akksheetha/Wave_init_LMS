@Janani
Feature: Janani_25AUG2026_Learner Discussions - Create Posts and Verify Visibility

Background:
    Given user is lanuch the application
    When the user enter the valid userName as "titooram123@gmail.com"
    And the user enter the valid password as "sriram123@"
    And the user click sigin button
    Then the user should see the dashboard page after successfully login
    And the learner opens "My Courses"
    And the learner opens the course from test data
    And the learner clicks on the "Discussions" tab

Scenario Outline: Learner creates a <postType> and verifies it appears in the correct tab
    When the learner selects "<postType>" from the post type dropdown
    And the learner enters the message for "<postType>" from test data
    And the learner clicks the "Post" button
    Then the posted message should be visible under the "<specificTab>" tab
    And the posted message should be visible under the "All Posts" tab

Examples:
    | postType    | specificTab |
    | Normal Post | Discussions |
    | Question    | Q&A         |