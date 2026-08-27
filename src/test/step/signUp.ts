import { Given, When, Then } from '@cucumber/cucumber';
import { customworld } from '../world/customWorld';
import { signUpPage } from '../pages/signUpPage';
import signUpData from '../testData/SignUp.json';

Given(
    'user is on the Sign Up page',
    async function (this: customworld) {
        await this.login.launch();
        await this.signUp.signupClick();
    }
);

When(
    'the user enters the sign up details',
    async function (this: customworld) {

        await this.signUp.enterSignUpDetails(signUpData);
    }
);

When(
    'the user submits the sign up form',
    async function (this: customworld) {

        await this.signUp.submitForm();
    }
);

Then(
    'the password mismatch message should be displayed',
    async function (this: customworld) {

        await this.signUp.verifyPasswordMismatch();
    }
);