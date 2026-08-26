import { expect } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { customworld } from '../world/customWorld';

const STEP_TIMEOUT = { timeout: 60 * 1000 };

When(
    'the trainer clicks {string}',
    STEP_TIMEOUT,
    async function (this: customworld, linkText: string) {

        if (linkText === 'My Trainings') {
            await this.moduleCreation.openMyTrainings();
        } else {
            throw new Error(`Unhandled link: ${linkText}`);
        }
    }
);

When(
    'the trainer clicks the course {string}',
    STEP_TIMEOUT,
    async function (this: customworld, courseName: string) {

        await this.moduleCreation.openCourse(courseName);
    }
);

When(
    'the trainer clicks the {string} tab',
    STEP_TIMEOUT,
    async function (this: customworld, tabName: string) {

        if (tabName === 'Lessons') {
            await this.moduleCreation.openLessonsTab();
        } else {
            throw new Error(`Unhandled tab: ${tabName}`);
        }
    }
);

When(
    'the trainer clicks the {string} button',
    STEP_TIMEOUT,
    async function (this: customworld, buttonName: string) {

        if (buttonName === 'Add Module') {
            await this.moduleCreation.clickAddModule();
        } else if (buttonName === 'Create Module') {
            await this.moduleCreation.clickCreateModule();
        } else {
            throw new Error(`Unhandled button: ${buttonName}`);
        }
    }
);

When(
    'the trainer enters {string} as the module title',
    STEP_TIMEOUT,
    async function (this: customworld, title: string) {

        await this.moduleCreation.enterModuleTitle(title);
    }
);

Then(
    'the module {string} should be added as the last module',
    STEP_TIMEOUT,
    async function (this: customworld, moduleTitle: string) {

        const lastRowText = await this.moduleCreation.getLastModuleRowText();
        expect(lastRowText).toContain(moduleTitle);
    }
);

Then(
    'the error message {string} should be displayed briefly',
    STEP_TIMEOUT,
    async function (this: customworld, message: string) {

        const isVisible = await this.moduleCreation.isTitleRequiredErrorVisible();
        expect(isVisible).toBeTruthy();

        // The toast is transient (~2-3s) — confirm it auto-dismisses rather
        // than staying on screen, which is the behaviour shown in the app.
        await this.moduleCreation.waitForTitleRequiredErrorToDisappear(6000);
    }
);