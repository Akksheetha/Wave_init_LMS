@jeeva
Feature: JeevaPranesh_26-08-2026_Update the skill in the my profile page

Feature Description

        Background:
            Given user launch the waveInit application
             When the user login with validData using excel

        Scenario: user go to the My Profile website
             When the user click the user name in the left bottom coner
              And click the My Profile
             Then user should navigate to the My Profile Page

        Scenario: user add a skill using CSV
             When the user click the user name in the left bottom coner
              And click the My Profile
              And the user click Add Skill
              And the user enter the skill from CSV
              And the user click the Add Skill button
             Then the skill should be added to the profile

        Scenario: user add a suggested skill using CSV
             When the user click the user name in the left bottom coner
              And click the My Profile
              And the user click Add Skill
              And the user select the skill suggestion from CSV
             Then the suggested skill should be added to the profile

     #    Scenario:user delete the existing skill
     #         When the user click the user name in the left bottom coner
     #          And click the My Profile
     #          And the user click the xmake of one skill
     #          And the user clik the delete button
     #         Then the particular skill is deleted from the skill position
          
