import { Browser, chromium } from '@playwright/test';
import { customworld } from '../world/customWorld';
import { loginpage } from '../pages/loginpage';
import { dashboardpage } from '../pages/dashboardpage';
import { ExploreTrainingPage } from '../pages/ExploreTrainingPage';
import { trainerloginPage } from '../pages/trainerloginPage';
import {
    BeforeAll,
    AfterAll,
    Status,
    Before,
    After,
    setDefaultTimeout
} from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);
import { courseSearchPage } from '../pages/courseSearchPage';
import { ModuleCreationPage } from '../pages/modulecreationpage';
import { DiscussionPage } from '../pages/discussionpage';
import { signUpPage } from '../pages/signUpPage';
let browser:Browser
//
BeforeAll(async()=>{
browser=await chromium.launch({headless:false});
})

Before(async function (this:customworld) {
    this.browser=browser
    this.context=await this.browser.newContext()
    this.page= await this.context.newPage()
    this.login = new loginpage(this.page)
    this.search = new courseSearchPage(this.page);
    this.dashboard = new dashboardpage(this.page)
    this.exploretraining = new ExploreTrainingPage(this.page)
    this.trainerLogin =new trainerloginPage(this.page);
    this.DiscussionPage = new DiscussionPage(this.page);
    this.moduleCreation = new ModuleCreationPage(this.page);
    this.signUp = new signUpPage(this.page);
})

After(async function(this:customworld,{result ,pickle}){

     if (result?.status === Status.FAILED) {
        const img = await this.page.screenshot({
            path: `report/screenshort/${pickle.name}.png`,
            type: "png"
        });
    }
    await this.page.close()
    await this.context.close()

    
})

AfterAll(async()=>{
    await browser.close()
})