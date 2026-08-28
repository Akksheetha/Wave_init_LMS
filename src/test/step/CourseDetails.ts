import { Given, When, Then } from '@cucumber/cucumber';
import { customworld } from '../world/customWorld';
import { expect } from '@playwright/test';
import { readCsvData } from '../Utils/csvReader';

interface CourseDetailsData {
    courseName: string;
    expectedTitle: string;
}

const courseData =
    readCsvData<CourseDetailsData>('courseDetails.csv');


function getCourseData(): CourseDetailsData {

    const data = courseData[0];

    if (!data) {
        throw new Error(
            'Course details data not found in CSV'
        );
    }

    return data;
}


When(
    'the user select the existing course',
    async function (this: customworld) {

        const data = getCourseData();

        await this.search.enterCourseName(
            data.courseName
        );

        await this.search.verifyCourseDisplayed(
            data.expectedTitle
        );

        const course = this.page.getByRole('heading', {
            name: data.expectedTitle,
            exact: true
        });

        await course.click();
    }
);


Then(
    'the course details page should be displayed',
    async function (this: customworld) {

        await this.courseDetails
            .verifyCourseDetailsPage();
    }
);


Then(
    'the selected course title should be displayed',
    async function (this: customworld) {

        const data = getCourseData();

        await this.courseDetails
            .verifyCourseTitle(
                data.expectedTitle
            );
    }
);


Then(
    'the course description should be displayed',
    async function (this: customworld) {

        await this.courseDetails
            .verifyCourseDescription();
    }
);


Then(
    'the course content should be displayed',
    async function (this: customworld) {

        await this.courseDetails
            .verifyCourseContent();
    }
);


When(
    'the user click the start course button',
    async function (this: customworld) {

        await this.courseDetails
            .clickStartCourse();
    }
);


Then(
    'the course should be started successfully',
    async function (this: customworld) {

        await this.courseDetails
            .verifyCourseStarted();
    }
);