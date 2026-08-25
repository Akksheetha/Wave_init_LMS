import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { World } from '@cucumber/cucumber';
import { loginpage } from '../pages/loginpage';
import { trainerloginPage } from '../pages/trainerloginPage';
import { courseSearchPage } from '../pages/courseSearchPage';
export class customworld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    login!:loginpage
    search!:courseSearchPage
    trainerLogin!: trainerloginPage;

}setWorldConstructor(customworld)
