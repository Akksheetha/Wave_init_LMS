import { expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { customworld } from '../world/customWorld';
import trainerLoginData from '../testdata/trainerLogin.json';

Given(
    'the trainer is on the WaveInit login page',
    async function (this: customworld) {

        await this.trainerLogin.launch();
    }
);

When(
    'the trainer selects Trainer login',
    async function (this: customworld) {

        await this.trainerLogin.switchToTrainer();
    }
);

When(
    'the trainer enters valid login details',
    async function (this: customworld) {

        await this.trainerLogin.EnterUnsername(
            trainerLoginData.validTrainer.email
        );

        await this.trainerLogin.EnterPass(
            trainerLoginData.validTrainer.password
        );
    }
);

When(
    'the trainer enters {string} as email',
    async function (this: customworld, email: string) {

        await this.trainerLogin.EnterUnsername(email);
    }
);

When(
    'the trainer enters {string} as password',
    async function (this: customworld, password: string) {

        await this.trainerLogin.EnterPass(password);
    }
);

When(
    'the trainer clicks the Sign in button',
    async function (this: customworld) {

        await this.trainerLogin.signClick();
    }
);

Then(
    'the trainer should be logged in',
    async function (this: customworld) {

        const welcome = await this.trainerLogin.WelcomText();

        await expect(welcome).toBeVisible();
    }
);

Then(
    'the Trainer Dashboard should be displayed',
    async function (this: customworld) {

        const welcome = await this.trainerLogin.WelcomText();

        await expect(welcome).toBeVisible();
    }
);

Then(
    'the trainer should not be logged in',
    async function (this: customworld) {
        await expect(this.page).toHaveURL(
            'https://www.waveinitlms.online/'
        );
    }
);
Then(
    'the message {string} should be displayed',
    async function (this: customworld, message: string) {

        if (message === 'Please fill out this field.') {

            const validationMessage =
                await this.trainerLogin.getValidationMessage();

            expect(validationMessage).toContain(
                'Please fill out this field.'
            );

        } else {

            const errorMessage =
                await this.trainerLogin.Errormsg();

            await expect(errorMessage).toHaveText(message);
        }
    }
);