import { Locator, Page } from '@playwright/test';
export class basePage{
    readonly page:Page

    constructor(page:Page){
        this.page=page
    }
    async click(locator:Locator){
        try{
             await locator.click()

        }catch(error){
            throw error;
        }
       
    }

    async Type(locator:Locator,text:string){
        try{
            
        await locator.fill(text)
    
        } catch(error){
            throw error;
        }   
    
    }

}