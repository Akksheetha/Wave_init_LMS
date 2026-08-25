import { Browser, chromium } from '@playwright/test';
import{After, AfterAll, Before, BeforeAll, Status} from '@cucumber/cucumber';
import { customeworld } from '../world/customeWorld';
import { loginpage } from '../pages/loginpage';
let browser:Browser

BeforeAll(async()=>{
browser=await chromium.launch({headless:true});
})

Before(async function (this:customeworld) {
    this.browser=browser
    this.context=await this.browser.newContext()
    this.page= await this.context.newPage()
    this.login = new loginpage(this.page)
    
})

After(async function(this:customeworld,{result ,pickle}){

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
