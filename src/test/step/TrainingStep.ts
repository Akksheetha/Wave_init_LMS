import {
    Given,
    When,
    Then
} from '@cucumber/cucumber';

import { customworld } from '../world/customWorld';

import adminLoginData from '../testdata/adminLogin.json';
import createTrainingData from '../testdata/trainingData.json';
import editTrainingData from '../testdata/editTrainingData.json';
import searchTrainingData from '../testdata/searchTrainingData.json';


let trainingTitle: string;
let deletedTrainingTitle: string;
let currentSearchValue: string;


// =====================================================
// ADMIN LOGIN + TRAINING PROGRAMS
// =====================================================

Given(
    'the admin navigates to the Training Programs page',
    async function (this: customworld) {

        // Open application
        await this.adminLogin.launch();

        // Select Admin
        await this.adminLogin.switchToAdmin();

        // Enter admin username
        await this.adminLogin.enterUsername(
            adminLoginData.validAdmin.username
        );

        // Enter admin password
        await this.adminLogin.enterPassword(
            adminLoginData.validAdmin.password
        );

        // Login
        await this.adminLogin.signInClick();

        // Navigate to Training Programs
        await this.addTrainingPage
            .clickTrainingPrograms();
    }
);


// =====================================================
// CREATE TRAINING
// =====================================================

When(
    'the admin clicks the Add Training button',
    async function (this: customworld) {

        await this.addTrainingPage
            .clickAddTraining();
    }
);


When(
    'the admin fills all mandatory training details',
    async function (this: customworld) {

        trainingTitle =
            `${createTrainingData.trainingTitle} ${Date.now()}`;

        await this.addTrainingPage
            .enterTrainingTitle(
                trainingTitle
            );

        await this.addTrainingPage
            .enterDescription(
                createTrainingData.description
            );

        await this.addTrainingPage
            .selectTrainer(
                createTrainingData.trainer
            );

        await this.addTrainingPage
            .enterStartDate(
                createTrainingData.startDate
            );

        await this.addTrainingPage
            .enterEndDate(
                createTrainingData.endDate
            );

        await this.addTrainingPage
            .enterCapacity(
                createTrainingData.capacity
            );
    }
);


When(
    'the admin clicks the Create Training Session button',
    async function (this: customworld) {

        await this.addTrainingPage
            .clickCreateTraining();
    }
);


Then(
    'the training session should be created successfully',
    async function (this: customworld) {

        await this.addTrainingPage
            .clickBackToTrainings();
    }
);


Then(
    'the new training should be displayed in the list',
    async function (this: customworld) {

        await this.addTrainingPage
            .verifyTrainingCreated(
                trainingTitle
            );
    }
);


// =====================================================
// SEARCH TRAINING
// =====================================================

When(
    'the admin searches for the training',
    async function (this: customworld) {

        currentSearchValue =
            searchTrainingData.title;

        await this.addTrainingPage
            .searchTraining(
                currentSearchValue
            );
    }
);


// =====================================================
// VIEW TRAINING
// =====================================================

When(
    'the admin clicks the View icon for the training',
    async function (this: customworld) {

        await this.addTrainingPage
            .clickViewTraining(
                currentSearchValue
            );
    }
);


Then(
    'the training details should be displayed',
    async function (this: customworld) {

        await this.addTrainingPage
            .verifyTrainingDetails();
    }
);


When(
    'the admin clicks the Close button',
    async function (this: customworld) {

        await this.addTrainingPage
            .clickClose();
    }
);


Then(
    'the training details should be closed',
    async function (this: customworld) {

        await this.addTrainingPage
            .verifyTrainingDetailsClosed();
    }
);


// =====================================================
// EDIT TRAINING
// =====================================================

When(
    'the admin clicks the Edit Training button',
    async function (this: customworld) {

        await this.addTrainingPage
            .clickEditTraining(
                currentSearchValue
            );
    }
);


When(
    'the admin edits all training details',
    async function (this: customworld) {

        await this.addTrainingPage
            .editTrainingTitle(
                editTrainingData.trainingTitle
            );

        await this.addTrainingPage
            .editDescription(
                editTrainingData.description
            );

        await this.addTrainingPage
            .editStartDate(
                editTrainingData.startDate
            );

        await this.addTrainingPage
            .editEndDate(
                editTrainingData.endDate
            );

        await this.addTrainingPage
            .editCapacity(
                editTrainingData.capacity
            );
    }
);


When(
    'the admin clicks the Save Changes button',
    async function (this: customworld) {

        await this.addTrainingPage
            .clickSaveChanges();
    }
);


Then(
    'the training details should be updated successfully',
    async function (this: customworld) {

        await this.addTrainingPage
            .verifyTrainingUpdated(
                editTrainingData.trainingTitle
            );
    }
);


// =====================================================
// SEARCH BY TITLE
// =====================================================

When(
    'the admin enters a training title in the search field',
    async function (this: customworld) {

        currentSearchValue =
            searchTrainingData.title;

        await this.addTrainingPage
            .searchTraining(
                currentSearchValue
            );
    }
);


// =====================================================
// SEARCH BY TRAINER
// =====================================================

When(
    'the admin enters a trainer name in the search field',
    async function (this: customworld) {

        currentSearchValue =
            searchTrainingData.trainer;

        await this.addTrainingPage
            .searchTraining(
                currentSearchValue
            );
    }
);


Then(
    'the matching training should be displayed',
    async function (this: customworld) {

        await this.addTrainingPage
            .verifySearchResult(
                currentSearchValue
            );
    }
);


// =====================================================
// DELETE TRAINING
// =====================================================

When(
    'the admin clicks the Delete Training button',
    async function (this: customworld) {

        deletedTrainingTitle =
            currentSearchValue;

        await this.addTrainingPage
            .clickDeleteTraining(
                deletedTrainingTitle
            );
    }
);


Then(
    'the delete confirmation should be displayed',
    async function (this: customworld) {

        await this.addTrainingPage
            .verifyDeleteConfirmation();
    }
);


When(
    'the admin confirms the training deletion',
    async function (this: customworld) {

        await this.addTrainingPage
            .confirmDeleteTraining();
    }
);


Then(
    'the training should be deleted successfully',
    async function (this: customworld) {

        await this.addTrainingPage
            .verifyTrainingDeleted(
                deletedTrainingTitle
            );
    }
);