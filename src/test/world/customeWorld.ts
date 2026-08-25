import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { World } from '@cucumber/cucumber';
import { loginpage } from '../pages/loginpage';
import { trainerloginPage } from '../pages/trainerloginPage';
export class customeworld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    login!:loginpage
    trainerLogin!: trainerloginPage;

}setWorldConstructor(customeworld)
//