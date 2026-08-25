import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { basePage } from './basePage';
//
dotenv.config({ path: path.resolve(process.cwd(), 'env/.env.qa') });

export class dashboardpage extends basePage {
   
    readonly exploreCourseBtn:Locator;
    readonly dashboardtext:Locator;

    constructor(page:Page){
        super(page)
        this.exploreCourseBtn= page.locator("//button[contains(text(),'Explore')]")
        this.dashboardtext = page.locator("//h1[text()='Welcome back, ']")
    }

    async launch(){
        const baseUrl = process.env.BASEURL;
        if (!baseUrl) {
            throw new Error('BASEURL is not configured in env/.env.qa');
        }
        await this.page.goto(baseUrl);
    }

    async clickExploreCourse(){
        try{
              await this.click(this.exploreCourseBtn)
        }catch(error){
            throw error;
        }
    }

    async getTextofDashboardText() {
        try{
            return await this.getText(this.dashboardtext)
        }catch(error){
            throw error;
        }
    }
}
