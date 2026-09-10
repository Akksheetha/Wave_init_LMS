import {
    Given,
    When,
    Then
} from '@cucumber/cucumber';

import { expect } from '@playwright/test';

import { customworld } from '../world/customWorld';

import trainerData from '../testdata/trainerData.json';

import adminLoginData from '../testdata/adminLogin.json';


let createdTrainerEmail: string;


Given(
    'the admin logs into the application',

    async function (this: customworld) {

        await this.adminLogin.launch();


        await this.adminLogin.switchToAdmin();


        await this.adminLogin.enterUsername(
            adminLoginData.validAdmin.username
        );


        await this.adminLogin.enterPassword(
            adminLoginData.validAdmin.password
        );


        await this.adminLogin.signInClick();
    }
);


Given(
    'the admin navigates to the Trainers page',

    async function (this: customworld) {

        await this.addTrainer.clickTrainers();
    }
);


When(
    'the admin clicks the Add Trainer button',

    async function (this: customworld) {

        await this.addTrainer.clickAddTrainer();
    }
);


When(
    'the admin fills all trainer details with valid data',

    async function (this: customworld) {

        createdTrainerEmail =
            `trainer${Date.now()}@company.com`;


        await this.addTrainer.fillAllTrainerDetails({

            fullName:
                trainerData.fullName,

            email:
                createdTrainerEmail,

            mobile:
                trainerData.mobile,

            department:
                trainerData.department,

            designation:
                trainerData.designation,

            experience:
                trainerData.experience,

            password:
                trainerData.password,

            confirmPassword:
                trainerData.confirmPassword
        });
    }
);


When(
    'the admin fills only the mandatory trainer details',

    async function (this: customworld) {

        createdTrainerEmail =
            `trainer${Date.now()}@company.com`;


        await this.addTrainer.fillMandatoryTrainerDetails({

            fullName:
                trainerData.fullName,

            email:
                createdTrainerEmail,

            password:
                trainerData.password,

            confirmPassword:
                trainerData.confirmPassword
        });
    }
);


When(
    'the admin fills all trainer details except confirm password',

    async function (this: customworld) {

        createdTrainerEmail =
            `trainer${Date.now()}@company.com`;


        await this.addTrainer.fillAllTrainerDetails({

            fullName:
                trainerData.fullName,

            email:
                createdTrainerEmail,

            mobile:
                trainerData.mobile,

            department:
                trainerData.department,

            designation:
                trainerData.designation,

            experience:
                trainerData.experience,

            password:
                trainerData.password,

            confirmPassword:
                ''
        });
    }
);


When(
    'the admin fills all trainer details with an invalid email',

    async function (this: customworld) {

        await this.addTrainer.fillAllTrainerDetails({

            fullName:
                trainerData.fullName,

            email:
                trainerData.invalidEmail,

            mobile:
                trainerData.mobile,

            department:
                trainerData.department,

            designation:
                trainerData.designation,

            experience:
                trainerData.experience,

            password:
                trainerData.password,

            confirmPassword:
                trainerData.confirmPassword
        });
    }
);


When(
    'the admin fills all trainer details with mismatched confirm password',

    async function (this: customworld) {

        createdTrainerEmail =
            `trainer${Date.now()}@company.com`;


        await this.addTrainer.fillAllTrainerDetails({

            fullName:
                trainerData.fullName,

            email:
                createdTrainerEmail,

            mobile:
                trainerData.mobile,

            department:
                trainerData.department,

            designation:
                trainerData.designation,

            experience:
                trainerData.experience,

            password:
                trainerData.password,

            confirmPassword:
                trainerData.mismatchedConfirmPassword
        });
    }
);


When(
    'the admin clicks the Create Trainer button',

    async function (this: customworld) {

        await this.addTrainer.clickCreateTrainer();
    }
);

Then(
    'the trainer should be created successfully',
    async function (this: customworld) {

        // Navigate to Trainers page
        await this.addTrainer.clickTrainers();

        // Verify newly created trainer
        await this.addTrainer.verifyTrainerCreated(
            createdTrainerEmail
        );
    }
);


Then(
    'the admin should see the message {string}',

    async function (
        this: customworld,
        expectedMessage: string
    ) {


        if (
            expectedMessage
                .toLowerCase()
                .includes('valid email')
        ) {

            const validationMessage =
                await this.addTrainer.emailInput.evaluate(
                    (
                        element: HTMLInputElement
                    ) =>
                        element.validationMessage
                );


            expect(
                validationMessage
                    .toLowerCase()
            ).not.toBe('');


            return;
        }


        await this.addTrainer.verifyMessage(
            expectedMessage
        );
    }
);