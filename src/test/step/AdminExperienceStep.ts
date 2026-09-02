import { When, Then } from '@cucumber/cucumber';
import {CustomWorld} from '../world/customWorld';
import { logger } from '../Utils/Logger';
import experienceData from '../testData/adminExperienceData.json';

interface ExperienceJsonRow {
    scenarioType: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    expectedDisplay: string;
    companyError: string;
    roleError: string;
    startDateError: string;
}

const rows = experienceData as ExperienceJsonRow[];

function getRow(scenarioType: string): ExperienceJsonRow {
    try {
        const row = rows.find(r => r.scenarioType === scenarioType);

        if (!row) {
            throw new Error(`No row found in addExperienceData.json for scenarioType "${scenarioType}"`);
        }

        logger.info(`Loaded JSON row for scenarioType "${scenarioType}": ${JSON.stringify(row)}`);
        return row;
    } catch (error) {
        logger.error(`Failed to load JSON row for scenarioType "${scenarioType}": ${error}`);
        throw error;
    }
}

const STEP_TIMEOUT = { timeout: 60 * 1000 };

When(
    'the admin opens the account menu',
    STEP_TIMEOUT,
    async function (this: CustomWorld) {
        try {
            logger.info('Step: the admin opens the account menu');
            await this.AdminExperience.openAccountMenu();
        } catch (error) {
            logger.error(`Step failed - the admin opens the account menu: ${error}`);
            throw error;
        }
    }
);

When(
    'the admin opens {string}',
    STEP_TIMEOUT,
    async function (this: CustomWorld, linkText: string) {
        try {
            logger.info(`Step: the admin opens "${linkText}"`);

            if (linkText === 'My Profile') {
                await this.AdminExperience.clickMyProfile();
            } else {
                throw new Error(`Unhandled link: ${linkText}`);
            }
        } catch (error) {
            logger.error(`Step failed - the admin opens "${linkText}": ${error}`);
            throw error;
        }
    }
);

When(
    'the admin clicks the {string} button on the experience form',
    STEP_TIMEOUT,
    async function (this: CustomWorld, buttonName: string) {
        try {
            logger.info(`Step: the admin clicks the "${buttonName}" button on the experience form`);

            if (buttonName === 'Experience') {
                await this.AdminExperience.clickExperienceToggle();
            } else if (buttonName === 'Add Experience') {
                await this.AdminExperience.clickAddExperienceSubmit();
            } else {
                throw new Error(`Unhandled button: ${buttonName}`);
            }
        } catch (error) {
            logger.error(`Step failed - clicks the "${buttonName}" button on the experience form: ${error}`);
            throw error;
        }
    }
);

When(
    'the admin fills the experience form using {string} data',
    STEP_TIMEOUT,
    async function (this: CustomWorld, scenarioType: string) {
        try {
            logger.info(`Step: the admin fills the experience form using "${scenarioType}" data`);
            const row = getRow(scenarioType);

            await this.AdminExperience.fillExperienceForm({
                company: row.company,
                role: row.role,
                startDate: row.startDate,
                endDate: row.endDate
            });
        } catch (error) {
            logger.error(`Step failed - fills the experience form using "${scenarioType}" data: ${error}`);
            throw error;
        }
    }
);

Then(
    'the experience record from {string} data should be added to the profile',
    { timeout: 60 * 1000 },
    async function (this: CustomWorld, scenarioType: string) {
        try {
            logger.info(`Step: the experience record from "${scenarioType}" data should be added to the profile`);
            const row = getRow(scenarioType);

            await this.AdminExperience.verifyExperienceAdded(
                row.role,
                row.company,
                row.expectedDisplay
            );
        } catch (error) {
            logger.error(`Step failed - experience record from "${scenarioType}" data should be added: ${error}`);
            throw error;
        }
    }
);

Then(
    'the experience form should show the validation errors from {string} data',
    STEP_TIMEOUT,
    async function (this: CustomWorld, scenarioType: string) {
        try {
            logger.info(`Step: the experience form should show the validation errors from "${scenarioType}" data`);
            const row = getRow(scenarioType);

            await this.AdminExperience.verifyCompanyRequiredError(!!row.companyError);
            await this.AdminExperience.verifyRoleRequiredError(!!row.roleError);
            await this.AdminExperience.verifyStartDateRequiredError(!!row.startDateError);
        } catch (error) {
            logger.error(`Step failed - validation errors from "${scenarioType}" data: ${error}`);
            throw error;
        }
    }
);