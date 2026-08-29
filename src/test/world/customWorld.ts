import { DiscussionPage } from './../pages/discussionpage';
import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { World } from '@cucumber/cucumber';
import { loginpage } from '../pages/loginpage';
import { trainerloginPage } from '../pages/trainerloginPage';
import { courseSearchPage } from '../pages/courseSearchPage';
import { dashboardpage } from '../pages/dashboardpage';
import { ExploreTrainingPage } from '../pages/ExploreTrainingPage';
import { ModuleCreationPage } from '../pages/modulecreationpage';
import { courseDetailsPage } from '../pages/courseDetailsPage';
import { adminloginPage } from '../pages/adminloginPage';
import { SignupPage } from '../pages/SignupPage';
import { addTrainerPage } from '../pages/addtrainerPage';
import { MyProfileUpdate } from '../pages/MyProfileUpdate';
import { EducationPage } from '../pages/AddeducationPage';

export class customworld extends World{
    browser!:Browser
    context!:BrowserContext
    page!:Page
    login!:loginpage
    search!:courseSearchPage
    dashboard!:dashboardpage
    exploretraining!:ExploreTrainingPage
    trainerLogin!: trainerloginPage;
    DiscussionPage!: DiscussionPage;
    moduleCreation!: ModuleCreationPage;
    signUp!: SignupPage;
    adminLogin!: adminloginPage;
    addTrainer!: addTrainerPage
    courseDetails!: courseDetailsPage;
    MyProfile!:MyProfileUpdate
    Education!:EducationPage;

}setWorldConstructor(customworld)
