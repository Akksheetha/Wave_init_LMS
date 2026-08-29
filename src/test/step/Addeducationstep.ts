import { When, Then } from '@cucumber/cucumber';
import { customworld } from '../world/customWorld';
import { readCsvData } from '../Utils/csvReader';

interface EducationCsvRow {
    scenarioType: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    yearRange: string;
    cgpa: string;
    institutionError: string;
    degreeError: string;
}

const educationData = readCsvData<EducationCsvRow>('educationdata.csv');

function getRow(scenarioType: string): EducationCsvRow {
    const row = educationData.find(r => r.scenarioType === scenarioType);

    if (!row) {
        throw new Error(`No row found in educationdata.csv for scenarioType "${scenarioType}"`);
    }
    return row;
}

const STEP_TIMEOUT = { timeout: 60 * 1000 };

When(
    'the trainer opens {string}',
    STEP_TIMEOUT,
    async function (this: customworld, linkText: string) {

        if (linkText === 'My Profile') {
            await this.Education.openMyProfile();
        } else {
            throw new Error(`Unhandled link: ${linkText}`);
        }
    }
);

When(
    'the trainer clicks the {string} button in the Education section',
    STEP_TIMEOUT,
    async function (this: customworld, buttonName: string) {

        if (buttonName === 'Add') {
            await this.Education.clickAddInEducationSection();
        } else {
            throw new Error(`Unhandled button: ${buttonName}`);
        }
    }
);

When(
    'the trainer fills the education form using {string} data',
    STEP_TIMEOUT,
    async function (this: customworld, scenarioType: string) {

        const row = getRow(scenarioType);

        await this.Education.fillEducationForm({
            institution: row.institution,
            degree: row.degree,
            fieldOfStudy: row.fieldOfStudy,
            yearRange: row.yearRange,
            cgpa: row.cgpa
        });
      
    }
);
When(
    'the trainer submits the education form',
    STEP_TIMEOUT,
    async function (this: customworld) {

        await this.Education.clickAddEducationSubmit();
    }
);
Then(
    'the education record from {string} data should be added to the profile',
    { timeout: 60 * 1000 },
    async function (this: customworld, scenarioType: string) {

        const row = getRow(scenarioType);

        await this.Education.verifyEducationAdded(
            row.degree,
            row.fieldOfStudy,
            row.institution,
            row.yearRange,
            row.cgpa
        );
    }
);

Then(
    'the education form should show the validation errors from {string} data',
    STEP_TIMEOUT,
    async function (this: customworld, scenarioType: string) {

        const row = getRow(scenarioType);

        await this.Education.verifyInstitutionRequiredError(!!row.institutionError);
        await this.Education.verifyDegreeRequiredError(!!row.degreeError);
    }
);