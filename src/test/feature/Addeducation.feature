@Janani
Feature: Janani_28AUG2026_Trainer_adds_Education_details_to_their_profile

    Background:
        Given the trainer is on the WaveInit login page
        When the trainer selects Trainer login
        And the trainer enters valid login details
        And the trainer clicks the Sign in button
        Then the Trainer Dashboard should be displayed
    
     Scenario: Trainer adds a valid education record
        When the trainer opens "My Profile"
        And the trainer clicks the "Add" button in the Education section
        And the trainer fills the education form using "valid" data
        And the trainer submits the education form
        Then the education record from "valid" data should be added to the profile

    Scenario: Trainer tries to add education without an Institution
        When the trainer opens "My Profile"
        And the trainer clicks the "Add" button in the Education section
        And the trainer fills the education form using "missingInstitution" data
        And the trainer submits the education form
        Then the education form should show the validation errors from "missingInstitution" data

    Scenario: Trainer tries to add education without a Degree
        When the trainer opens "My Profile"
        And the trainer clicks the "Add" button in the Education section
        And the trainer fills the education form using "missingDegree" data
        And the trainer submits the education form
        Then the education form should show the validation errors from "missingDegree" data

    Scenario: Trainer tries to add education without an Institution and a Degree
        When the trainer opens "My Profile"
        And the trainer clicks the "Add" button in the Education section
        And the trainer fills the education form using "missingBoth" data
        And the trainer submits the education form
        Then the education form should show the validation errors from "missingBoth" data

   