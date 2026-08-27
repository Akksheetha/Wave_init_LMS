import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { basePage } from './basePage';
//
dotenv.config({ path: path.resolve(process.cwd(), 'env/.env.qa') });

export class SignupPage extends basePage {
   
    readonly username:Locator;
    readonly email:Locator;
    readonly phone:Locator;
    readonly password:Locator;
    readonly repassword:Locator;
    readonly termsbox:Locator;
    readonly createBtn:Locator;


    constructor(page:Page){
        super(page)
        this.username = page.locator("//input[@id='reg-name']")
        this.email = page.locator("//input[@id='reg-email']")
        this.phone = page.locator("//input[@id='reg-phone']")
        this.password = page.locator("//input[@id='reg-pw']")
        this.repassword = page.locator("//input[@id='reg-confirm']")
        this.termsbox = page.locator("//*[@id='root']/div[1]/div[2]/div[2]/form/div[6]/label/input")
        this.createBtn = page.locator("//*[@id='root']/div[1]/div[2]/div[2]/form/button")
    }

    async launch(){
        const baseUrl = process.env.BASEURL;
        if (!baseUrl) {
            throw new Error('BASEURL is not configured in env/.env.qa');
        }
        await this.page.goto(baseUrl);
    }

}
