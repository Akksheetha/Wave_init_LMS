import { Locator, Page, expect } from '@playwright/test';

import { basePage } from './basePage';


export class addTrainerPage extends basePage {

    readonly trainersMenu: Locator;

    readonly addTrainerBtn: Locator;

    readonly fullNameInput: Locator;

    readonly emailInput: Locator;

    readonly mobileInput: Locator;

    readonly departmentSelect: Locator;

    readonly designationSelect: Locator;

    readonly experienceSelect: Locator;

    readonly passwordInput: Locator;

    readonly confirmPasswordInput: Locator;

    readonly createTrainerBtn: Locator;


    constructor(page: Page) {

        super(page);


        this.trainersMenu = page.getByRole(
            'button',
            {
                name: 'Trainers',
                exact: true
            }
        );


        this.addTrainerBtn = page.getByRole(
            'button',
            {
                name: 'Add Trainer',
                exact: true
            }
        );


        this.fullNameInput = page.getByPlaceholder(
            'e.g. Sarah Johnson'
        );


        this.emailInput = page.getByPlaceholder(
            'trainer@company.com'
        );


        this.mobileInput = page.getByPlaceholder(
            /e\.g\.\s*\+91\s*98765\s*43210/i
        );


        this.departmentSelect = page
            .locator('select.reg-select')
            .nth(0);


        this.designationSelect = page
            .locator('select.reg-select')
            .nth(1);


        this.experienceSelect = page
            .locator('select.reg-select')
            .nth(2);


        this.passwordInput = page.getByPlaceholder(
            'Min. 8 characters'
        );


        this.confirmPasswordInput = page.getByPlaceholder(
            'Re-enter password'
        );


        this.createTrainerBtn = page.getByRole(
            'button',
            {
                name: 'Create Trainer',
                exact: true
            }
        );
    }


    async clickTrainers() {

        await this.click(
            this.trainersMenu
        );
    }


    async clickAddTrainer() {

        await this.click(
            this.addTrainerBtn
        );
    }


    async enterFullName(fullName: string) {

        await this.Type(
            this.fullNameInput,
            fullName
        );
    }


    async enterEmail(email: string) {

        await this.Type(
            this.emailInput,
            email
        );
    }


    async enterMobile(mobile: string) {

        await this.Type(
            this.mobileInput,
            mobile
        );
    }


    async selectDepartment(department: string) {

        await this.departmentSelect.selectOption({
            label: department
        });
    }


    async selectDesignation(designation: string) {

        await this.designationSelect.selectOption({
            label: designation
        });
    }


    async selectExperience(experience: string) {

        await this.experienceSelect.selectOption({
            label: experience
        });
    }


    async enterPassword(password: string) {

        await this.Type(
            this.passwordInput,
            password
        );
    }


    async enterConfirmPassword(
        confirmPassword: string
    ) {

        await this.Type(
            this.confirmPasswordInput,
            confirmPassword
        );
    }


    async fillAllTrainerDetails(data: {

        fullName: string;

        email: string;

        mobile: string;

        department: string;

        designation: string;

        experience: string;

        password: string;

        confirmPassword: string;

    }) {

        await this.enterFullName(
            data.fullName
        );

        await this.enterEmail(
            data.email
        );

        await this.enterMobile(
            data.mobile
        );

        await this.selectDepartment(
            data.department
        );

        await this.selectDesignation(
            data.designation
        );

        await this.selectExperience(
            data.experience
        );

        await this.enterPassword(
            data.password
        );

        if (data.confirmPassword) {

            await this.enterConfirmPassword(
                data.confirmPassword
            );
        }
    }


    async fillMandatoryTrainerDetails(data: {

        fullName: string;

        email: string;

        password: string;

        confirmPassword: string;

    }) {

        await this.enterFullName(
            data.fullName
        );

        await this.enterEmail(
            data.email
        );

        await this.enterPassword(
            data.password
        );

        await this.enterConfirmPassword(
            data.confirmPassword
        );
    }


    async clickCreateTrainer() {

        await this.click(
            this.createTrainerBtn
        );
    }


    async getMessage(
        expectedMessage: string
    ) {

        return this.page
            .getByText(
                expectedMessage,
                {
                    exact: false
                }
            )
            .first();
    }


    async verifyMessage(
        expectedMessage: string
    ) {

        const message = await this.getMessage(
            expectedMessage
        );

        await expect(message).toBeVisible({
            timeout: 10000
        });
    }


    /*
     * Verify the exact trainer using
     * the unique email.
     */
    async verifyTrainerCreated(email: string) {

    const trainerEmail = this.page.getByText(
        email,
        { exact: true }
    );

    await expect(trainerEmail).toBeVisible({
        timeout: 10000
    });
}
}