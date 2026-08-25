import { Browser, chromium } from '@playwright/test';
import { customworld } from '../world/customWorld';
import { loginpage } from '../pages/loginpage';
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
    this.trainerLogin =new trainerloginPage(this.page);
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