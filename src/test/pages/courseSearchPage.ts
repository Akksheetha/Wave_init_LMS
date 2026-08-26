import { Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class courseSearchPage extends basePage {

    readonly mycourses: Locator;
    readonly searchbtn: Locator;
    readonly noCoursesMessage: Locator;
    readonly courseResults: Locator;

    constructor(page: Page) {
        super(page);

        this.mycourses = page.getByRole('button', {
            name: 'My Courses'
        });

        this.searchbtn = page.getByRole('textbox', {
            name: 'Search courses by title...'
        });

        this.noCoursesMessage = page.getByText(
            'No courses found matching your criteria',
            { exact: true }
        );

        // Only actual course result headings
        this.courseResults = page.locator(
            'h3.tmt-course-name'
        );
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

        const course = this.page.getByRole('heading', {
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
            /Showing \d+ courses?/i
        );

        await expect(resultCount).toBeVisible();
    }
}