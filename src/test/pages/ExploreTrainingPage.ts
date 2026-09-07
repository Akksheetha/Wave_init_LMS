// import { Locator, Page } from '@playwright/test';
// import dotenv from 'dotenv';
// import path from 'path';
// import { basePage } from './basePage';
// //
// dotenv.config({ path: path.resolve(process.cwd(), 'env/.env.qa') });

// export class ExploreTrainingPage extends basePage {
   
//     readonly searchBar:Locator;
//     readonly resultText:Locator;
//     readonly errorText:Locator;

//     constructor(page:Page){
//         super(page)
//         this.searchBar = page.locator("//*[@id='main-content']/div/div/div/div/div[1]/div[3]/div[1]/input")
//         this.resultText = page.locator("//*[@id='main-content']/div/div/div/div/div[2]/article[1]/div/h3")
//         this.errorText = page.locator("//*[@id='main-content']/div/div/div/div/div[2]/div/div/h3")
//     }

//     async launch(){
//         const baseUrl = process.env.BASEURL;
//         if (!baseUrl) {
//             throw new Error('BASEURL is not configured in env/.env.qa');
//         }
//         await this.page.goto(baseUrl);
//     }

//     async typeSearchValue(name:string){
//         try{
//               await this.Type(this.searchBar,name)
//         }catch(error){
//             throw error;
//         }
//     }

//     async getTextofresultText() {
//         try{
//             return await this.getText(this.resultText)
//         }catch(error){
//             throw error;
//         }
//     }

//     async getTextoferrorText() {
//         try{
//             return await this.getText(this.errorText)
//         }catch(error){
//             throw error;
//         }
//     }

// }


//Improved code
import { Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { basePage } from './basePage';

dotenv.config({
    path: path.resolve(process.cwd(), 'env/.env.qa')
});

export class ExploreTrainingPage extends basePage {

    readonly searchBar: Locator;
    readonly resultText: Locator;
    readonly errorText: Locator;

    constructor(page: Page) {
        super(page);

        this.searchBar = page.locator(
            "//*[@id='main-content']//input"
        );

        this.resultText = page.locator(
            "//*[@id='main-content']//article[1]//h3"
        );

        this.errorText = page.locator(
            "//*[@id='main-content']//h3"
        );
    }

    async launch(): Promise<void> {

        const baseUrl = process.env.BASEURL;

        if (!baseUrl) {
            throw new Error(
                'BASEURL is not configured in env/.env.qa'
            );
        }

        await this.page.goto(baseUrl);
    }

    async typeSearchValue(name: string): Promise<void> {

        await this.searchBar.waitFor({
            state: 'visible'
        });

        await this.searchBar.fill(name);
    }

    async getTextofresultText(): Promise<string> {

        await this.resultText.waitFor({
            state: 'visible'
        });

        return await this.resultText.innerText();
    }

    async getTextoferrorText(): Promise<string> {

        await this.errorText.waitFor({
            state: 'visible'
        });

        return await this.errorText.innerText();
    }
}
