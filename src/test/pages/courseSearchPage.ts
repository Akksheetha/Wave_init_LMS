import { Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class courseSearchPage extends basePage {

    readonly mycourses: Locator;
    readonly searchbtn: Locator;

    constructor(page: Page) {
        super(page);

        this.mycourses = page.getByRole('button', {
            name: 'My Courses'
        });

        this.searchbtn = page.getByRole('textbox', {
            name: 'Search courses by title...'
        });
    }

    async clickMycourses() {
        await this.click(this.mycourses);
    }

    async enterCourseName(courseName: string) {
        await this.searchbtn.fill(courseName);
    }

    async clearSearchField() {
        await this.searchbtn.fill('');
    }

    async verifySearchFieldEmpty() {
        await expect(this.searchbtn).toHaveValue('');
    }

    async verifyCourseDisplayed(courseName: string) {
        const course = this.page.getByText(courseName, {
            exact: true
        });

        await expect(course).toBeVisible();
    }

    async verifyNoCoursesMessage(message: string) {
        const noCoursesMessage = this.page.getByText(message, {
            exact: true
        });

        await expect(noCoursesMessage).toBeVisible();
    }

    async verifyNoCourseDisplayed(courseName: string) {
        const course = this.page.getByText(courseName, {
            exact: true
        });

        await expect(course).not.toBeVisible();
    }

    async verifyCoursesDisplayed() {
        const courses = this.page.locator('text=react');

        await expect(courses.first()).toBeVisible();
    }
}