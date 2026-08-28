import { Locator, Page ,expect} from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { basePage } from './basePage';
//
dotenv.config({ path: path.resolve(process.cwd(), 'env/.env.qa') });

export class SignupPage extends basePage {

    readonly sign: Locator;
    readonly fullName: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly terms: Locator;
    readonly createAccount: Locator;
    readonly successmess:Locator;
    readonly registerederrmes:Locator;
    readonly passwordmatcherr:Locator;
    readonly termsError:Locator;

    constructor(page: Page) {
        super(page);
        this.sign = page.getByRole('link', {name: 'Sign up as Participant'});
        this.fullName = page.getByRole('textbox', {name: 'Full Name'});
        this.email = page.getByRole('textbox', {name: 'Email Address'});
        this.phone = page.getByRole('textbox', {name: 'Phone Number'});
        this.password = page.getByRole('textbox', {name: 'Password',exact: true});
        this.confirmPassword = page.getByRole('textbox', {name: 'Confirm Password',exact: true});
        this.terms = page.getByRole('checkbox');
        this.createAccount = page.getByRole('button', {name: 'Create Account'});
        this.successmess = page.locator("//div/div[2]/div[2]/div[1]/h2")
        this.registerederrmes = page.locator("//*[@id='root']/div[1]/div[2]/div[2]/div[2]/div/span")
        this.passwordmatcherr = page.locator("//p[text()='Passwords do not match']")
        this.termsError = page.locator("//span[text()='You must agree to the terms']")
    }

    async signupClick() {
        await this.sign.click();
    }

    async enterFullName(username: string) {
        await this.fullName.fill(username);
    }

    async enterEmail(email: string) {
        await this.email.fill(email);
    }

    async enterPhone(phone: string) {
        await this.phone.fill(phone);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async enterConfirmPassword(repassword: string) {
        await this.confirmPassword.fill(repassword);
    }

    async selectTerms() {
        await this.terms.check();
    }

    async submitForm() {
        await this.createAccount.click();
    }

    async verifySuccessMessage() {
        await expect(this.successmess).toBeVisible();
    }

    async verifyRegisteredErrorMessage() {
        await expect(this.registerederrmes).toBeVisible();
    }

    async verifyTermsError() {
        await expect(this.termsError).toBeVisible();
    }

    async verifyPasswordMismatch() {
        await expect(this.passwordmatcherr).toBeVisible();
    }

    async enterAlreadyRegisteredDetails(
        username: string,
        email: string,
        phone: string,
        password: string,
        repassword: string
    ) {
        await this.enterFullName(username);
        await this.enterEmail(email);
        await this.enterPhone(phone);
        await this.enterPassword(password);
        await this.enterConfirmPassword(repassword);
        await this.selectTerms();
    }

    async enterRegisterDetails(
        username: string,
        email: string,
        phone: string,
        password: string,
        repassword: string
    ) {
        await this.enterFullName(username);
        await this.enterEmail(email);
        await this.enterPhone(phone);
        await this.enterPassword(password);
        await this.enterConfirmPassword(repassword);
        await this.submitForm();
    }
}
