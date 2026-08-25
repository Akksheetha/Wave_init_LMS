import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { World } from '@cucumber/cucumber';
import { loginpage } from '../pages/loginpage';
import { courseSearchPage } from '../pages/courseSearchPage';
export class customworld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    login!:loginpage
    search!:courseSearchPage

}setWorldConstructor(customworld)
//