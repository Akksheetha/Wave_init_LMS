import { Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';
import { logger } from '../Utils/Logger';

export interface EducationFormData {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    yearRange: string;
    cgpa: string;
}

export class EducationPage extends basePage {

    private readonly myProfileLink: Locator;
    private readonly openEducationModalButton: Locator;

    private readonly institutionInput: Locator;
    private readonly degreeInput: Locator;
    private readonly fieldOfStudyInput: Locator;
    private readonly yearRangeInput: Locator;
    private readonly cgpaInput: Locator;

    private readonly addEducationSubmitButton: Locator;
    private readonly institutionRequiredError: Locator;
    private readonly degreeRequiredError: Locator;

    constructor(page: Page) {
        super(page);

        this.myProfileLink = page.getByText('My Profile', { exact: true });
        this.openEducationModalButton = page.locator('div.reg-card-header', { hasText: 'Education' }).locator('button.reg-admin-btn');
        this.institutionInput = page.getByPlaceholder(/Anna University, IIT Madras/i);
        this.degreeInput = page.getByPlaceholder(/Bachelor of Technology/i);
        this.fieldOfStudyInput = page.getByPlaceholder(/Computer Science/i);
        this.yearRangeInput = page.getByPlaceholder(/2018\s*-\s*2022/);
        this.cgpaInput = page.getByPlaceholder(/8\.75/);
        this.addEducationSubmitButton = page.locator("xpath=//button[normalize-space()='Add Education']");
        this.institutionRequiredError = page.getByText('Institution is required.', { exact: true });
        this.degreeRequiredError = page.getByText('Degree is required.', { exact: true });
    }

    async openMyProfile() {
        try {
            logger.info('Opening My Profile');
            await this.myProfileLink.waitFor({ state: 'visible', timeout: 30000 });
            await this.click(this.myProfileLink);
            logger.info('My Profile opened successfully');
        } catch (error) {
            logger.error(`Failed to open My Profile: ${error}`);
            throw error;
        }
    }

    async clickAddInEducationSection() {
        try {
            logger.info('Clicking the Add button in the Education section');
            await this.openEducationModalButton.waitFor({ state: 'visible', timeout: 30000 });
            await this.click(this.openEducationModalButton);
            logger.info('Education "Add" button clicked, modal should be open');
        } catch (error) {
            logger.error(`Failed to click the Add button in the Education section: ${error}`);
            throw error;
        }
    }

    async fillEducationForm(data: EducationFormData) {
        try {
            logger.info(`Filling education form with data: ${JSON.stringify(data)}`);
            await this.institutionInput.waitFor({ state: 'visible', timeout: 15000 });

            if (data.institution) {
                logger.info(`Entering institution: ${data.institution}`);
                await this.Type(this.institutionInput, data.institution);
            } else {
                logger.info('Institution left empty (missing-field scenario)');
            }

            if (data.degree) {
                logger.info(`Entering degree: ${data.degree}`);
                await this.Type(this.degreeInput, data.degree);
            } else {
                logger.info('Degree left empty (missing-field scenario)');
            }

            if (data.fieldOfStudy) {
                logger.info(`Entering field of study: ${data.fieldOfStudy}`);
                await this.Type(this.fieldOfStudyInput, data.fieldOfStudy);
            }

            if (data.yearRange) {
                logger.info(`Entering year range: ${data.yearRange}`);
                await this.Type(this.yearRangeInput, data.yearRange);
            }

            if (data.cgpa) {
                logger.info(`Entering CGPA: ${data.cgpa}`);
                await this.Type(this.cgpaInput, data.cgpa);
            }

            logger.info('Education form filled successfully');
        } catch (error) {
            logger.error(`Failed to fill the education form: ${error}`);
            throw error;
        }
    }

    async clickAddEducationSubmit() {
        try {
            logger.info('Submitting the education form (clicking "Add Education")');
            await this.click(this.addEducationSubmitButton);
            logger.info('Education form submitted');
        } catch (error) {
            logger.error(`Failed to submit the education form: ${error}`);
            throw error;
        }
    }

    async verifyEducationAdded(
        degree: string,
        fieldOfStudy: string,
        institution: string,
        yearRange: string,
        cgpa: string
    ) {
        try {
            const combinedDegree = `${degree} (${fieldOfStudy})`;
            logger.info(`Verifying education record was added: ${combinedDegree}, ${institution}, ${yearRange}, CGPA ${cgpa}`);

            await expect(this.page.getByText(combinedDegree, { exact: true }))
                .toBeVisible({ timeout: 30000 });
            await expect(this.page.getByText(institution, { exact: true })).toBeVisible();
            await expect(this.page.getByText(yearRange, { exact: true })).toBeVisible();
            await expect(this.page.getByText(`CGPA: ${cgpa}`, { exact: true })).toBeVisible();

            logger.info('Education record verified as added successfully');
        } catch (error) {
            logger.error(`Failed to verify the education record was added: ${error}`);
            throw error;
        }
    }

    async verifyInstitutionRequiredError(shouldShow: boolean) {
        try {
            logger.info(`Verifying "Institution is required." error is ${shouldShow ? 'visible' : 'not visible'}`);

            if (shouldShow) {
                await expect(this.institutionRequiredError).toBeVisible({ timeout: 10000 });
            } else {
                await expect(this.institutionRequiredError).not.toBeVisible();
            }

            logger.info('Institution-required error assertion passed');
        } catch (error) {
            logger.error(`Institution-required error assertion failed: ${error}`);
            throw error;
        }
    }

    async verifyDegreeRequiredError(shouldShow: boolean) {
        try {
            logger.info(`Verifying "Degree is required." error is ${shouldShow ? 'visible' : 'not visible'}`);

            if (shouldShow) {
                await expect(this.degreeRequiredError).toBeVisible({ timeout: 10000 });
            } else {
                await expect(this.degreeRequiredError).not.toBeVisible();
            }

            logger.info('Degree-required error assertion passed');
        } catch (error) {
            logger.error(`Degree-required error assertion failed: ${error}`);
            throw error;
        }
    }
}