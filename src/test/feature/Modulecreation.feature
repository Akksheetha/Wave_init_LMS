
Feature: Janani_25AUG2026_Trainer_creates_a_Module_inside_a_course

   
    Background:
        Given the trainer is on the WaveInit login page
        When the trainer selects Trainer login
        And the trainer enters valid login details
        And the trainer clicks the Sign in button
        Then the Trainer Dashboard should be displayed
    @ModuleCreation
    Scenario Outline: Trainer creates a new module with a valid title
        When the trainer clicks "My Trainings"
        And the trainer clicks the course "<courseName>"
        And the trainer clicks the "Lessons" tab
        And the trainer clicks the "Add Module" button
        And the trainer enters "<moduleTitle>" as the module title
        And the trainer clicks the "Create Module" button
        Then the module "<moduleTitle>" should be added as the last module

        Examples:
            | courseName        | moduleTitle                          |
            | React Fundamental | Advanced Hooks & Context API         |
            | React Fundamental | State Management with Redux Toolkit  |
            | React Fundamental | Testing React Components with RTL    |
        
    @Janani
    Scenario Outline: Trainer tries to create a module without a title
        When the trainer clicks "My Trainings"
        And the trainer clicks the course "<courseName>"
        And the trainer clicks the "Lessons" tab
        And the trainer clicks the "Add Module" button
        And the trainer enters "<moduleTitle>" as the module title
        And the trainer clicks the "Create Module" button
        Then the error message "<message>" should be displayed briefly

        Examples:
            | courseName        | moduleTitle | message           |
            | React Fundamental |             | Title is required |
            | react              |             | Title is required |