import { Browser, chromium } from '@playwright/test';
import { CustomWorld } from '../world/customWorld';
import { loginpage } from '../pages/loginpage';
import { dashboardpage } from '../pages/dashboardpage';
import { ExploreTrainingPage } from '../pages/ExploreTrainingPage';
import { trainerloginPage } from '../pages/trainerloginPage';
import { adminloginPage } from '../pages/adminloginPage';
import { addTrainerPage } from '../pages/addtrainerPage';
import { ParticipantPage } from '../pages/ParticpantPage';
import { courseDetailsPage } from '../pages/courseDetailsPage';
import { EducationPage } from '../pages/AddeducationPage';
import {AdminExperiencePage} from '../pages/AdminExperiencePage';
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
import { MyProfileUpdate } from '../pages/MyProfileUpdate';
import { ModuleCreationPage } from '../pages/modulecreationpage';
import { DiscussionPage } from '../pages/discussionpage';
import { TrainerCoursePage } from '../pages/TrainerCoursePage';
import { SignupPage } from '../pages/SignupPage';
let browser:Browser
//
BeforeAll(async()=>{
browser=await chromium.launch({headless:true});
})

Before(async function (this:CustomWorld) {
    this.browser=browser
    this.context=await this.browser.newContext()
    this.page= await this.context.newPage()
    this.login = new loginpage(this.page)
    this.search = new courseSearchPage(this.page);
    this.dashboard = new dashboardpage(this.page)
    this.exploretraining = new ExploreTrainingPage(this.page)
    this.trainerLogin =new trainerloginPage(this.page);
    this.MyProfile= new MyProfileUpdate(this.page)
    this.DiscussionPage = new DiscussionPage(this.page);
    this.moduleCreation = new ModuleCreationPage(this.page);
    this.adminLogin = new adminloginPage(this.page);
    this.ap = new adminloginPage(this.page);
    this.signUp = new SignupPage(this.page);
    this.addTrainer =new addTrainerPage(this.page);
    this.pp = new ParticipantPage(this.page);
    this.courseDetails = new courseDetailsPage(this.page);
    this.tcp=new TrainerCoursePage(this.page);
    this.Education = new EducationPage(this.page);
    this.AdminExperience = new AdminExperiencePage(this.page);
})


After(async function(this:CustomWorld,{result ,pickle}){

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