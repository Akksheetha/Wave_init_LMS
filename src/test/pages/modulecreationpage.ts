import { Locator, Page } from '@playwright/test';
import { basePage } from './basePage';
import { logger } from '../Utils/Logger';

export class ModuleCreationPage extends basePage {

    private readonly myTrainingsLink: Locator;
    private readonly lessonsTab: Locator;
    private readonly addModuleButton: Locator;
    private readonly moduleTitleInput: Locator;
    private readonly createModuleButton: Locator;
    private readonly titleRequiredError: Locator;
    private readonly moduleRows: Locator;

    constructor(page: Page) {
        super(page);

        this.myTrainingsLink = page.locator( "//span[@style='flex: 1 1 0%; text-align: left;'][text()='My Trainings']");
        this.lessonsTab = page.getByRole('tab', { name: 'Lessons' });

        this.addModuleButton = page.getByRole('button',{ name: /Add Module/i });
        this.moduleTitleInput = page.getByPlaceholder('e.g. Module 1: Introduction to Machine Learning');

        this.createModuleButton = page.getByRole('button',{ name: 'Create Module', exact: true });
        this.titleRequiredError = page.getByText('Title is required',{ exact: true });
        this.moduleRows = page.locator('div').filter({ has: page.getByText('MODULE', { exact: true })});
    }

    async openMyTrainings() {
        try {
            logger.info('Opening My Trainings');

            await this.myTrainingsLink.waitFor({
                state: 'visible',
                timeout: 30000
            });

            await this.click(this.myTrainingsLink);

            logger.info('My Trainings opened successfully');

        } catch (error) {
            logger.error(`Failed to open My Trainings: ${error}`);
            throw error;
        }
    }

    async openCourse(courseName: string) {
        try {
            logger.info(`Opening course: ${courseName}`);

            const course = this.page.getByText(courseName, { exact: true }).first();

            await course.waitFor({state: 'visible',timeout: 30000});

            await this.click(course);

            logger.info(`Course opened successfully: ${courseName}`);

        } catch (error) {
            logger.error(`Failed to open course "${courseName}": ${error}`);
            throw error;
        }
    }

    async openLessonsTab() {
        try {
            logger.info('Opening Lessons tab');
            await this.lessonsTab.waitFor({state: 'visible',timeout: 30000});
            await this.click(this.lessonsTab);
            logger.info('Lessons tab opened successfully');

        } catch (error) {
            logger.error(`Failed to open Lessons tab: ${error}`);
            throw error;
        }
    }

    async clickAddModule() {
        try {
            logger.info('Clicking Add Module button');

            await this.addModuleButton.waitFor({state: 'visible',timeout: 30000});

            await this.click(this.addModuleButton);

            logger.info('Add Module button clicked successfully');

        } catch (error) {
            logger.error(`Failed to click Add Module button: ${error}`);
            throw error;
        }
    }

    async enterModuleTitle(title: string) {
        try {
            if (!title) {
                logger.info('Module title is empty. Skipping input for missing-title scenario.');
                return;
            }

            logger.info(`Entering module title: ${title}`);

            await this.moduleTitleInput.waitFor({state: 'visible',timeout: 15000});

            await this.Type(this.moduleTitleInput, title);

            logger.info('Module title entered successfully');

        } catch (error) {
            logger.error(`Failed to enter module title "${title}": ${error}`);
            throw error;
        }
    }

    async clickCreateModule() {
        try {
            logger.info('Clicking Create Module button');

            await this.createModuleButton.waitFor({state: 'visible',timeout: 15000
            });

            await this.click(this.createModuleButton);

            logger.info('Create Module button clicked successfully');

        } catch (error) {
            logger.error(`Failed to click Create Module button: ${error}`);
            throw error;
        }
    }

    async getLastModuleRowText(): Promise<string> {
        try {
            logger.info('Getting the last module row text');

            await this.moduleRows.last().waitFor({state: 'visible',timeout: 30000});

            const moduleText = await this.getText(this.moduleRows.last());

            logger.info(`Last module row text: ${moduleText}`);

            return moduleText;

        } catch (error) {
            logger.error(`Failed to get last module row text: ${error}`);
            throw error;
        }
    }

    async isTitleRequiredErrorVisible(): Promise<boolean> {
        try {
            logger.info('Checking Title is required validation message');

            const isVisible = await this.titleRequiredError.isVisible();

            logger.info(`Title required error visible: ${isVisible}`);

            return isVisible;

        } catch (error) {
            logger.error(
                `Failed to check Title is required error: ${error}`
            );
            throw error;
        }
    }

    async waitForTitleRequiredErrorToDisappear(timeout = 6000) {
        try {
            logger.info(`Waiting for Title is required error to disappear. Timeout: ${timeout}ms`);

            await this.titleRequiredError.waitFor({state: 'hidden',timeout}); 

            logger.info('Title is required error disappeared successfully');

        } catch (error) {
            logger.error(`Title is required error did not disappear within ${timeout}ms: ${error}`);
            throw error;
        }
    }
}