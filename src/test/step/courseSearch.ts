import{Given,When,Then} from '@cucumber/cucumber'
import { customworld } from '../world/customWorld';
import { expect } from "@playwright/test";
import { readCsvData } from '../Utils/csvReader';

interface CourseSearchData {
    courseName: string;
    searchType: string;
    expectedResult: string;
}

const courseData = readCsvData<CourseSearchData>('courseSearch.csv');

Given('user is on the LMS application', async function (this:customworld) {
  await this.login.launch()
});

Given('the user login with valid credentials', async function (this:customworld) {
   await this.login.EnterUnsername("titooram123@gmail.com")
   await this.login.EnterPass("sriram123@")
   await this.login.signClick()
   const welcomeText = await this.login.WelcomText();
    await expect(welcomeText).toBeVisible({ timeout: 30000 });
    await expect(welcomeText).toContainText("Welcome");
});

Given('the user navigate to the My Courses page', async function (this:customworld) {
  await this.search.clickMycourses()
});

When('the user enter the existing course name in the search field', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'exact'
    );

    if (!data) {
        throw new Error('Exact search data not found in CSV');
    }

    await this.search.enterCourseName(data.courseName);
});


When('the user search for the course', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'exact'
    );

    if (!data) {
        throw new Error('Exact search data not found in CSV');
    }

    await this.search.verifyCourseDisplayed(data.courseName);
});


Then('the matching course should be displayed in the course list', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'exact'
    );

    if (!data) {
        throw new Error('Exact search data not found in CSV');
    }

    await this.search.verifyCourseDisplayed(data.courseName);
});

When('the user enter a partial course name in the search field', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'partial'
    );

    if (!data) {
        throw new Error('Partial search data not found in CSV');
    }

    await this.search.enterCourseName(data.courseName);
});


Then('the courses matching the search text should be displayed', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'partial'
    );

    if (!data) {
        throw new Error('Partial search data not found in CSV');
    }

    await this.search.verifyCourseDisplayed(data.expectedResult);
});

When('the user enter a non-existing course name in the search field', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'invalid'
    );

    if (!data) {
        throw new Error('Invalid search data not found in CSV');
    }

    await this.search.enterCourseName(data.courseName);
});


Then('no courses should be displayed', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'invalid'
    );

    if (!data) {
        throw new Error('Invalid search data not found in CSV');
    }

    await this.search.verifyNoCourseDisplayed('react');
});


Then('the user should see {string} message', async function (
    this: customworld,
    message: string
) {
    await this.search.verifyNoCoursesMessage(message);
});

When('the user enter a course name in the search field', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'exact'
    );

    if (!data) {
        throw new Error('Exact search data not found in CSV');
    }

    await this.search.enterCourseName(data.courseName);
});


When('the matching course should be displayed', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'exact'
    );

    if (!data) {
        throw new Error('Exact search data not found in CSV');
    }

    await this.search.verifyCourseDisplayed(data.expectedResult);
});


When('the user clear the search field', async function (this: customworld) {
    await this.search.clearSearchField();
});


Then('the search field should be empty', async function (this: customworld) {
    await this.search.verifySearchFieldEmpty();
});


Then('all available courses should be displayed', async function (this: customworld) {
    await this.search.verifyCoursesDisplayed();
});

When('the user enter an existing course name with different letter casing in the search field', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'casing'
    );

    if (!data) {
        throw new Error('Casing search data not found in CSV');
    }

    await this.search.enterCourseName(data.courseName);
});


Then('all the matching course should be displayed', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'casing'
    );

    if (!data) {
        throw new Error('Casing search data not found in CSV');
    }

    await this.search.verifyCourseDisplayed(data.expectedResult);
});


Then('the search result should match the entered course', async function (this: customworld) {

    const data = courseData.find(
        row => row.searchType === 'casing'
    );

    if (!data) {
        throw new Error('Casing search data not found in CSV');
    }

    await this.search.verifyCourseDisplayed(data.expectedResult);
});