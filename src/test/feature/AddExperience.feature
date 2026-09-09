@Janani @AddExperience
Feature:Janani_02SEP2026_Admin_adds_Experience_to_their_profile
    Background:
        Given the admin is on the WaveInit login page
        When the admin selects the Admin Login option
        And the admin enters valid admin credentials
        And the admin clicks the Login button
        Then the admin should be logged in successfully
        And the admin should be redirected to the Admin Dashboard
        And the admin opens the account menu
        And the admin opens "My Profile"
        And the admin clicks the "Experience" button on the experience form

    Scenario: Admin adds a valid experience record
        When the admin fills the experience form using "valid" data
        And the admin clicks the "Add Experience" button on the experience form
        Then the experience record from "valid" data should be added to the profile

    Scenario Outline: Admin tries to add experience with missing mandatory fields
        When the admin fills the experience form using "<scenarioType>" data
        And the admin clicks the "Add Experience" button on the experience form
        Then the experience form should show the validation errors from "<scenarioType>" data

        Examples:
            | scenarioType         |
            | missingCompany       |
            | missingRole          |
            | missingStartDate     |
            | missingAllMandatory  |