import { DiscussionPage } from './../pages/discussionpage';
import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { World } from '@cucumber/cucumber';
import { loginpage } from '../pages/loginpage';
import { trainerloginPage } from '../pages/trainerloginPage';
import { courseSearchPage } from '../pages/courseSearchPage';
import { dashboardpage } from '../pages/dashboardpage';
import { ExploreTrainingPage } from '../pages/ExploreTrainingPage';
import { MyProfileUpdate } from '../pages/MyProfileUpdate';
import { ModuleCreationPage } from '../pages/modulecreationpage';
import { adminloginPage } from '../pages/adminloginPage';
import { signUpPage } from '../pages/signUpPage';
import { addTrainerPage } from '../pages/addtrainerPage';
import { ParticipantPage } from '../pages/ParticpantPage';

export class CustomWorld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    login!:loginpage
    search!:courseSearchPage
    dashboard!:dashboardpage
    exploretraining!:ExploreTrainingPage
    trainerLogin!: trainerloginPage;
    DiscussionPage!: DiscussionPage;
    MyProfile!:MyProfileUpdate
    moduleCreation!: ModuleCreationPage;
    adminLogin!: adminloginPage;
    ap!: adminloginPage;
    signUp!: signUpPage;
    addTrainer!: addTrainerPage
    pp!: ParticipantPage;

}setWorldConstructor(CustomWorld)
