import{Given,When,Then} from '@cucumber/cucumber'
import { customeworld } from '../world/customeWorld';
import { expect } from "@playwright/test";
//
Given('user is lanuch the application', async function (this:customeworld) {
    await this.login.launch()
});

When('the user enter the valid userName as {string}', async function (this:customeworld,string) {
  await this.login.EnterUnsername(string)
});

When('the user enter the valid password as {string}', async function (this:customeworld,string) {
    await this.login.EnterPass(string)
});

When('the user click sigin button', async function (this:customeworld) {
    await this.login.signClick()
});

Then('the user should see the dashboard page after successfully login', async function (this:customeworld) {
  let act = await (await this.login.WelcomText()).textContent()
  expect(act).toContain("Welcome");
});


When('the user enter the userName as {string}', async function (this:customeworld,string) {
  await this.login.EnterUnsername(string)
});


When('the user enter the password as {string}', async function (this:customeworld,string) {
  await this.login.EnterPass(string)
});

Then(
    'the user unable to login and get error message as {string}',
    async function (this: customeworld, string) {
       if (string === 'Invalid email or password') {
        let act= (await this.login.Errormsg());
        let text = await act.textContent()
        expect(text).toContain(string);
       }
       else{
         const actualMessage = (await this.login.getValidationMessage()).replace(/\.$/, '');
            expect(actualMessage).toBe(string);
       }
        

    }
);
