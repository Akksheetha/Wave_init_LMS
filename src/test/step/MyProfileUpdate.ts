import { Given,When,Then } from '@cucumber/cucumber';
import { customworld } from '../world/customWorld';
import { expect } from '@playwright/test';
import { readCsvData } from '../Utils/csvReader';

interface ProfileSkillData {
     addSkill: string;
     suggestionSkill: string;
}

const profileSkillData = readCsvData<ProfileSkillData>('profileSkill.csv');


Given('user launch the waveInit application', async function (this:customworld) {
   await this.login.launch()
});

When('the user login with validData using excel', async function (this:customworld) {
  await this.MyProfile.login()
});

When('the user click the user name in the left bottom coner', async function (this:customworld) {
     await this.MyProfile.clickUsername();
});

When('click the My Profile', async function (this:customworld) {
     await this.MyProfile.clikMyProfile()
});

When('the user click Add Skill', async function (this:customworld) {
     await this.MyProfile.clickAddSkill();
});

Then('user should navigate to the My Profile Page', async function (this:customworld) {
     const profileText = await this.MyProfile.myprofileText();
     await expect(profileText).toContainText('My Profile');
});

When('the user enter the skill from CSV', async function (this:customworld) {
     await this.MyProfile.enterSkill(profileSkillData[0].addSkill);
});

When('the user click the Add Skill button', async function (this:customworld) {
     await this.MyProfile.clickAddSkillButton();
});

Then('the skill should be added to the profile', async function (this:customworld) {
     await expect(await this.MyProfile.skill(profileSkillData[0].addSkill)).toBeVisible();
});

When('the user select the skill suggestion from CSV', async function (this:customworld) {
     await this.MyProfile.selectSkillSuggestion(profileSkillData[0].suggestionSkill);
     await this.MyProfile.clickAddSkillButton();
});

Then('the suggested skill should be added to the profile', async function (this:customworld) {
     await expect(await this.MyProfile.skill(profileSkillData[0].suggestionSkill)).toBeVisible();
});