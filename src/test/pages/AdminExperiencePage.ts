import { Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';
import { logger } from '../Utils/Logger';

export interface ExperienceFormData {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
}

export class AdminExperiencePage extends basePage {

    private readonly accountMenuToggle: Locator;
    private readonly myProfileMenuItem: Locator;

    private readonly experienceToggleButton: Locator;
    private readonly companyInput: Locator;
    private readonly roleInput: Locator;
    private readonly startDateInput: Locator;
    private readonly endDateInput: Locator;
    private readonly addExperienceSubmitButton: Locator;

    private readonly companyRequiredError: Locator;
    private readonly roleRequiredError: Locator;
    private readonly startDateRequiredError: Locator;

    constructor(page: Page) {
        super(page);

        this.accountMenuToggle = page.getByText('Sriram', { exact: true }).last();
        this.myProfileMenuItem = page.getByText('My Profile', { exact: true });

        this.experienceToggleButton = page.getByRole('button', { name: 'Experience', exact: true });

        this.companyInput = page.getByPlaceholder(/Wave Init Solutions/i);
        this.roleInput = page.getByPlaceholder(/Trainee Software Engineer/i);

        this.startDateInput = page.locator('input[type="date"]').first();
        this.endDateInput = page.locator('input[type="date"]').nth(1);

      
        this.addExperienceSubmitButton = page.locator("xpath=//button[normalize-space()='Add Experience']");

        this.companyRequiredError = page.getByText('Company name is required.', { exact: true });
        this.roleRequiredError = page.getByText('Role / Title is required.', { exact: true });
        this.startDateRequiredError = page.getByText('Start date is required.', { exact: true });
    }

    async openAccountMenu() {
        try {
            logger.info('Opening the account menu');
            await this.accountMenuToggle.waitFor({ state: 'visible', timeout: 30000 });
            await this.click(this.accountMenuToggle);
            logger.info('Account menu opened');
        } catch (error) {
            logger.error(`Failed to open the account menu: ${error}`);
            throw error;
        }
    }

    async clickMyProfile() {
        try {
            logger.info('Clicking "My Profile"');
            await this.myProfileMenuItem.waitFor({ state: 'visible', timeout: 15000 });
            await this.click(this.myProfileMenuItem);
            logger.info('My Profile opened');
        } catch (error) {
            logger.error(`Failed to click My Profile: ${error}`);
            throw error;
        }
    }

    async clickExperienceToggle() {
        try {
            logger.info('Clicking the "+ Experience" button');
            await this.experienceToggleButton.waitFor({ state: 'visible', timeout: 30000 });
            await this.click(this.experienceToggleButton);
            logger.info('Add Experience modal should be open');
        } catch (error) {
            logger.error(`Failed to click the "+ Experience" button: ${error}`);
            throw error;
        }
    }

    async fillExperienceForm(data: ExperienceFormData) {
        try {
            logger.info(`Filling experience form: ${JSON.stringify(data)}`);
            await this.companyInput.waitFor({ state: 'visible', timeout: 15000 });

            if (data.company) {
                logger.info(`Entering company: ${data.company}`);
                await this.Type(this.companyInput, data.company);
            }
            if (data.role) {
                logger.info(`Entering role: ${data.role}`);
                await this.Type(this.roleInput, data.role);
            }
            if (data.startDate) {
                logger.info(`Entering start date: ${data.startDate}`);
                await this.Type(this.startDateInput, data.startDate);
            }
            if (data.endDate) {
                logger.info(`Entering end date: ${data.endDate}`);
                await this.Type(this.endDateInput, data.endDate);
            }

            logger.info('Experience form filled successfully');
        } catch (error) {
            logger.error(`Failed to fill the experience form: ${error}`);
            throw error;
        }
    }

    async clickAddExperienceSubmit() {
        try {
            logger.info('Submitting the experience form (clicking "Add Experience")');
            await this.click(this.addExperienceSubmitButton);
            logger.info('Experience form submitted');
        } catch (error) {
            logger.error(`Failed to submit the experience form: ${error}`);
            throw error;
        }
    }

    async verifyExperienceAdded(role: string, company: string, expectedDisplay: string) {
        try {
            logger.info(`Verifying experience was added: ${role} at ${company} (${expectedDisplay})`);

            await expect(this.page.getByText(role, { exact: true }).first())
                .toBeVisible({ timeout: 30000 });
            await expect(this.page.getByText(company, { exact: true }).first()).toBeVisible();
            await expect(this.page.getByText(expectedDisplay, { exact: true })).toBeVisible();

            logger.info('Experience record verified as added successfully');
        } catch (error) {
            logger.error(`Failed to verify the experience record was added: ${error}`);
            throw error;
        }
    }

    async verifyCompanyRequiredError(shouldShow: boolean) {
        await this.verifyMessage(this.companyRequiredError, shouldShow, 'Company name is required.');
    }

    async verifyRoleRequiredError(shouldShow: boolean) {
        await this.verifyMessage(this.roleRequiredError, shouldShow, 'Role / Title is required.');
    }

    async verifyStartDateRequiredError(shouldShow: boolean) {
        await this.verifyMessage(this.startDateRequiredError, shouldShow, 'Start date is required.');
    }

    private async verifyMessage(locator: Locator, shouldShow: boolean, label: string) {
        try {
            logger.info(`Verifying "${label}" is ${shouldShow ? 'visible' : 'not visible'}`);

            if (shouldShow) {
                await expect(locator).toBeVisible({ timeout: 10000 });
            } else {
                await expect(locator).not.toBeVisible();
            }

            logger.info(`"${label}" assertion passed`);
        } catch (error) {
            logger.error(`"${label}" assertion failed: ${error}`);
            throw error;
        }
    }
}