import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { basePage } from './basePage';

dotenv.config({ path: path.resolve(process.cwd(), 'env/.env.qa') });

export class loginpage extends basePage {
   
    readonly username:Locator;
    readonly password:Locator;
    readonly sigin_BTN:Locator;
    readonly welcome:Locator;
    readonly errormsg:Locator;

    constructor(page:Page){
        super(page)
        this.username= page.locator("#login-email")
        this.password=page.locator("#login-password")
        this.sigin_BTN=page.locator("//button[@type='submit']")
        this.welcome=page.locator("//h1[@class='tdb-header-title']")
       this.errormsg = page.getByText('Invalid email or password');
    }

    async launch(){
        const baseUrl = process.env.BASEURL;
        if (!baseUrl) {
            throw new Error('BASEURL is not configured in env/.env.qa');
        }
        await this.page.goto(baseUrl);
    }

    async EnterUnsername(name:string){
        try{
              await this.Type(this.username,name)
        }catch(error){
            throw error;
        }
     
    }
    async EnterPass(pass:string){
        try{
                 await this.Type(this.password,pass)
        }catch(error){
            throw error;
        }
  
    }
    async signClick(){
        try{
        await this.click(this.sigin_BTN)
        }catch(error){
            throw error;
        }
    }
    async WelcomText(){
        try{
            return  this.welcome
        }catch(error){
            throw error;
        }
    }
    async Errormsg(){
        try{ 
        return this.errormsg
        }catch(error){
            throw error;
        }
    }

    async getValidationMessage() {
        return await this.page.locator('input:invalid').first().evaluate(
            (element: HTMLInputElement) => element.validationMessage
        );
    }


}