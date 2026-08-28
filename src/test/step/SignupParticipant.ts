import { Given, When, Then } from '@cucumber/cucumber';
import { customworld } from '../world/customWorld';



Given('the user clicks on sign up as participant link',async function (this: customworld) {
        await this.signUp.signupClick();
    }
);


When('the user enters the {string} as username in the create account page',async function (this: customworld,username: string) {
        await this.signUp.enterFullName(username);
    }
);


When('the user enters the {string} as email in the create account page',async function (this: customworld,email: string) {
        await this.signUp.enterEmail(`${email}_${Date.now()}@gmail.com`);
    }
);


When('the user enters the {string} as phone in the create account page',async function (this: customworld,phone: string) {
        await this.signUp.enterPhone(phone);
    }
);


When('the user enters the {string} as password in the create account page',async function (this: customworld,password: string) {
        await this.signUp.enterPassword(password);
    }
);


When('the user enters the {string} as confirm password in the create account page',async function (this: customworld,repassword: string) {
        await this.signUp.enterConfirmPassword(repassword);
        await this.signUp.selectTerms();
    }
);


When('the user clicks create account button',async function (this: customworld) {
        await this.signUp.submitForm();
    }
);


Then('the user gets a success message',async function (this: customworld) {
        await this.signUp.verifySuccessMessage();
    }
);

When('the user enter the already registered {string} {string} {string} {string} {string} details', async function (string, string2, string3, string4, string5) {
       await this.signUp.enterAlreadyRegisteredDetails(string,string2,string3,string4,string5);
});


Then('the user gets the error message',async function (this: customworld) {
        await this.signUp.verifyRegisteredErrorMessage();
    }
);

When('the user enters the register details with mismatched password', async function () {
        await this.signUp.enterAlreadyRegisteredDetails('Darshan','darshan10@gmail.com','1234567890','darshan@10','darshan');
});

Then('the user gets the mismatch error message', async function () {
       await this.signUp.verifyPasswordMismatch()
});

When('the user enter the valid register details and does not check terms of service', async function () {
       await this.signUp.enterRegisterDetails('Darshan','darshan10@gmail.com','1234567890','darshan@10','darshan@10');
});

Then('the user gets the terms of service error message', async function () {
       await this.signUp.verifyTermsError() 
});