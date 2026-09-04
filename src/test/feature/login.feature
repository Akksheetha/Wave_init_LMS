@jeeva
Feature:JeevaPranesh_24-08-2026_Login_functionality_

Feature Description

        Background:
            Given user is lanuch the application

        Scenario: user login in the waveInit website usingValid Input
             When the user enter the valid userName as "titooram123@gmail.com"
              And the user enter the valid password as "sriram123@"
              And the user click sigin button
             Then the user should see the dashboard page after successfully login

        Scenario Outline:user login with invalid Input in waveInit website
             When the user enter the userName as "<usename>"
              And the user enter the password as "<pass>"
              And the user click sigin button
             Then the user unable to login and get error message as "<message>"

        Examples:
                  | usename               | pass          | message                    |
                  | titooram123@gmail.com | srira         | Invalid email or password  |
                  | jeeva1234             | sriram123@    | Invalid email or password  |
                  | hari@123              |               | Please fill out this field |
                  |                       | password12345 | Please fill out this field |
