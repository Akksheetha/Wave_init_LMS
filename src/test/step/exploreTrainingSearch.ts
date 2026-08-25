import{Given,When,Then} from '@cucumber/cucumber'
import { customworld } from '../world/customWorld';
import { expect } from "@playwright/test";

Given('the user navigate to the Dashboard', async function (this:customworld) {
  const text = await this.dashboard.getTextofDashboardText();
  expect(text).toContain("Welcome back")
});

Given('the user clicks Explore Courses Button', async function (this:customworld) {
  await this.dashboard.clickExploreCourse()
});

When('the user enters the {string} in the search bar field', async function (this:customworld, value:string) {
  await this.exploretraining.typeSearchValue(value)
});

Then('the matching training course should be displayed in the list', async function (this:customworld) {
  const text = await this.exploretraining.getTextofresultText();
  expect(text).toContain("Manual Testing")
});

When('the user enters the invalid value in the search bar field', async function (this:customworld) {
  await this.exploretraining.typeSearchValue("Manual 123")
});

Then('the system should display no matches message', async function () {
  const text = await this.exploretraining.getTextoferrorText();
  expect(text).toContain("No trainings available yet")
});

When('the user enters a partial course name in the search bar field', async function () {
  await this.exploretraining.typeSearchValue("Manual")
});
