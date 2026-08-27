import { Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class signUpPage extends basePage {

    readonly sign: Locator;
    readonly fullName: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly terms: Locator;
    readonly createAccount: Locator;

    constructor(page: Page) {
        super(page);

        this.sign = page.getByRole('link', { name: 'Sign up as Participant' });
        this.fullName = page.getByRole('textbox', {
            name: 'Full Name'
        });

        this.email = page.getByRole('textbox', {
            name: 'Email Address'
        });

        this.phone = page.getByRole('textbox', {
            name: 'Phone Number'
        });

        this.password = page.getByRole('textbox', {
    name: 'Password',
    exact: true
});

this.confirmPassword = page.getByRole('textbox', {
    name: 'Confirm Password',
    exact: true
});

        this.terms = page.getByRole('checkbox');

        this.createAccount = page.getByRole('button', {
            name: 'Create Account'
        });
    }

    async signupClick() {
    console.log('Current URL:', this.page.url());
    console.log('Page title:', await this.page.title());

    await this.page.screenshot({
        path: 'report/signup-page.png',
        fullPage: true
    });

    await this.sign.click();
}
    async enterSignUpDetails(data: any) {
        await this.fullName.fill(data.fullName);
        await this.email.fill(data.email);
        await this.phone.fill(data.phone);
        await this.password.fill(data.password);
        await this.confirmPassword.fill(data.confirmPassword);
        await this.terms.check();
    }

    async submitForm() {
        await this.createAccount.click();
    }

    async verifyPasswordMismatch() {
    const message = this.page
        .getByRole('alert')
        .getByText('Passwords do not match', { exact: true });

    await expect(message).toBeVisible();
}
}