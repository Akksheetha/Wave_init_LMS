import { Locator, Page } from "playwright-core";
import { basePage } from "./basePage";
import data from "../testData/traineeLogin.json"


export class MyProfileUpdate extends basePage{
    readonly userName_BTN:Locator
    readonly MyProfile_BTN:Locator
    readonly profileText:Locator;
    readonly skillSection:Locator;
    readonly addSkill_BTN:Locator;
    readonly skillInput:Locator;
    readonly addSkillConfirm_BTN:Locator;
     readonly username:Locator;
    readonly password:Locator;
    readonly sigin_BTN:Locator;
    

    constructor(page:Page){
        super(page);
        this.userName_BTN= page.locator("//div[@style='position: relative;']")
        this.MyProfile_BTN= page.locator("//div[@style='position: fixed; inset: 0px; z-index: 10;']/following-sibling::div/child::button[1]")
        this.profileText = page.locator("//h2[@class='reg-admin-title']")
        this.skillSection = page.locator('main[aria-label="Profile"]')
        this.addSkill_BTN = page.locator('button.reg-admin-btn--secondary', { hasText: 'Add Skill' })
        this.skillInput = page.getByPlaceholder('e.g. React, JavaScript, SQL, Docker')
        this.addSkillConfirm_BTN = page.locator('button.pfd-btn-primary', { hasText: 'Add Skill' })
        this.username= page.locator("#login-email")
        this.password=page.locator("#login-password")
        this.sigin_BTN=page.locator("//button[@type='submit']")
        
    }

    async clickUsername(){
        await this.userName_BTN.click({ force: true })
    }
    async login(){
        await this.Type(this.username,data.trainee.username)
        await this.Type(this.password,data.trainee.password)
        await this.click(this.sigin_BTN)
    }
   
    async clikMyProfile(){
        await this.click(this.MyProfile_BTN)
    }
    async myprofileText(){
        return this.profileText
    }

    async clickAddSkill(){
        await this.addSkill_BTN.scrollIntoViewIfNeeded()
        await this.addSkill_BTN.click({ force: true })
        await this.skillInput.waitFor({ state: 'visible' })
    }

    async enterSkill(skill:string){
        await this.skillInput.fill(skill)
    }

    async clickAddSkillButton(){
        await this.addSkillConfirm_BTN.click({ force: true })
    }

    async selectSkillSuggestion(skill:string){
        await this.page.getByRole('button', { name: `+ ${skill}`, exact: true }).click({ force: true })
    }

    async skill(skill:string){
        return this.skillSection.getByText(skill, { exact: true }).last()
    }

}