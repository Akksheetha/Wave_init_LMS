import { Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class courseSearchPage extends basePage {

    readonly mycourses: Locator;
    readonly searchbtn: Locator;
    readonly noCoursesMessage: Locator;
    readonly courseResults: Locator;
    readonly admin: Locator;

    constructor(page: Page) {
        super(page);

        this.mycourses = page.getByRole('button', { name: 'Training Programs' });

        this.searchbtn = page.getByRole('textbox', { name: 'Search by title or trainer...' });

        this.noCoursesMessage = page.getByText(
            'No courses found matching your criteria',
            { exact: true }
        );

        // Only actual course result headings
        this.courseResults = page.locator(
            'h3.tmt-course-name'
        );

        this.admin = page.getByRole('tab', { name: 'Admin' });
    }

    async clickAdmin(){
        await this.click(this.admin);
    }
    async clickMycourses() {
        await this.click(this.mycourses);
    }

    async enterCourseName(courseName: string) {
        await this.searchbtn.fill(courseName);
    }

    async clearSearchField() {
        await this.searchbtn.clear();
    }

    async verifySearchFieldEmpty() {
        await expect(this.searchbtn).toHaveValue('');
    }

    async verifyCourseDisplayed(courseName: string) {
    const course = this.page.getByRole('cell', {
        name: courseName,
        exact: true
    });

    await expect(course).toBeVisible();
}

    async verifyNoCoursesMessage() {
        await expect(this.noCoursesMessage).toBeVisible();
    }

    async verifyCoursesDisplayed() {
        await expect(this.courseResults.first()).toBeVisible();
    }

    async verifySearchResultCount() {
    const resultCount = this.page.getByText(
        /Showing \d+–\d+ of \d+ records/i
    );

    await expect(resultCount).toBeVisible();
}
}