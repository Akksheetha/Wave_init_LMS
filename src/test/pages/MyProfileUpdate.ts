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
    readonly Cancel_BTN:Locator;
    readonly Delete_BTN:Locator;
    readonly SkillCount:Locator;
    readonly afterDeleteText:Locator;
    readonly SkillInput:Locator;
    readonly DuplicateMSG:Locator;
    private deleteCount = 0;
    
    
    

    constructor(page:Page){
        super(page);
        this.userName_BTN = page.locator('button').filter({ hasText: 'Profile' }).first()
        this.MyProfile_BTN= page.locator("//div[@style='position: fixed; inset: 0px; z-index: 10;']/following-sibling::div/child::button[1]")
        this.profileText = page.locator("//h2[@class='reg-admin-title']")
        this.skillSection = page.locator('main[aria-label="Profile"]')
        this.addSkill_BTN = page.locator('button.reg-admin-btn--secondary', { hasText: 'Add Skill' })
        this.skillInput = page.getByPlaceholder('e.g. React, JavaScript, SQL, Docker')
        this.addSkillConfirm_BTN = page.locator('button.pfd-btn-primary', { hasText: 'Add Skill' })
        this.username= page.locator("#login-email")
        this.password=page.locator("#login-password")
        this.sigin_BTN=page.locator("//button[@type='submit']")
        this.Cancel_BTN=page.locator("(//div[@style='padding: 14px 16px;'])[1]//span[1]//button")
        this.Delete_BTN=page.locator("//div[@class='pfd-footer']//button[2]")
        this.SkillCount=page.locator("(//div[@style='padding: 14px 16px;'])[1]//span")
        this.afterDeleteText=page.locator("(//div[@class='reg-card-title'])[4]")
        this.SkillInput=page.locator("//input[@class='pfd-input']")
        this.DuplicateMSG=page.locator("//div[@class='pfd-error-msg']")
    }

    

    async clickUsername(){
        try {
            await this.page.waitForTimeout(500);
            // Try to find and click the profile menu button
            await this.page.locator('button').first().click({ force: true });
        } catch (e) {
            console.log('Error clicking username:', e);
        }
    }
    async login(){
        await this.Type(this.username,data.trainee.username)
        await this.Type(this.password,data.trainee.password)
        await this.click(this.sigin_BTN)
    }
   
    async clikMyProfile(){
        try {
            await this.page.waitForTimeout(200);
            // Look for My Profile button/link in the dropdown menu
            const myProfileOption = this.page.locator('div, button, a, span').filter({ hasText: 'My Profile' }).first();
            const isVisible = await myProfileOption.isVisible({ timeout: 2000 }).catch(() => false);
            if (isVisible) {
                await myProfileOption.click({ force: true });
            } else {
                // Fallback to original locator
                await this.MyProfile_BTN.click({ force: true });
            }
        } catch (e) {
            console.log('Error clicking My Profile:', e);
        }
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
    async Click_Cancel(){
        await this.click(this.Cancel_BTN)
    }

    async click_Delete(){
       await this.click(this.Delete_BTN)
       await this.Cancel_BTN.waitFor({state:"hidden"})
       await this.afterDeleteText.waitFor({state:"visible"})
         this.deleteCount++
     }
     async delete_count(){
          let count = this.deleteCount
          if(count==1){
            return true
          }
          else {
            return false
          }
    }
    async skill_count(){
        return this.SkillCount.count()
    }

    async skillinput(){
        this.Type(this.SkillInput,"python")
    }
    async duplicateMsg(){
        return this.DuplicateMSG
    }



    

}