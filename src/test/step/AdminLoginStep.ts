import { expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';

import { customworld } from '../world/customWorld';
import adminLoginData from '../testdata/adminLogin.json';


Given(
    'the admin is on the WaveInit login page',

    async function (this: customworld) {

        await this.adminLogin.launch();
    }
);


When(
    'the admin selects the Admin Login option',

    async function (this: customworld) {

        await this.adminLogin.switchToAdmin();
    }
);


When(
    'the admin enters valid admin credentials',

    async function (this: customworld) {

        await this.adminLogin.enterUsername(
            adminLoginData.validAdmin.username
        );

        await this.adminLogin.enterPassword(
            adminLoginData.validAdmin.password
        );
    }
);


When(
    'the admin enters {string} as username',

    async function (
        this: customworld,
        username: string
    ) {

        await this.adminLogin.enterUsername(username);
    }
);


When(
    'the admin enters {string} as password',

    async function (
        this: customworld,
        password: string
    ) {

        await this.adminLogin.enterPassword(password);
    }
);


When(
    'the admin clicks the Login button',

    async function (this: customworld) {

        await this.adminLogin.signInClick();
    }
);


Then(
    'the admin should be logged in successfully',

    async function (this: customworld) {

        const dashboard =
            await this.adminLogin.dashboardElement();

        await expect(dashboard).toBeVisible();
    }
);


Then(
    'the admin should be redirected to the Admin Dashboard',

    async function (this: customworld) {

        const dashboard =
            await this.adminLogin.dashboardElement();

        await expect(dashboard).toBeVisible();
    }
);


Then(
    'the admin should not be logged in',

    async function (this: customworld) {

        const adminLogin =
            await this.adminLogin.adminMode;

        await expect(adminLogin).toBeVisible();
    }
);


Then(
    'the admin should see {string}',

    async function (
        this: customworld,
        expectedMessage: string
    ) {

        if (
            expectedMessage ===
            'Please fill out this field.'
        ) {

            const validationMessage =
                await this.adminLogin
                    .getValidationMessage();

            expect(validationMessage).toContain(
                'Please fill out this field.'
            );

        } else {

            const errorMessage =
                await this.adminLogin.errorMessage();

            await expect(errorMessage)
                .toHaveText(expectedMessage);
        }
    }
);