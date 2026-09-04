import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { basePage } from './basePage';

dotenv.config({
    path: path.resolve(process.cwd(), 'env/.env.qa')
});

export class adminloginPage extends basePage {

    readonly adminMode: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly signInBtn: Locator;
    readonly errorMsg: Locator;
    readonly dashboard: Locator;
    readonly participantModule: Locator;

    constructor(page: Page) {
        super(page);

        this.adminMode = page.getByRole('tab', {
            name: 'Admin'
        });

        this.username = page.getByPlaceholder(
            'Enter your email'
        );

        this.password = page.getByPlaceholder(
            'Enter your password'
        );

        this.signInBtn = page.getByRole('button', {
            name: 'Sign in as Admin'
        });

        this.errorMsg = page.getByText(
            'Invalid email or password'
        );

        this.dashboard = page.getByRole('button', {
            name: 'Dashboard'
        });

        this.participantModule = page.getByRole('button', { name: 'Participants' }).first();
    }

    async launch() {

        const baseUrl = process.env.BASEURL;

        if (!baseUrl) {
            throw new Error(
                'BASEURL is not configured in env/.env.qa'
            );
        }

        await this.page.goto(baseUrl);
    }

    async switchToAdmin() {

        try {
            await this.click(this.adminMode);
        } catch (error) {
            throw error;
        }
    }

    async enterUsername(name: string) {

        try {
            await this.Type(this.username, name);
        } catch (error) {
            throw error;
        }
    }

    async enterPassword(pass: string) {

        try {
            await this.Type(this.password, pass);
        } catch (error) {
            throw error;
        }
    }

    async signInClick() {

        try {
            await this.click(this.signInBtn);
        } catch (error) {
            throw error;
        }
    }

    async dashboardElement() {

        try {
            return this.dashboard;
        } catch (error) {
            throw error;
        }
    }

    async errorMessage() {

        try {
            return this.errorMsg;
        } catch (error) {
            throw error;
        }
    }

    async getValidationMessage() {

        return await this.page
            .locator('input:invalid')
            .first()
            .evaluate(
                (element: HTMLInputElement) =>
                    element.validationMessage
            );
    }

    async clickParticipantModule() {
        try {
            await this.click(this.participantModule);
        } catch (error) {
            throw error;
        }
    }
}