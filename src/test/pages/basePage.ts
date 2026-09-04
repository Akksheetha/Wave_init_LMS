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
            // Check if field is visible before typing
            const isVisible = await locator.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
                await locator.fill(text)
            }
        } catch(error){
            throw error;
        }   
    
    }

    async getText(locator: Locator) {
        try {
            return await locator.innerText();
        } catch (error) {
            throw error;
        }
    }

    async GetAllTextContents(selector: Locator): Promise<string[]> {
        try {
            const texts = await selector.allTextContents();

            const textList = texts
                .map(text => text.trim())
                .filter(text => text.length > 0);


            return textList;

        } catch (error) {
            throw error;
        }
    }

}